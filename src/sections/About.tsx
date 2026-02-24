import { useRef, useEffect, useState } from 'react';
import { User, Target, Lightbulb, Palette } from 'lucide-react';
import { useInView } from '@/hooks/useScrollProgress';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView(0.5);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { icon: Palette, value: 50, suffix: '+', label: 'Projects Completed' },
  { icon: Target, value: 3, suffix: '+', label: 'Years Experience' },
  { icon: Lightbulb, value: 100, suffix: '%', label: 'Client Satisfaction' },
  { icon: User, value: 25, suffix: '+', label: 'Happy Clients' },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };

    section.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxX = (mousePosition.x - 0.5) * 20;
  const parallaxY = (mousePosition.y - 0.5) * 20;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* 3D Room Background */}
      <div className="absolute inset-0 perspective-1000">
        <div
          className="absolute inset-0 preserve-3d transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${parallaxY * 0.1}deg) rotateY(${parallaxX * 0.1}deg)`,
          }}
        >
          {/* Floor */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-neon-cyan/5 to-transparent"
            style={{
              transform: 'rotateX(60deg) translateZ(-200px)',
              transformOrigin: 'bottom center',
            }}
          />
          
          {/* Side Walls */}
          <div
            className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-neon-cyan/5 to-transparent"
            style={{
              transform: 'rotateY(30deg) translateZ(-300px)',
              transformOrigin: 'left center',
            }}
          />
          <div
            className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-neon-orange/5 to-transparent"
            style={{
              transform: 'rotateY(-30deg) translateZ(-300px)',
              transformOrigin: 'right center',
            }}
          />
        </div>
      </div>

      {/* Grid Floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20"
        style={{
          background: `
            linear-gradient(to top, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-orbitron tracking-widest text-neon-orange border border-neon-orange/30 rounded-full">
            ABOUT ME
          </span>
          <h2 className="font-orbitron text-3xl sm:text-5xl font-bold text-neon-cyan mb-4">
            THE CREATIVE MIND
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-orange mx-auto" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Floating Glass Panel */}
          <div
            className="relative"
            style={{
              transform: `translateX(${parallaxX}px) translateY(${parallaxY}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <div className="glass-panel rounded-2xl p-8 hologram-effect">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-neon-cyan/50 group-hover:border-neon-cyan transition-all">
                  <img 
                    src="/assets/images/profile.png" 
                    alt="Abhishek Shukla" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-orange/20 mix-blend-overlay" />
                </div>
                <div>
                  <h3 className="font-orbitron text-xl text-neon-cyan">ABHISHEK SHUKLA</h3>
                  <p className="text-neon-orange font-rajdhani">Creative Technologist</p>
                </div>
              </div>

              <div className="space-y-4 text-cyan-100/80 font-rajdhani text-lg leading-relaxed">
                <p>
                  Creative and detail-oriented <span className="text-neon-cyan">Graphic Designer</span> with hands-on experience in marketing creatives, social visuals, banners, posters, and brand assets.
                </p>
                <p>
                  Passionate about <span className="text-neon-orange">visual storytelling</span>, layout design, and digital branding. I bring ideas to life through compelling visual narratives that resonate with audiences.
                </p>
                <p>
                  Skilled in <span className="text-neon-cyan">UI design</span> and <span className="text-neon-orange">web development</span> with strong audience-focused design thinking. I bridge the gap between aesthetics and functionality.
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-neon-cyan" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-neon-orange" />
            </div>

            {/* Floating decorative orbs */}
            <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-neon-cyan/10 blur-xl animate-float" />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-neon-orange/10 blur-xl animate-float" style={{ animationDelay: '1s' }} />
          </div>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-panel rounded-xl p-6 text-center group hover:bg-neon-cyan/10 transition-all duration-300"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <stat.icon className="w-8 h-8 text-neon-cyan mx-auto mb-3 group-hover:text-neon-orange transition-colors" />
                <div className="font-orbitron text-3xl sm:text-4xl font-bold text-neon-cyan mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-cyan-400/60 font-rajdhani">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
