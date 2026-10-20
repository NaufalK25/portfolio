import { useData } from '../data/context';
import { formatDate, img, related } from '../data/projects';

const External = ({ href, children }) => (
  <a
    className='link'
    href={href}
    target='_blank'
    rel='noopener noreferrer'
  >
    {children}
    <span aria-hidden='true'>{'\u00a0↗'}</span>
  </a>
);

const Project = ({ project: p }) => {
  const { projects } = useData();
  const i = projects.findIndex(x => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const joined = related(p, projects);
  const text = p.notes;

  return (
    <article className='case'>
      <header className='case__head grid'>
        <p className='case__crumb notation'>
          <a
            className='link'
            href='/#work'
          >
            project
          </a>
          <span aria-hidden='true'> / </span>
          <span>{p.slug}</span>
        </p>
        <h1
          className='case__title'
          style={{ '--len': p.name.length }}
          data-split='chars'
          data-intro
        >
          {p.name}
        </h1>
        <p
          className='case__summary'
          data-split='lines'
          data-intro
          data-delay='0.2'
        >
          {p.description}
        </p>
        <dl
          className='case__record entity'
          data-reveal='clip'
          data-intro
          data-delay='0.35'
        >
          <div className='entity__row'>
            <dt className='notation'>
              <abbr title='primary key'>PK</abbr> name
            </dt>
            <dd>{p.name}</dd>
          </div>
          <div className='entity__row'>
            <dt className='notation'>created_at</dt>
            <dd>
              <time dateTime={p.created}>{formatDate(p.created)}</time>
            </dd>
          </div>
          <div className='entity__row'>
            <dt className='notation'>stack</dt>
            <dd>{p.stacks.join(', ')}</dd>
          </div>
          {p.homepage && (
            <div className='entity__row'>
              <dt className='notation'>homepage</dt>
              <dd>
                <External href={p.homepage}>{p.homepage.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</External>
              </dd>
            </div>
          )}
          <div className='entity__row'>
            <dt className='notation'>repository</dt>
            <dd>
              <External href={p.repo}>{p.repo.replace('https://github.com/', '')}</External>
            </dd>
          </div>
          {p.license && (
            <div className='entity__row'>
              <dt className='notation'>license</dt>
              <dd>{p.licenseUrl ? <External href={p.licenseUrl}>{p.license}</External> : p.license}</dd>
            </div>
          )}
        </dl>
      </header>

      {p.thumbnail && (
        <figure className='case__shot'>
          <div
            className='case__stage'
            data-reveal='scale'
          >
            <img
              src={img(p.thumbnail, 1400)}
              srcSet={`${img(p.thumbnail, 600)} 600w, ${img(p.thumbnail, 800)} 800w, ${img(p.thumbnail, 1400)} 1400w, ${img(p.thumbnail, 2000)} 2000w`}
              sizes='(min-width: 768px) 75vw, 100vw'
              alt={`Screenshot of ${p.name}`}
              width='1400'
              height='875'
              fetchPriority='high'
              decoding='async'
            />
          </div>
          <figcaption className='notation'>{p.name}.thumbnail</figcaption>
        </figure>
      )}

      {text.length > 0 && (
        <section
          className='case__notes grid'
          aria-labelledby='notes-title'
        >
          <h2
            id='notes-title'
            className='case__label notation'
          >
            notes
          </h2>
          <div className='case__body'>
            {text.map(t => (
              <p
                key={t.slice(0, 24)}
                data-split='lines'
              >
                {t}
              </p>
            ))}
          </div>
        </section>
      )}

      {joined.length > 0 && (
        <section
          className='case__related grid'
          aria-labelledby='related-title'
        >
          <h2
            id='related-title'
            className='case__label notation'
          >
            shares a stack with
          </h2>
          <ul className='case__joins'>
            {joined.map(o => (
              <li key={o.slug}>
                <a
                  className='join-link'
                  href={`/work/${o.slug}`}
                >
                  <span className='join-link__name'>{o.name}</span>
                  <span className='join-link__on notation'>on {o.shared.join(', ')}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav
        className='case__next'
        aria-label='Next project'
      >
        <span className='notation'>next record</span>
        <a
          className='next-link'
          href={`/work/${next.slug}`}
        >
          <span className='next-link__name'>{next.name}</span>
          <span
            className='next-link__arrow'
            aria-hidden='true'
          >
            →
          </span>
        </a>
      </nav>
    </article>
  );
};

export default Project;
