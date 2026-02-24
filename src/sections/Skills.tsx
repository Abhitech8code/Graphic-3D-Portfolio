import { useRef, useState, useEffect } from 'react';
import { useInView } from '@/hooks/useScrollProgress';
import { ParticleBackground } from '@/components/ParticleBackground';

interface Skill {
  name: string;
  percentage: number;
  color: string;
  orbitRadius: number;
  orbitDuration: number;
  orbitDelay: number;
}

const skills: Skill[] = [
  { name: 'Graphic Design', percentage: 88, color: '#00ffff', orbitRadius: 120, orbitDuration: 15, orbitDelay: 0 },
  { name: 'Web Design', percentage: 85, color: '#ff6600', orbitRadius: 180, orbitDuration: 20, orbitDelay: 5 },
  { name: 'Programming', percentage: 73, color: '#00ffff', orbitRadius: 240, orbitDuration: 25, orbitDelay: 10 },
  { name: 'UI/UX Design', percentage: 80, color: '#ff6600', orbitRadius: 150, orbitDuration: 18, orbitDelay: 3 },
  { name: 'Branding', percentage: 90, color: '#00ffff', orbitRadius: 200, orbitDuration: 22, orbitDelay: 7 },
  { name: 'Motion Graphics', percentage: 75, color: '#ff6600', orbitRadius: 100, orbitDuration: 12, orbitDelay: 2 },
];

function SkillOrb({
  skill,
  isInView,
  index,
  total,
}: {
  skill: Skill;
  isInView: boolean;
  index: number;
  total: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);

  const angle = (index / total) * 360; // degrees
  // phase offset so each orb starts at its own position
  const phaseOffset = -(angle / 360) * skill.orbitDuration;

  return (
    <div
      ref={orbRef}
      className="absolute"
      style={
        {
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          // CSS var for the orbit radius used by keyframes
          ['--orbit-radius' as any]: `${skill.orbitRadius}px`,
          animation: isInView ? `orbit ${skill.orbitDuration}s linear infinite` : 'none',
          animationDelay: `${skill.orbitDelay + phaseOffset}s`,
          width: `${Math.max(48, Math.min(120, skill.percentage * 1.6))}px`,
          height: `${Math.max(48, Math.min(120, skill.percentage * 1.6))}px`,
        } as React.CSSProperties
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          isHovered ? 'scale-125 z-20' : ''
        }`}
        style={{
          background: `radial-gradient(circle at 30% 30%, ${skill.color}80, ${skill.color}20)`,
          boxShadow: isHovered
            ? `0 0 60px ${skill.color}, inset 0 0 40px ${skill.color}40`
            : `0 0 30px ${skill.color}60, inset 0 0 20px ${skill.color}30`,
          // keep label upright while orbiting
          transform: `translateX(var(--orbit-radius)) rotate(${-angle}deg)`,
        }}
      >
        <div
          className="absolute inset-[-10px] rounded-full border-2 opacity-50"
          style={{
            borderColor: skill.color,
            animation: 'orb-ring 4s linear infinite',
          }}
        />

        <span className="font-orbitron text-xs sm:text-sm text-white text-center px-2 drop-shadow-lg">
          {skill.name}
        </span>
        <span
          className="font-orbitron text-lg sm:text-2xl font-bold mt-1"
          style={{ color: skill.color, textShadow: `0 0 10px ${skill.color}` }}
        >
          {skill.percentage}%
        </span>

        {isHovered && (
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              background: `radial-gradient(circle, ${skill.color}40 0%, transparent 70%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

// Central Core Component
function CentralCore({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative w-32 h-32 sm:w-48 sm:h-48">
      {/* Outer Rings */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-neon-cyan/30"
          style={{
            transform: `scale(${1 + i * 0.3})`,
            animation: isInView ? `spin-slow ${10 + i * 5}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}` : 'none',
          }}
        />
      ))}

      {/* Core */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-orange/30 flex items-center justify-center"
        style={{
          boxShadow: '0 0 40px rgba(0, 255, 255, 0.5), inset 0 0 40px rgba(0, 255, 255, 0.2)',
        }}
      >
        <div className="text-center">
          <span className="font-orbitron text-lg sm:text-2xl font-bold text-white">SKILLS</span>
          <span className="block text-xs text-neon-cyan">GALAXY</span>
        </div>
      </div>

      {/* Pulsing Effect */}
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.5) 0%, transparent 70%)',
          animationDuration: '3s',
        }}
      />
    </div>
  );
}

export function Skills() {
  const { ref, isInView } = useInView(0.2);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientY - rect.top - rect.height / 2) / 20;
      const y = (e.clientX - rect.left - rect.width / 2) / 20;
      setRotation({ x: -x, y });
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <ParticleBackground />
        {/* Starfield */}
        <div className="absolute inset-0 opacity-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Nebula Effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-orange/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-orbitron tracking-widest text-neon-orange border border-neon-orange/30 rounded-full">
            EXPERTISE
          </span>
          <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-neon-cyan mb-4">
            SKILLS GALAXY
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-orange mx-auto mb-4" />
          <p className="text-cyan-400/60 font-rajdhani max-w-2xl mx-auto">
            Explore my orbital skill system. Hover over each orb to discover my proficiency levels.
          </p>
        </div>

        {/* Skills Orbit Container */}
        <div
          ref={containerRef}
          className="relative h-[500px] sm:h-[600px] flex items-center justify-center perspective-1000"
        >
          <div
            className="relative preserve-3d transition-transform duration-300 ease-out"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
          >
            {/* Central Core */}
            <div className="relative z-10">
              <CentralCore isInView={isInView} />
            </div>

            {/* Orbiting Skills */}
            <div className="absolute inset-0 flex items-center justify-center">
              {skills.map((skill, index) => (
                <SkillOrb key={index} skill={skill} isInView={isInView} index={index} total={skills.length} />
              ))}
            </div>
          </div>
        </div>

        {/* Skill Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neon-cyan" />
            <span className="text-sm text-cyan-400/60 font-rajdhani">Design Skills</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neon-orange" />
            <span className="text-sm text-cyan-400/60 font-rajdhani">Technical Skills</span>
          </div>
        </div>
      </div>

      {/* Custom Styles for Orbit Animation */}
      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(var(--orbit-radius, 150px)) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(var(--orbit-radius, 150px)) rotate(-360deg);
          }
        }
        
        @keyframes orb-ring {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
