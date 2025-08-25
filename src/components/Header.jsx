import { useState, useEffect } from 'react';
import DownloadCVButton from './DownloadCVButton';

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
            className='ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:ring-2 hover:ring-green-500 transition'
          >
            {mode === 'dark' ? (
              <svg
                className='w-5 h-5 text-yellow-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M12 3a1 1 0 0 0-1 1v1a1...z' />
              </svg>
            ) : (
              <svg
                className='w-5 h-5 text-gray-800'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M21.64 13a1 1 0...z' />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className='md:hidden'>
          <button
            onClick={handleNavHamburgerClick}
            className='p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800'
          >
            {isNavMenuOpen ? (
              <svg
                className='w-6 h-6 text-gray-800 dark:text-gray-200'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg
                className='w-6 h-6 text-gray-800 dark:text-gray-200'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
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
            className='mt-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:ring-2 hover:ring-green-500 transition'
          >
            {mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
