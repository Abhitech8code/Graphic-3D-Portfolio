import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const positionRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      positionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition(positionRef.current);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return mousePosition;
}

export function useRelativeMousePosition(ref: React.RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setPosition({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
      });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0.5, y: 0.5 });
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [ref]);

  return position;
}
