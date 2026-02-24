import { useEffect, Suspense, lazy } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { MagneticCursor } from '@/components/MagneticCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

// Lazy load sections for performance
const Hero = lazy(() => import('@/sections/Hero').then(m => ({ default: m.Hero })));
const About = lazy(() => import('@/sections/About').then(m => ({ default: m.About })));
const Resume = lazy(() => import('@/sections/Resume').then(m => ({ default: m.Resume })));
const Skills = lazy(() => import('@/sections/Skills').then(m => ({ default: m.Skills })));
const Arsenal = lazy(() => import('@/sections/NewArsenal').then(m => ({ default: m.NewArsenal })));
const LogoShowcase = lazy(() => import('@/sections/LogoShowcase').then(m => ({ default: m.LogoShowcase })));
const DesignTemplates = lazy(() => import('@/sections/DesignTemplates').then(m => ({ default: m.DesignTemplates })));
const Experience = lazy(() => import('@/sections/Experience').then(m => ({ default: m.Experience })));
const Projects = lazy(() => import('@/sections/Projects').then(m => ({ default: m.Projects })));
const Education = lazy(() => import('@/sections/Education').then(m => ({ default: m.Education })));
const Contact = lazy(() => import('@/sections/Contact').then(m => ({ default: m.Contact })));

// Loading fallback
function SectionLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  // Smooth scroll polyfill for older browsers
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = 'auto';
    }

    // Preload critical fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // Add meta tags for SEO
    const metaTags = [
      { name: 'description', content: 'Abhishek Shukla - Creative Technologist, Graphic Designer, UI Developer, and Visual Branding Expert. Explore my futuristic portfolio.' },
      { name: 'keywords', content: 'Abhishek Shukla, Graphic Designer, UI Developer, Web Developer, Visual Branding, Creative Technologist, Portfolio' },
      { name: 'author', content: 'Abhishek Shukla' },
      { property: 'og:title', content: 'Abhishek Shukla - Creative Technologist' },
      { property: 'og:description', content: 'Futuristic portfolio of a creative technologist specializing in graphic design, UI development, and visual branding.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://portfolio-abhitech.netlify.app' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Abhishek Shukla - Creative Technologist' },
      { name: 'twitter:description', content: 'Futuristic portfolio of a creative technologist specializing in graphic design, UI development, and visual branding.' },
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      Object.entries(tag).forEach(([key, value]) => {
        meta.setAttribute(key, value);
      });
      document.head.appendChild(meta);
    });

    // JSON-LD structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Abhishek Shukla',
      jobTitle: 'Creative Technologist',
      description: 'Graphic Designer, UI Developer, and Visual Branding Expert',
      email: 'abhishekshukla01071997@gmail.com',
      telephone: '+91-7052757579',
      url: 'https://portfolio-abhitech.netlify.app',
      sameAs: [
        'https://github.com',
        'https://linkedin.com',
        'https://twitter.com',
        'https://instagram.com',
      ],
      skills: [
        'Graphic Design',
        'UI/UX Design',
        'Web Development',
        'Visual Branding',
        'Motion Graphics',
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      metaTags.forEach(() => {
        const meta = document.querySelector('meta');
        if (meta) document.head.removeChild(meta);
      });
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-cyan-400 overflow-x-hidden">
      {/* Global Background Effects */}
      <ParticleBackground />
      
      {/* Custom Cursor (desktop only) */}
      <MagneticCursor />
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Resume />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Arsenal />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <LogoShowcase />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <DesignTemplates />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Education />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
