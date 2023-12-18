import { useEffect, useState } from 'react';
import { ArrowUp } from 'react-feather';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(
        document.body.scrollTop > window.innerHeight / 3 ||
          document.documentElement.scrollTop > window.innerHeight / 3
      );
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    showButton && (
      <button
        className='fixed shadow-lg right-5 bottom-5 z-10 cursor-pointer bg-slate-800 dark:bg-slate-200 rounded-full p-2 tooltip'
        data-tip='Back to Top'
        onClick={handleClick}
      >
       <ArrowUp className='text-slate-200 dark:text-slate-800' />
      </button>
    )
  );
};

export default ScrollToTopButton;
