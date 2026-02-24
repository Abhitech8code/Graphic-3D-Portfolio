import { useEffect, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

// 3D Rotating Cube Component
function SkillsCube() {
  const skills = [
    'GRAPHIC DESIGN',
    'UI DEVELOPMENT',
    'WEB DESIGN',
    'BRANDING',
    'VISUAL STORY',
    'CREATIVE TECH',
  ];

  return (
    <div className="perspective-1000 w-[200px] h-[200px] mx-auto">
      <div className="cube-3d relative w-full h-full preserve-3d">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="cube-face glass-panel"
          >
            <span className="text-xs font-orbitron tracking-wider">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Animated Text Component
function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={`inline-block transition-all duration-1000 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
    >
      {text}
    </span>
  );
}

// Light Rays Component
function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-1 h-[200vh] origin-top"
          style={{
            background: `linear-gradient(to bottom, rgba(0, 255, 255, ${0.1 + i * 0.05}) 0%, transparent 100%)`,
            transform: `rotate(${i * 30}deg) translateX(-50%)`,
            animation: `pulse-glow ${3 + i * 0.5}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const enterBtnMagnetic = useMagneticEffect(0.2);
  const [titleText, setTitleText] = useState('');
  const fullTitle = 'ABHISHEK SHUKLA';
  const [showSubtitle, setShowSubtitle] = useState(false);

  // Typewriter effect for title
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTitle.length) {
        setTitleText(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSubtitle(true), 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Light Rays */}
      <LightRays />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-neon-cyan/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-neon-orange/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-neon-cyan/5 blur-2xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Holographic Name */}
        <div className="mb-8 hologram-effect p-8 rounded-2xl">
          <h1 className="font-orbitron text-4xl sm:text-6xl md:text-8xl font-black tracking-wider">
            <span className="neon-text text-neon-cyan">{titleText}</span>
            <span className="terminal-cursor text-neon-cyan" />
          </h1>

          {showSubtitle && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm sm:text-base font-rajdhani">
              <span className="flex items-center gap-2 text-neon-orange">
                <Sparkles className="w-4 h-4" />
                <AnimatedText text="GRAPHIC DESIGNER" delay={0} />
              </span>
              <span className="text-neon-cyan/50">|</span>
              <span className="text-neon-cyan">
                <AnimatedText text="UI DEVELOPER" delay={200} />
              </span>
              <span className="text-neon-cyan/50">|</span>
              <span className="text-neon-orange">
                <AnimatedText text="WEB DEVELOPER" delay={400} />
              </span>
              <span className="text-neon-cyan/50">|</span>
              <span className="text-neon-cyan">
                <AnimatedText text="VISUAL BRANDING EXPERT" delay={600} />
              </span>
            </div>
          )}
        </div>

        {/* 3D Skills Cube */}
        <div className="my-12 floating">
          <SkillsCube />
        </div>

        {/* Enter Button */}
        <div
          ref={enterBtnMagnetic.ref}
          onMouseMove={enterBtnMagnetic.onMouseMove}
          onMouseLeave={enterBtnMagnetic.onMouseLeave}
          onMouseEnter={enterBtnMagnetic.onMouseEnter}
          className="inline-block"
        >
          <button
            onClick={scrollToAbout}
            className="group relative px-8 py-4 font-orbitron text-sm tracking-widest overflow-hidden"
          >
            {/* Button Background */}
            <span className="absolute inset-0 glass-panel rounded-lg transition-all duration-300 group-hover:bg-neon-cyan/20" />
            
            {/* Button Border Animation */}
            <span className="absolute inset-0 rounded-lg border border-neon-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-orange opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
            
            {/* Button Text */}
            <span className="relative flex items-center gap-3 text-neon-cyan group-hover:text-white transition-colors">
              ENTER THE LAB
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
