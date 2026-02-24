import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Suspense, lazy } from 'react';

const Arsenal3DScene = lazy(() => import('./Arsenal3DScene').then(m => ({ default: m.Arsenal3DScene })));

gsap.registerPlugin(ScrollTrigger);

export function NewArsenal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="arsenal"
      className="relative min-h-screen py-20 overflow-hidden bg-black"
    >
      {/* Animated Starfield Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-purple-950/20" />
      
      {/* Nebula Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="arsenal-header text-center mb-16 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 
            className="text-7xl md:text-9xl font-black mb-6 relative inline-block"
            style={{
              textShadow: '0 0 40px rgba(0, 240, 255, 0.5), 0 0 80px rgba(0, 240, 255, 0.3)',
              position: 'relative',
              zIndex: 20,
            }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_30px_rgba(0,240,255,0.6)]">
              MY ARSENAL
            </span>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </h2>
          <p 
            className="text-xl md:text-2xl text-cyan-300/80 font-light relative z-20"
            style={{
              textShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
            }}
          >
            ⚡ Digital Universe of Skills & Technologies ⚡
          </p>
        </motion.div>

        {/* 3D Scene Container */}
        <Suspense fallback={
          <div className="h-[700px] flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>
          </div>
        }>
          <Arsenal3DScene 
            isMobile={isMobile} 
            onSkillSelect={setSelectedSkill}
            selectedSkill={selectedSkill}
          />
        </Suspense>

        {/* Instructions */}
        <motion.div
          className="text-center mt-12 space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {!isMobile && (
            <p className="text-cyan-400/60 text-sm flex items-center justify-center gap-6">
              <span>🖱️ Drag to Rotate</span>
              <span>•</span>
              <span>✨ Hover to Explore</span>
              <span>•</span>
              <span>🎯 Click to Focus</span>
            </p>
          )}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
              <span className="text-cyan-400 text-xs">Frontend Development</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
              <span className="text-purple-400 text-xs">Design Tools</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 backdrop-blur-sm">
              <span className="text-teal-400 text-xs">AI & Automation</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}
