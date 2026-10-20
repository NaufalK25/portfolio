import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '../data/site';
import { usePage } from '../router';

const links = [
  { href: '/#work', id: 'work', label: 'Work' },
  { href: '/#schema', id: 'schema', label: 'Schema' },
  { href: '/#experience', id: 'experience', label: 'Experience' },
  { href: '/#about', id: 'about', label: 'About' },
  { href: '/#contact', id: 'contact', label: 'Contact' }
];

const Header = ({ path }) => {
  // null until mounted: the prerendered HTML can't know the visitor's theme.
  const [dark, setDark] = useState(null);
  const [section, setSection] = useState(null);

  useEffect(() => setDark(document.documentElement.classList.contains('dark')), []);

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('mode', next ? 'dark' : 'light');
    } catch {
      // private mode: the choice lasts for this visit only
    }
    setDark(next);
  };

  // Mark the section in view as the current location.
  usePage(() => {
    setSection(null);
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: s => s.isActive && setSection(id),
        onLeaveBack: () => id === 'work' && setSection(null)
      });
    });
  });

  return (
    <header className='frame'>
      <a
        className='frame__name draw'
        href='/'
        aria-current={path === '/' && !section ? 'page' : undefined}
      >
        {site.short}
      </a>
      <nav
        className='frame__nav'
        aria-label='Main'
      >
        <ul>
          {links.map(l => (
            <li key={l.id}>
              <a
                className='draw'
                href={l.href}
                aria-current={path === '/' && section === l.id ? 'location' : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className='frame__tools'>
        <a
          className='btn btn--small'
          href={site.cv}
          target='_blank'
          rel='noopener noreferrer'
        >
          <span className='btn__label'>CV</span>
          <span
            className='btn__arrow'
            aria-hidden='true'
          >
            ↗
          </span>
        </a>
        <button
          type='button'
          className='theme'
          onClick={toggleTheme}
          aria-pressed={dark ?? false}
        >
          <span
            className='theme__dot'
            aria-hidden='true'
          />
          <span className='sr-only'>Dark theme</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
