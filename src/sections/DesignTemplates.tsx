import { useState, useRef } from 'react';
import { useInView } from '@/hooks/useScrollProgress';
import { X, ZoomIn, Palette, Layout, Share2, Download, Eye } from 'lucide-react';

interface Template {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  client: string;
  type: 'social' | 'print' | 'infographic';
  tags: string[];
}

const templates: Template[] = [
  {
    id: 1,
    title: 'Hygiene & Cleanliness',
    category: 'Fitness Marketing',
    description: 'A professional gym hygiene poster designed for Pump Nation Fitness. Features bold typography, high-quality imagery, and clear call-to-action points to maintain gym cleanliness standards.',
    image: '/assets/templates/hygiene-poster.jpg',
    client: 'Pump Nation Fitness',
    type: 'print',
    tags: ['Poster', 'Fitness', 'Health', 'Branding'],
  },
  {
    id: 2,
    title: "Women's Health & Nutrition",
    category: 'Social Media Campaign',
    description: 'An engaging social media post promoting women\'s health programs. Combines vibrant imagery with clear program details and scheduling information.',
    image: '/assets/templates/womens-health.jpg',
    client: 'Pump Nation Fitness',
    type: 'social',
    tags: ['Social Media', 'Health', 'Nutrition', 'Campaign'],
  },
  {
    id: 3,
    title: 'Gym Etiquette Guide',
    category: 'Informational Design',
    description: 'A comprehensive gym etiquette poster with four key sections. Clean layout with product photography and clear guidelines for gym members.',
    image: '/assets/templates/gym-etiquette.jpg',
    client: 'Pump Nation Fitness',
    type: 'print',
    tags: ['Infographic', 'Guidelines', 'Fitness', 'Education'],
  },
  {
    id: 4,
    title: 'Fat Loss & Weight Reduction Plan',
    category: 'Nutrition Infographic',
    description: 'A detailed meal plan infographic with colorful sections for different meal times. Includes dietary recommendations and nutritional guidance.',
    image: '/assets/templates/fat-loss-plan.jpg',
    client: 'Pump Nation Fitness',
    type: 'infographic',
    tags: ['Infographic', 'Nutrition', 'Diet Plan', 'Health'],
  },
];

const categories = [
  { id: 'all', label: 'All Work', icon: Layout },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'print', label: 'Print Design', icon: Palette },
  { id: 'infographic', label: 'Infographics', icon: Eye },
];

function TemplateCard({
  template,
  index,
  isInView,
  onClick,
}: {
  template: Template;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({
      rotateX: (y - 0.5) * -10,
      rotateY: (x - 0.5) * 10,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  const typeColors: Record<string, string> = {
    social: '#ff6600',
    print: '#00ffff',
    infographic: '#ff00ff',
  };

  return (
    <div
      ref={cardRef}
      className={`perspective-1000 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="preserve-3d cursor-pointer group"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
        onClick={onClick}
      >
        <div className="glass-panel rounded-2xl overflow-hidden hover:border-neon-cyan/50 transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={template.image}
              alt={template.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Type Badge */}
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-rajdhani font-semibold capitalize"
              style={{
                backgroundColor: `${typeColors[template.type]}30`,
                color: typeColors[template.type],
                border: `1px solid ${typeColors[template.type]}50`,
              }}
            >
              {template.type}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-orbitron text-xl text-white mb-2">{template.title}</h3>
                <p className="text-cyan-100/70 text-sm font-rajdhani line-clamp-2 mb-4">
                  {template.description}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <span className="text-neon-cyan text-sm font-rajdhani">Click to view</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-rajdhani font-semibold text-cyan-100">{template.title}</h4>
                <p className="text-xs text-cyan-400/60">{template.client}</p>
              </div>
              <div className="flex gap-1">
                {template.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded bg-white/5 text-cyan-400/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateModal({ template, onClose }: { template: Template; onClose: () => void }) {
  const typeColors: Record<string, string> = {
    social: '#ff6600',
    print: '#00ffff',
    infographic: '#ff00ff',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

      {/* Modal Content */}
      <div
        className="relative glass-panel rounded-2xl overflow-hidden max-w-5xl w-full max-h-[95vh] animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: `${typeColors[template.type]}40`,
          boxShadow: `0 0 60px ${typeColors[template.type]}20`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/50 hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-cyan-400" />
        </button>

        <div className="grid md:grid-cols-5 gap-0">
          {/* Image Display */}
          <div className="md:col-span-3 bg-black/50">
            <img
              src={template.image}
              alt={template.title}
              className="w-full h-full object-contain max-h-[80vh]"
            />
          </div>

          {/* Details Panel */}
          <div className="md:col-span-2 p-8 overflow-y-auto max-h-[80vh]">
            {/* Type Badge */}
            <span
              className="inline-block px-4 py-1 rounded-full text-xs font-rajdhani font-semibold capitalize mb-4"
              style={{
                backgroundColor: `${typeColors[template.type]}20`,
                color: typeColors[template.type],
                border: `1px solid ${typeColors[template.type]}40`,
              }}
            >
              {template.type}
            </span>

            <h2 className="font-orbitron text-2xl text-white mb-2">{template.title}</h2>
            <p className="text-neon-cyan font-rajdhani mb-6">{template.category}</p>

            <p className="text-cyan-100/80 font-rajdhani leading-relaxed mb-6">
              {template.description}
            </p>

            {/* Client Info */}
            <div className="mb-6">
              <span className="text-cyan-400/60 text-sm block mb-2">Client:</span>
              <span className="text-cyan-100 font-rajdhani">{template.client}</span>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <span className="text-cyan-400/60 text-sm block mb-3">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-sm font-rajdhani bg-white/5 text-cyan-400 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                className="flex-1 py-3 rounded-lg font-orbitron text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 hover:bg-neon-cyan/30"
              >
                <Eye className="w-4 h-4" />
                Full Preview
              </button>
              <button
                className="flex-1 py-3 rounded-lg font-orbitron text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 bg-white/5 text-cyan-400 border border-white/20 hover:bg-white/10"
              >
                <Download className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesignTemplates() {
  const { ref, isInView } = useInView(0.1);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTemplates = activeCategory === 'all'
    ? templates
    : templates.filter((t) => t.type === activeCategory);

  return (
    <section
      id="templates"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-orange/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-orbitron tracking-widest text-neon-orange border border-neon-orange/30 rounded-full">
            CREATIVE WORK
          </span>
          <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-neon-cyan mb-4">
            DESIGN TEMPLATES
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-orange mx-auto mb-4" />
          <p className="text-cyan-400/60 font-rajdhani max-w-2xl mx-auto">
            A curated collection of social media posts, print designs, and infographics created for various clients.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-rajdhani font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan'
                    : 'glass-panel text-cyan-400/60 hover:text-cyan-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedTemplate(template)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-cyan-400/60 font-rajdhani">No templates found in this category.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-cyan-400/60 font-rajdhani mb-4">
            Want custom designs for your brand?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-cyan/20 to-neon-orange/20 rounded-xl font-orbitron text-sm tracking-wider text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan transition-all"
          >
            <Palette className="w-5 h-5" />
            LET'S WORK TOGETHER
          </a>
        </div>
      </div>

      {/* Modal */}
      {selectedTemplate && (
        <TemplateModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />
      )}
    </section>
  );
}
