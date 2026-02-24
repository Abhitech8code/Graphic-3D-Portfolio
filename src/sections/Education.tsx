import { useRef, useState } from 'react';
import { useInView } from '@/hooks/useScrollProgress';
import { GraduationCap, Award, BookOpen, Code, ExternalLink } from 'lucide-react';

interface Education {
  title: string;
  institution: string;
  year: string;
  description: string;
  icon: React.ElementType;
  color: string;
  credentials?: string;
}

const educations: Education[] = [
  {
    title: 'O Level Diploma',
    institution: 'NIELIT',
    year: 'Completed',
    description: 'Comprehensive computer science diploma covering programming fundamentals, database management, and software engineering principles.',
    icon: GraduationCap,
    color: '#00ffff',
    credentials: 'Computer Science',
  },
  {
    title: 'B.A Political Science',
    institution: 'CSJMU',
    year: 'Completed',
    description: 'Bachelor of Arts in Political Science with focus on critical thinking, research methodology, and analytical skills.',
    icon: BookOpen,
    color: '#ff6600',
  },
  {
    title: 'Frontend Bootcamp',
    institution: 'Udemy',
    year: 'Certified',
    description: 'Intensive frontend development bootcamp covering modern web technologies, React, and responsive design patterns.',
    icon: Code,
    color: '#00ffff',
    credentials: 'Web Development',
  },
  {
    title: 'Responsive Design',
    institution: 'FreeCodeCamp',
    year: 'Certified',
    description: 'Comprehensive certification in responsive web design, accessibility, and modern CSS techniques.',
    icon: Award,
    color: '#ff6600',
  },
];

function HologramCard({
  education,
  index,
  isInView,
}: {
  education: Education;
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const Icon = education.icon;

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
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`perspective-1000 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative preserve-3d"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Hologram Card */}
        <div
          className="education-hologram p-6 h-full group cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${education.color}10, ${education.color}05)`,
            boxShadow: isHovered
              ? `0 0 40px ${education.color}40, inset 0 0 40px ${education.color}10`
              : `0 0 20px ${education.color}20`,
          }}
        >
          {/* Scan Line Effect */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ opacity: isHovered ? 1 : 0.3 }}
          >
            <div
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[${education.color}] to-transparent"
              style={{
                background: `linear-gradient(90deg, transparent, ${education.color}60, transparent)`,
                animation: 'scan-line 3s linear infinite',
              }}
            />
          </div>

          {/* Grid Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(${education.color}20 1px, transparent 1px),
                linear-gradient(90deg, ${education.color}20 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${education.color}20`,
                  boxShadow: `0 0 20px ${education.color}30`,
                }}
              >
                <Icon className="w-6 h-6" style={{ color: education.color }} />
              </div>
              <span
                className="px-3 py-1 text-xs font-rajdhani font-semibold rounded-full"
                style={{
                  backgroundColor: `${education.color}20`,
                  color: education.color,
                }}
              >
                {education.year}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-orbitron text-lg text-white mb-1 transition-colors" style={{ color: education.color }}>
              {education.title}
            </h3>

            {/* Institution */}
            <p className="text-sm font-rajdhani mb-3" style={{ color: education.color }}>
              {education.institution}
            </p>

            {/* Credentials */}
            {education.credentials && (
              <div
                className="inline-block px-2 py-1 text-xs rounded mb-3"
                style={{
                  backgroundColor: `${education.color}15`,
                  color: education.color,
                  border: `1px solid ${education.color}30`,
                }}
              >
                {education.credentials}
              </div>
            )}

            {/* Description */}
            <p className="text-cyan-100/60 text-sm font-rajdhani line-clamp-3">
              {education.description}
            </p>

            {/* View Credential Link */}
            <div className="mt-4 flex items-center gap-2 text-sm font-rajdhani opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: education.color }}>
              <span>View Credential</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>

          {/* Corner Decorations */}
          <div
            className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2"
            style={{ borderColor: education.color }}
          />
          <div
            className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2"
            style={{ borderColor: education.color }}
          />

          {/* Glow Effect */}
          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${education.color}20 0%, transparent 70%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function Education() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section
      id="education"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Holographic Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'center center',
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-neon-cyan/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-orange/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-orbitron tracking-widest text-neon-orange border border-neon-orange/30 rounded-full">
            ACADEMIC
          </span>
          <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-neon-cyan mb-4">
            EDUCATION & CERTIFICATIONS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-orange mx-auto mb-4" />
          <p className="text-cyan-400/60 font-rajdhani max-w-2xl mx-auto">
            Holographic records of my academic journey and professional certifications.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {educations.map((education, index) => (
            <HologramCard
              key={index}
              education={education}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Decorative Terminal */}
        <div className="mt-16 glass-panel rounded-xl p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-neon-cyan/20 pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-cyan-400/60">education.log</span>
          </div>
          <div className="space-y-2 text-cyan-400/80">
            <p><span className="text-neon-orange">$</span> loading credentials...</p>
            <p><span className="text-neon-cyan">&gt;</span> O Level Diploma - Computer Science [VERIFIED]</p>
            <p><span className="text-neon-cyan">&gt;</span> B.A Political Science - CSJMU [VERIFIED]</p>
            <p><span className="text-neon-cyan">&gt;</span> Frontend Bootcamp - Udemy [VERIFIED]</p>
            <p><span className="text-neon-cyan">&gt;</span> Responsive Design - FreeCodeCamp [VERIFIED]</p>
            <p><span className="text-green-400">✓</span> All credentials validated successfully</p>
            <p className="terminal-cursor text-neon-cyan" />
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes scan-line {
          0% {
            top: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
