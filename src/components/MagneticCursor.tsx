import { useEffect, useRef, useState } from 'react';

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Add hover detection for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Initial setup and mutation observer for dynamic elements
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Smooth animation loop
    const animate = () => {
      const cursor = cursorRef.current;
      const dot = cursorDotRef.current;
      if (!cursor || !dot) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Lerp for smooth following
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.15;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.15;

      cursor.style.transform = `translate(${positionRef.current.x - 20}px, ${positionRef.current.y - 20}px)`;
      dot.style.transform = `translate(${targetRef.current.x - 4}px, ${targetRef.current.y - 4}px)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`w-full h-full rounded-full border-2 transition-all duration-300 ${
            isHovering
              ? 'border-neon-orange scale-150 bg-neon-orange/10'
              : 'border-neon-cyan bg-neon-cyan/5'
          }`}
          style={{
            boxShadow: isHovering
              ? '0 0 20px rgba(255, 102, 0, 0.5)'
              : '0 0 20px rgba(0, 255, 255, 0.5)',
          }}
        />
      </div>

      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`w-full h-full rounded-full transition-all duration-200 ${
            isHovering ? 'bg-neon-orange scale-150' : 'bg-neon-cyan'
          }`}
          style={{
            boxShadow: isHovering
              ? '0 0 10px rgba(255, 102, 0, 0.8)'
              : '0 0 10px rgba(0, 255, 255, 0.8)',
          }}
        />
      </div>

      {/* Hide default cursor */}
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
