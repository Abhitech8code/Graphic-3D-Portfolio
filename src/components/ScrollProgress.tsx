import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-black/50">
      <div
        className="h-full bg-gradient-to-r from-neon-cyan via-neon-orange to-neon-cyan"
        style={{
          width: `${progress * 100}%`,
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
          transition: 'width 0.1s ease-out',
        }}
      />
    </div>
  );
}
