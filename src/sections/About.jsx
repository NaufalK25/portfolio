import { bio, site, skills } from '../data/site';

const About = () => (
  <section
    id='about'
    className='about grid'
    aria-labelledby='about-title'
  >
    <figure
      className='about__portrait'
      data-reveal='clip'
    >
      <div className='about__frame'>
        <img
          src={site.portrait.src}
          srcSet={`${site.portrait.small} 420w, ${site.portrait.src} 680w`}
          sizes='(min-width: 768px) 34vw, 70vw'
          alt='Muhammad Naufal Kateni in a dark short-sleeved shirt against a grey studio wall'
          width={site.portrait.w}
          height={site.portrait.h}
          loading='lazy'
          decoding='async'
          data-parallax='0.06'
        />
      </div>
      <figcaption className='notation'>developer.photo</figcaption>
    </figure>
    <div className='about__text'>
      <h2
        id='about-title'
        className='section-title'
        data-split='lines'
      >
        About
      </h2>
      {bio.map(p => (
        <p
          key={p.slice(0, 20)}
          className='about__p'
          data-split='lines'
        >
          {p}
        </p>
      ))}
      <dl className='about__skills'>
        {skills.map(g => (
          <div key={g.group}>
            <dt className='notation'>{g.group}</dt>
            <dd>{g.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
      <a
        className='btn'
        href={site.cv}
        target='_blank'
        rel='noopener noreferrer'
      >
        <span className='btn__label'>Read the CV</span>
        <span
          className='btn__arrow'
          aria-hidden='true'
        >
          ↗
        </span>
      </a>
    </div>
  </section>
);

export default About;
