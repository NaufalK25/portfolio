import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;

    const handleMouseMove = e => {
      glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className='pointer-events-none fixed left-0 top-0 z-999 h-72 w-72 rounded-full bg-green-400/25 blur-3xl transition-transform duration-150 ease-out dark:bg-green-500/20 pointer-coarse:hidden'
    />
  );
};

export default CursorGlow;
