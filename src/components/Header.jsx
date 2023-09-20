import { useState, useEffect } from 'react';
import DownloadCVButton from './DownloadCVButton';

function Header() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('mode');
    return savedMode || 'light';
  });
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const switcher = document.querySelector('#switcher');

    if (mode === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
      switcher.classList.add('translate-x-5');
      switcher.title = 'Switch to Light Mode';
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
      switcher.classList.remove('translate-x-5');
      switcher.title = 'Switch to Dark Mode';
    }

    localStorage.setItem('mode', mode);
  }, [mode]);

  function handleNavHamburgerClick() {
    setIsNavMenuOpen(prevIsOpen => !prevIsOpen);
  }

  function handleNavAboutMeClick() {
    const aboutMeSection = document.querySelector('section#about-me');
    scrollTo({
      top: aboutMeSection.offsetTop - 25,
      behavior: 'smooth'
    });
  }

  function handleNavMySkillsClick() {
    const mySkilsSection = document.querySelector('section#my-skills');
    scrollTo({
      top: mySkilsSection.offsetTop - 25,
      behavior: 'smooth'
    });
  }

  function handleNavMyProjectsClick() {
    const myProjectsSection = document.querySelector('section#my-projects');
    scrollTo({
      top: myProjectsSection.offsetTop - 25,
      behavior: 'smooth'
    });
  }

  function handleModeToggleClick() {
    setMode(prevMode => (prevMode === 'dark' ? 'light' : 'dark'));
  }

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
            id='nav-hamburger'
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
          id='nav-menu'
        >
          <p
            id='nav-about-me'
            title='About Me'
            className='hover:underline hover:font-bold active:font-bold focus:font-bold cursor-pointer'
            onClick={handleNavAboutMeClick}
          >
            About Me
          </p>
          <p
            id='nav-my-skills'
            title='My Skills'
            className='hover:underline hover:font-bold active:font-bold focus:font-bold cursor-pointer'
            onClick={handleNavMySkillsClick}
          >
            My Skills
          </p>
          <p
            id='nav-my-projects'
            title='My Projects'
            className='hover:underline hover:font-bold active:font-bold focus:font-bold cursor-pointer'
            onClick={handleNavMyProjectsClick}
          >
            My Projects
          </p>
          <DownloadCVButton />
          <div
            id='switcher-container'
            className='w-10 h-5 rounded-full bg-slate-800 dark:bg-slate-100'
          >
            <div
              id='switcher'
              className='w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 cursor-pointer'
              title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
              onClick={handleModeToggleClick}
            ></div>
          </div>
        </section>
      </nav>
    </header>
  );
}

export default Header;
