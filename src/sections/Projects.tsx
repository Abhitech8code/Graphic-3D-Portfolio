import { useState, useRef } from 'react';
import { useInView } from '@/hooks/useScrollProgress';
import { ExternalLink, X, Layers, Image, Layout, Share2 } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  icon: React.ElementType;
  color: string;
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    category: 'Web Development',
    description: 'A futuristic 3D portfolio website built with React, Three.js, and advanced animations. Features interactive 3D elements, particle systems, and immersive user experience.',
    technologies: ['React', 'Three.js', 'GSAP', 'Tailwind CSS'],
    icon: Layers,
    color: '#00ffff',
    gradient: 'from-neon-cyan/20 to-neon-orange/20',
  },
  {
    id: 2,
    title: 'Brand Identity System',
    category: 'Branding',
    description: 'Complete visual identity system including logo design, color palette, typography guidelines, and brand assets for multiple clients across different industries.',
    technologies: ['Illustrator', 'Photoshop', 'Figma'],
    icon: Image,
    color: '#ff6600',
    gradient: 'from-neon-orange/20 to-neon-cyan/20',
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    category: 'UI Design',
    description: 'Modern data visualization dashboard with real-time analytics, interactive charts, and intuitive user interface for business intelligence applications.',
    technologies: ['Figma', 'React', 'D3.js', 'TypeScript'],
    icon: Layout,
    color: '#00ffff',
    gradient: 'from-neon-cyan/20 to-purple-500/20',
  },
  {
    id: 4,
    title: 'Social Media Campaigns',
    category: 'Digital Marketing',
    description: 'Eye-catching social media creatives and campaign designs that drive engagement and brand awareness across multiple platforms.',
    technologies: ['Photoshop', 'Illustrator', 'After Effects'],
    icon: Share2,
    color: '#ff6600',
    gradient: 'from-neon-orange/20 to-pink-500/20',
  },
  {
    id: 5,
    title: 'Event Posters Collection',
    category: 'Print Design',
    description: 'Stunning poster designs for events, concerts, and promotional campaigns with bold typography and striking visual compositions.',
    technologies: ['Photoshop', 'Illustrator', 'InDesign'],
    icon: Image,
    color: '#00ffff',
    gradient: 'from-neon-cyan/20 to-blue-500/20',
  },
  {
    id: 6,
    title: 'E-Commerce UI Kit',
    category: 'UI/UX Design',
    description: 'Comprehensive UI component library for e-commerce applications with responsive designs and accessibility-focused interactions.',
    technologies: ['Figma', 'Storybook', 'React'],
    icon: Layers,
    color: '#ff6600',
    gradient: 'from-neon-orange/20 to-yellow-500/20',
  },
];

function ProjectCard({
  project,
  index,
  isInView,
  onClick,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const Icon = project.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({
      rotateX: (y - 0.5) * -20,
      rotateY: (x - 0.5) * 20,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`project-card-3d perspective-1000 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative preserve-3d cursor-pointer group"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Card */}
        <div
          className={`glass-panel rounded-xl p-6 h-full bg-gradient-to-br ${project.gradient} border border-white/10 hover:border-[${project.color}]/50 transition-all duration-300`}
          style={{
            boxShadow: `0 0 30px ${project.color}10`,
          }}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${project.color}20`,
              boxShadow: `0 0 20px ${project.color}30`,
            }}
          >
            <Icon className="w-7 h-7" style={{ color: project.color }} />
          </div>

          {/* Category */}
          <span
            className="text-xs font-rajdhani font-semibold uppercase tracking-wider"
            style={{ color: project.color }}
          >
            {project.category}
          </span>

          {/* Title */}
          <h3 className="font-orbitron text-xl text-white mt-2 mb-3 group-hover:text-[${project.color}] transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-cyan-100/60 text-sm font-rajdhani line-clamp-3 mb-4">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded bg-white/5 text-cyan-400/70 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-rajdhani font-semibold"
              style={{
                backgroundColor: `${project.color}20`,
                color: project.color,
                border: `1px solid ${project.color}40`,
              }}
            >
              View Project
              <ExternalLink className="w-4 h-4" />
            </span>
          </div>

          {/* Corner Accents */}
          <div
            className="absolute top-0 right-0 w-16 h-16 opacity-20"
            style={{
              background: `linear-gradient(135deg, transparent 50%, ${project.color} 50%)`,
              borderTopRightRadius: '0.75rem',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const Icon = project.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      {/* Modal Content */}
      <div
        className="relative glass-panel rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: `${project.color}40`,
          boxShadow: `0 0 60px ${project.color}30`,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-cyan-400" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: `${project.color}20`,
              boxShadow: `0 0 30px ${project.color}40`,
            }}
          >
            <Icon className="w-8 h-8" style={{ color: project.color }} />
          </div>
          <div>
            <span
              className="text-sm font-rajdhani font-semibold uppercase tracking-wider"
              style={{ color: project.color }}
            >
              {project.category}
            </span>
            <h2 className="font-orbitron text-2xl text-white">{project.title}</h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-cyan-100/80 font-rajdhani text-lg leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <h3 className="font-orbitron text-sm text-cyan-400 mb-3">TECHNOLOGIES</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm rounded-lg font-rajdhani"
                style={{
                  backgroundColor: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}30`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            className="flex-1 py-3 rounded-lg font-orbitron text-sm tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: `${project.color}20`,
              color: project.color,
              border: `1px solid ${project.color}40`,
            }}
          >
            View Live Demo
          </button>
          <button
            className="flex-1 py-3 rounded-lg font-orbitron text-sm tracking-wider border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
          >
            View Code
          </button>
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: project.color }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: project.color }}
        />
      </div>
    </div>
  );
}

export function Projects() {
  const { ref, isInView } = useInView(0.1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-orange/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-orbitron tracking-widest text-neon-orange border border-neon-orange/30 rounded-full">
            PORTFOLIO
          </span>
          <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-neon-cyan mb-4">
            FEATURED PROJECTS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-orange mx-auto mb-4" />
          <p className="text-cyan-400/60 font-rajdhani max-w-2xl mx-auto">
            Explore my creative universe. Click on any project to see more details.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
