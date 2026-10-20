import { contacts, site } from '../data/site';

const Footer = () => (
  <footer
    id='contact'
    className='footer'
    aria-labelledby='contact-title'
  >
    <h2
      id='contact-title'
      className='sr-only'
    >
      Contact
    </h2>
    <p className='footer__lede notation'>INSERT INTO conversation VALUES (you, me)</p>
    <a
      className='footer__cta'
      href={`mailto:${site.email}`}
    >
      <span className='footer__fill' aria-hidden='true' />
      <span className='footer__cta-label'>Email me</span>
      <span
        className='footer__arrow'
        aria-hidden='true'
      >
        →
      </span>
    </a>
    <div className='footer__grid grid'>
      <ul className='footer__contacts'>
        {contacts.map(c => (
          <li key={c.channel}>
            <a
              href={c.href}
              target={c.href.startsWith('mailto:') ? undefined : '_blank'}
              rel='noopener noreferrer'
            >
              <span className='notation'>{c.channel}</span>
              <span>{c.handle}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className='footer__colophon'>
        <p>
          The project rows and the schema on this site come from{' '}
          <a
            className='link'
            href='/work/portfolio-api'
          >
            portfolio-api
          </a>
          , which I edit through{' '}
          <a
            className='link'
            href='/work/portfolio-dashboard'
          >
            portfolio-dashboard
          </a>
          . Set in Archivo and Martian Mono.
        </p>
        <p className='notation'>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
