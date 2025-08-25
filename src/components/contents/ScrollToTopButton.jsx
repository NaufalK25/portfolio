import { useEffect, useState } from 'react';
import { ArrowUp } from 'react-feather';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setShowButton(scrollTop > window.innerHeight / 3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // ✅ add dependency array so it only runs once

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    showButton && (
      <button
        aria-label='Back to top'
        onClick={handleClick}
        className='fixed right-5 bottom-5 z-50 p-3 rounded-full bg-slate-800 dark:bg-slate-200 shadow-lg
                   transition hover:scale-110 active:scale-95 cursor-pointer'
      >
        <ArrowUp className='w-6 h-6 text-slate-200 dark:text-slate-800' />
      </button>
    )
  );
};

export default ScrollToTopButton;
