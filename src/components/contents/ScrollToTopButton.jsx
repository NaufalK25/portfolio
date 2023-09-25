import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(
        document.body.scrollTop > innerHeight / 3 ||
          document.documentElement.scrollTop > innerHeight / 3
      );
    };

    addEventListener('scroll', handleScroll);

    return () => {
      removeEventListener('scroll', handleScroll);
    };
  });

  const handleClick = () => {
    scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    showButton && (
      <button
        title='Back to Top'
        className='fixed shadow-lg right-5 bottom-5 z-10 cursor-pointer bg-slate-800 dark:bg-slate-200 rounded-full p-2'
        onClick={handleClick}
      >
        <svg
          height='24px'
          viewBox='0 0 24 24'
          width='24px'
          className='fill-slate-200 dark:fill-slate-800'
        >
          <path
            d='M0 0h24v24H0V0z'
            fill='none'
          />
          <path d='M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z' />
        </svg>
      </button>
    )
  );
};

export default ScrollToTopButton;
