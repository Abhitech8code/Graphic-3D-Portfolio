import { useRef, useCallback } from 'react';

export function useMagneticEffect(strength = 0.3) {
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const element = elementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;
    
    element.style.transform = 'translate(0, 0)';
    element.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
  }, []);

  const handleMouseEnter = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;
    
    element.style.transition = 'transform 0.1s ease-out';
  }, []);

  return {
    ref: elementRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
  };
}
