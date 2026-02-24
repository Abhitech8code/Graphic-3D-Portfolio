import { useState, useRef } from 'react';
import { useInView } from '@/hooks/useScrollProgress';
import { X, ZoomIn, ExternalLink, Sparkles, Layers } from 'lucide-react';

interface Logo {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  client: string;
  year: string;
  colors: string[];
}

const logos: Logo[] = [
  {
    id: 1,
    name: 'MovieMakerReview',
    category: 'Entertainment',
    description: 'A premium 3D logo design for a movie review YouTube channel. Features cinematic elements including cameras, clapperboard, and golden accents to convey authority in film criticism.',
    image: '/assets/logos/moviemaker-review.png',
    client: 'MovieMakerReview Channel',
    year: '2024',
    colors: ['#FFD700', '#8B0000', '#000000'],
  },
  {
    id: 2,
    name: 'Cuisine Room Recipe',
    category: 'Food & Culinary',
    description: 'An elegant culinary brand identity featuring a golden chef hat, crossed utensils, and fresh vegetables. The design conveys premium quality and authentic cooking expertise.',
    image: '/assets/logos/cuisine-room-recipe.png',
    client: 'Cuisine Room Recipe',
    year: '2024',
    colors: ['#FFD700', '#FF6B35', '#228B22'],
  },
  {
    id: 3,
    name: 'Tirupati Mobile',
    category: 'Technology',
    description: 'A sophisticated mobile accessories brand logo with a circular badge design. The TMA monogram and smartphone silhouette create a memorable and professional identity.',
    image: '/assets/logos/tirupati-mobile.png',
    client: 'Tirupati Mobile Accessories',
    year: '2024',
    colors: ['#D4AF37', '#000000', '#FFFFFF'],
  },
];

function LogoCard({
  logo,
  index,
  isInView,
  onClick,
}: {
  logo: Logo;
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
      rotateX: (y - 0.5) * -15,
      rotateY: (x - 0.5) * 15,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`perspective-1000 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
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
        <div className="glass-panel rounded-2xl p-6 h-full hover:border-neon-cyan/50 transition-all duration-300 overflow-hidden">
          {/* Glow Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${logo.colors[0]}15 0%, transparent 70%)`,
            }}
          />

          {/* Logo Image */}
          <div className="relative aspect-square mb-6 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center p-4">
            <img
              src={logo.image}
              alt={logo.name}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-neon-cyan/20 flex items-center justify-center backdrop-blur-sm">
                <ZoomIn className="w-6 h-6 text-neon-cyan" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 text-xs font-rajdhani bg-neon-cyan/20 text-neon-cyan rounded-full mb-3">
              {logo.category}
            </span>
            <h3 className="font-orbitron text-xl text-white mb-2 group-hover:text-neon-cyan transition-colors">
              {logo.name}
            </h3>
            <p className="text-cyan-100/60 text-sm font-rajdhani line-clamp-2">
              {logo.description}
            </p>

            {/* Color Palette */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-cyan-400/60">Colors:</span>
              <div className="flex gap-1">
                {logo.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border border-white/20"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Corner Decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
            <Sparkles className="w-full h-full text-neon-cyan" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoModal({ logo, onClose }: { logo: Logo; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      {/* Modal Content */}
      <div
        className="relative glass-panel rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: `${logo.colors[0]}40`,
          boxShadow: `0 0 60px ${logo.colors[0]}20`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-6 h-6 text-cyan-400" />
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Logo Display */}
          <div
            className="aspect-square rounded-xl flex items-center justify-center p-8"
            style={{ backgroundColor: `${logo.colors[0]}10` }}
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Logo Details */}
          <div>
            <span
              className="inline-block px-4 py-1 text-xs font-rajdhani rounded-full mb-4"
              style={{ backgroundColor: `${logo.colors[0]}20`, color: logo.colors[0] }}
            >
              {logo.category}
            </span>

            <h2 className="font-orbitron text-3xl text-white mb-4">{logo.name}</h2>

            <p className="text-cyan-100/80 font-rajdhani text-lg leading-relaxed mb-6">
              {logo.description}
            </p>

            {/* Project Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-cyan-400/60 text-sm w-20">Client:</span>
                <span className="text-cyan-100 font-rajdhani">{logo.client}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-cyan-400/60 text-sm w-20">Year:</span>
                <span className="text-cyan-100 font-rajdhani">{logo.year}</span>
              </div>
            </div>

            {/* Color Palette */}
            <div className="mb-6">
              <span className="text-cyan-400/60 text-sm block mb-3">Color Palette:</span>
              <div className="flex gap-3">
                {logo.colors.map((color, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-lg border border-white/20 shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-cyan-400/60 font-mono">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                className="flex-1 py-3 rounded-lg font-orbitron text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: `${logo.colors[0]}20`,
                  color: logo.colors[0],
                  border: `1px solid ${logo.colors[0]}40`,
                }}
              >
                <ExternalLink className="w-4 h-4" />
                View Project
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: logo.colors[0] }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: logo.colors[1] || logo.colors[0] }}
        />
      </div>
    </div>
  );
}

export function LogoShowcase() {
  const { ref, isInView } = useInView(0.1);
  const [selectedLogo, setSelectedLogo] = useState<Logo | null>(null);

  return (
    <section
      id="logos"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full border border-neon-cyan/20 animate-spin-slow" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full border border-neon-orange/20 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-orange/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-orbitron tracking-widest text-neon-orange border border-neon-orange/30 rounded-full">
            BRAND IDENTITY
          </span>
          <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-neon-cyan mb-4">
            LOGO SHOWCASE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-orange mx-auto mb-4" />
          <p className="text-cyan-400/60 font-rajdhani max-w-2xl mx-auto">
            A collection of carefully crafted brand identities that tell unique stories and create lasting impressions.
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-12">
          {[
            { value: '50+', label: 'Logos Created' },
            { value: '30+', label: 'Happy Clients' },
            { value: '3+', label: 'Years Experience' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-orbitron text-3xl text-neon-cyan mb-1">{stat.value}</div>
              <div className="text-xs text-cyan-400/60 font-rajdhani">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Logo Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {logos.map((logo, index) => (
            <LogoCard
              key={logo.id}
              logo={logo}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedLogo(logo)}
            />
          ))}
        </div>

        {/* Services Banner */}
        <div className="mt-16 glass-panel rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-orange/20 flex items-center justify-center">
                <Layers className="w-8 h-8 text-neon-cyan" />
              </div>
              <div>
                <h3 className="font-orbitron text-xl text-white">Need a Logo?</h3>
                <p className="text-cyan-400/60 font-rajdhani">Let's create something amazing together</p>
              </div>
            </div>
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-neon-cyan/20 to-neon-orange/20 rounded-xl font-orbitron text-sm tracking-wider text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan transition-all"
            >
              START A PROJECT
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedLogo && <LogoModal logo={selectedLogo} onClose={() => setSelectedLogo(null)} />}
    </section>
  );
}
