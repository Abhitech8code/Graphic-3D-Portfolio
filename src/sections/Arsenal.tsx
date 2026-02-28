import { useEffect, useRef, useState, Component, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArsenalMobile } from './ArsenalMobile';
import { Suspense, lazy } from 'react';

const Arsenal3D = lazy(() => import('./Arsenal3D').then(m => ({ default: m.Arsenal3D })));

gsap.registerPlugin(ScrollTrigger);

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[600px] flex items-center justify-center bg-black/50 rounded-3xl border border-cyan-500/30">
          <div className="text-center">
            <p className="text-cyan-400 mb-4">3D view unavailable</p>
            <p className="text-cyan-400/60 text-sm">Using fallback view</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function Arsenal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.arsenal-title', {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        scale: 0.8,
      });
    }, section);

    return () => {
      window.removeEventListener('resize', checkMobile);
      ctx.revert();
    };
  }, []);

  if (isMobile) {
    return <ArsenalMobile />;
  }

  return (
    <section
      ref={sectionRef}
      id="arsenal"
      className="relative min-h-screen py-20 overflow-hidden bg-black"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          className="arsenal-title text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
            MY DIGITAL ARSENAL
          </h2>
          <p className="text-xl text-cyan-300/70 font-light">
            Tools & Technologies Powering My Creative Universe
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <ErrorBoundary>
          <Suspense fallback={
            <div className="h-[600px] flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Arsenal3D />
          </Suspense>
        </ErrorBoundary>

        {/* Instructions */}
        <motion.div
          className="text-center mt-8 text-cyan-400/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm">🖱️ Drag to rotate • Hover to explore • Click to expand</p>
        </motion.div>
      </div>
    </section>
  );
}
