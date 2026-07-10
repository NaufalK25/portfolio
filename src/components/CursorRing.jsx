import { useEffect, useRef } from 'react';

const CursorRing = () => {
  const wrapperRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const box = boxRef.current;

    const handleMouseMove = e => {
      wrapper.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const handleMouseOver = e => {
      if (e.target.closest('a, button, .tooltip')) {
        box.classList.add('is-active');
      }
    };

    const handleMouseOut = e => {
      if (e.target.closest('a, button, .tooltip')) {
        box.classList.remove('is-active');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className='pointer-events-none fixed left-0 top-0 z-999 -ml-5 -mt-5 pointer-coarse:hidden'
    >
      <div
        ref={boxRef}
        className='cursor-ring-box flex h-10 w-10 items-center justify-center rounded-lg border-2 border-green-500 transition-transform duration-200 ease-out dark:border-green-400'
      >
        <span className='h-1.5 w-1.5 bg-green-500 dark:bg-green-400' />
      </div>
    </div>
  );
};

export default CursorRing;
