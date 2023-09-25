import { useState, useEffect } from 'react';
import DownloadCVButton from './DownloadCVButton';

const Header = () => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('mode') || 'light';
  });
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

  const handleNavAboutMeClick = () => {
    const aboutMeSection = document.querySelector('section#about-me');
    scrollTo({
      top: aboutMeSection.offsetTop - 25,
      behavior: 'smooth'
    });
  };

  const handleNavMySkillsClick = () => {
    const mySkilsSection = document.querySelector('section#my-skills');
    scrollTo({
      top: mySkilsSection.offsetTop - 25,
      behavior: 'smooth'
    });
  };

  const handleNavMyProjectsClick = () => {
    const myProjectsSection = document.querySelector('section#my-projects');
    scrollTo({
      top: myProjectsSection.offsetTop - 25,
      behavior: 'smooth'
    });
  };

  const handleModeToggleClick = () => {
    setMode(prevMode => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header>
      <nav
        className={`${
          !isNavMenuOpen && 'flex'
        } md:flex-row justify-evenly pt-3`}
      >
        <section className='flex items-center gap-x-24 flex-row justify-center'>
          <a
            href='/'
            title='Muhammad Naufal Kateni'
            className='hover:underline hover:font-bold active:font-bold focus:font-bold'
          >
            Muhammad Naufal Kateni
          </a>
          <section
            className='md:hidden flex cursor-pointer'
            title='Navigation Bar'
            onClick={handleNavHamburgerClick}
          >
            <svg
              height='24px'
              viewBox='0 0 24 24'
              width='24px'
              className='fill-slate-800 dark:fill-slate-100'
            >
              <path
                d='M0 0h24v24H0V0z'
                fill='none'
              />
              <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
            </svg>
          </section>
        </section>
        <section
          className={`${
            isNavMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-center gap-4`}
        >
          <p
            title='About Me'
            className='hover:underline hover:font-bold active:font-bold focus:font-bold cursor-pointer'
            onClick={handleNavAboutMeClick}
          >
            About Me
          </p>
          <p
            title='My Skills'
            className='hover:underline hover:font-bold active:font-bold focus:font-bold cursor-pointer'
            onClick={handleNavMySkillsClick}
          >
            My Skills
          </p>
          <p
            title='My Projects'
            className='hover:underline hover:font-bold active:font-bold focus:font-bold cursor-pointer'
            onClick={handleNavMyProjectsClick}
          >
            My Projects
          </p>
          <DownloadCVButton />
          <div className='w-10 h-5 rounded-full bg-slate-800 dark:bg-slate-100'>
            <div
              className={`${
                mode === 'dark' && 'translate-x-5'
              } w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 cursor-pointer`}
              title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
              onClick={handleModeToggleClick}
            ></div>
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Header;
