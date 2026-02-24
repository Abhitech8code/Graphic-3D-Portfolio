import { useRef, useState, useEffect } from 'react';
import { useInView } from '@/hooks/useScrollProgress';
import { Calendar, MapPin, Cpu, Palette } from 'lucide-react';

interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  responsibilities: string[];
  icon: React.ElementType;
  color: string;
}

const experiences: Experience[] = [
  {
    company: 'Pump Nation Fitness',
    location: 'Gurugram',
    role: 'Graphic Designer | IT Support | CRM Executive',
    period: '2025 – Present',
    description: 'Leading creative and technical operations for a premier fitness brand.',
    responsibilities: [
      'Social media creatives',
      'Visual branding',
      'CRM systems management',
      'Event dashboards',
    ],
    icon: Palette,
    color: '#00ffff',
  },
  {
    company: 'Netra Kumbh – Maha Kumbh 2025',
    location: 'Prayagraj',
    role: 'Testing Engineer & IT Support',
    period: '2025',
    description: 'Contributed to one of the largest spiritual gatherings in the world.',
    responsibilities: [
      'Event graphics',
      'UI system layouts',
      'On-site digital panels',
      'Technical support',
    ],
    icon: Cpu,
    color: '#ff6600',
  },
];

function TimelineNode({
  experience,
  index,
  isInView,
}: {
  experience: Experience;
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = experience.icon;

  return (
    <div
      className={`relative transition-all duration-700 ${
        isInView
          ? 'opacity-100 translate-x-0'
          : index % 2 === 0
          ? 'opacity-0 -translate-x-20'
          : 'opacity-0 translate-x-20'
      }`}
      style={{ transitionDelay: `${index * 300}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Connection Line */}
      <div
        className={`absolute top-1/2 ${
          index % 2 === 0 ? 'right-full mr-8' : 'left-full ml-8'
        } w-24 h-0.5 bg-gradient-to-r ${
          index % 2 === 0
            ? 'from-neon-cyan to-transparent'
            : 'from-transparent to-neon-cyan'
        }`}
        style={{
          boxShadow: isHovered ? `0 0 10px ${experience.color}` : 'none',
        }}
      />

      {/* Node Point */}
      <div
        className={`absolute top-1/2 ${
          index % 2 === 0 ? '-left-4' : '-right-4'
        } w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300`}
        style={{
          borderColor: experience.color,
          backgroundColor: isHovered ? `${experience.color}40` : 'transparent',
          boxShadow: isHovered ? `0 0 20px ${experience.color}` : 'none',
          transform: 'translateY(-50%)',
        }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: experience.color }}
        />
      </div>

      {/* Card */}
      <div
        className={`glass-panel rounded-xl p-6 transition-all duration-300 ${
          isHovered ? 'scale-105' : ''
        }`}
        style={{
          borderColor: isHovered ? experience.color : undefined,
          boxShadow: isHovered ? `0 0 30px ${experience.color}40` : undefined,
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: `${experience.color}20`,
              boxShadow: `0 0 20px ${experience.color}30`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: experience.color }} />
          </div>
          <div className="flex-1">
            <h3 className="font-orbitron text-lg text-white">{experience.company}</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-cyan-400/60 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {experience.location}
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {experience.period}
              </span>
            </div>
          </div>
        </div>

        {/* Role */}
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-rajdhani font-semibold mb-4"
          style={{
            backgroundColor: `${experience.color}20`,
            color: experience.color,
          }}
        >
          {experience.role}
        </div>

        {/* Description */}
        <p className="text-cyan-100/70 text-sm mb-4 font-rajdhani">
          {experience.description}
        </p>

        {/* Responsibilities */}
        <div className="flex flex-wrap gap-2">
          {experience.responsibilities.map((resp, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded border"
              style={{
                borderColor: `${experience.color}40`,
                color: experience.color,
              }}
            >
              {resp}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Tunnel Effect Background
function TunnelBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden perspective-1000">
      {/* Tunnel Rings */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-cyan/20"
          style={{
            width: `${(i + 1) * 150}px`,
            height: `${(i + 1) * 150}px`,
            animation: `tunnel-pulse ${4 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Center Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-neon-cyan/10 blur-3xl" />
    </div>
  );
}

export function Experience() {
  const { ref, isInView } = useInView(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Tunnel Background */}
      <TunnelBackground />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-orbitron tracking-widest text-neon-orange border border-neon-orange/30 rounded-full">
            JOURNEY
          </span>
          <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-neon-cyan mb-4">
            EXPERIENCE TIMELINE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-orange mx-auto mb-4" />
          <p className="text-cyan-400/60 font-rajdhani max-w-2xl mx-auto">
            Navigate through my professional journey in this 3D timeline tunnel.
          </p>
        </div>

        {/* Timeline */}
        <div ref={scrollRef} className="relative">
          {/* Central Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                rgba(0, 255, 255, 0.5) ${scrollProgress * 20}%, 
                rgba(0, 255, 255, 0.5) ${scrollProgress * 100}%, 
                transparent 100%)`,
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
            }}
          />

          {/* Experience Nodes */}
          <div className="space-y-16">
            {experiences.map((experience, index) => (
              <div
                key={index}
                className={`flex ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <TimelineNode
                    experience={experience}
                    index={index}
                    isInView={isInView}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 z-50">
          <span className="text-xs font-orbitron text-neon-cyan">PROGRESS</span>
          <div className="w-1 h-32 bg-neon-cyan/20 rounded-full overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-neon-cyan to-neon-orange transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="text-xs font-orbitron text-neon-orange">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes tunnel-pulse {
          0%, 100% {
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.02);
          }
        }
      `}</style>
    </section>
  );
}
