import { useState, useEffect } from 'react';
import DownloadCVButton from './DownloadCVButton';

const ModeIcon = ({ mode }) =>
  mode === 'dark' ? (
    <svg
      className='w-5 h-5 text-yellow-400'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 24 24'
    >
      <path
        fillRule='evenodd'
        d='M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z'
        clipRule='evenodd'
      />
    </svg>
  ) : (
    <svg
      className='w-5 h-5 text-gray-800'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 24 24'
    >
      <path d='M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z' />
    </svg>
  );

const Header = ({ refs, onNavClick }) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem('mode') || 'light'
  );
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (mode === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    }
    localStorage.setItem('mode', mode);
  }, [mode]);

  const handleNavHamburgerClick = () => {
    setIsNavMenuOpen(prevIsOpen => !prevIsOpen);
  };

  const handleModeToggleClick = () => {
    setMode(prevMode => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const modeToggleLabel =
    mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className='sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm'>
      <nav className='container mx-auto flex items-center justify-between px-6 py-3'>
        {/* Logo / Name */}
        <a
          href='/'
          className='font-mono text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-green-500 transition-colors'
        >
          Muhammad Naufal Kateni
        </a>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-6'>
          <button
            onClick={() => onNavClick(refs.aboutMeRef)}
            className='text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors'
          >
            About Me
          </button>
          <button
            onClick={() => onNavClick(refs.mySkillsRef)}
            className='text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors'
          >
            My Skills
          </button>
          <button
            onClick={() => onNavClick(refs.myProjectsRef)}
            className='text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors'
          >
            My Projects
          </button>

          <DownloadCVButton />

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={handleModeToggleClick}
            aria-label={modeToggleLabel}
            className='ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:ring-2 hover:ring-green-500 transition'
          >
            <ModeIcon mode={mode} />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className='md:hidden'>
          <button
            onClick={handleNavHamburgerClick}
            aria-label={isNavMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isNavMenuOpen}
            className='p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800'
          >
            {isNavMenuOpen ? (
              <svg
                className='w-6 h-6 text-gray-800 dark:text-gray-200'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                viewBox='0 0 24 24'
              >
                <path d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg
                className='w-6 h-6 text-gray-800 dark:text-gray-200'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                viewBox='0 0 24 24'
              >
                <path d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isNavMenuOpen && (
        <div className='md:hidden absolute right-4 top-16 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 flex flex-col gap-3'>
          <button
            onClick={() => onNavClick(refs.aboutMeRef)}
            className='text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors text-left'
          >
            About Me
          </button>
          <button
            onClick={() => onNavClick(refs.mySkillsRef)}
            className='text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors text-left'
          >
            My Skills
          </button>
          <button
            onClick={() => onNavClick(refs.myProjectsRef)}
            className='text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors text-left'
          >
            My Projects
          </button>
          <DownloadCVButton />
          <button
            onClick={handleModeToggleClick}
            aria-label={modeToggleLabel}
            className='mt-2 flex items-center gap-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:ring-2 hover:ring-green-500 transition'
          >
            <ModeIcon mode={mode} />
            {mode === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
