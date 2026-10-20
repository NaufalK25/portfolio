import { memo } from 'react';
import { jobs } from '../data/site';

const month = ym =>
  new Date(`${ym}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

// Static copy with split text: memo keeps it from re-rendering when live API rows arrive.
const Experience = memo(() => (
  <section
    id='experience'
    className='experience'
    aria-labelledby='experience-title'
  >
    <header className='section-head grid'>
      <h2
        id='experience-title'
        className='section-title'
        data-split='lines'
      >
        Experience
      </h2>
      <p className='section-query notation'>
        <span>SELECT * FROM employment ORDER BY started_at DESC</span>
        <span className='section-count'>{jobs.length} rows</span>
      </p>
    </header>

    <ol className='jobs'>
      {jobs.map(j => (
        <li
          className='job grid'
          key={j.company}
          data-reveal='up'
        >
          <p className='job__meta notation'>
            <time dateTime={j.from}>{month(j.from)}</time> to{' '}
            {j.to ? <time dateTime={j.to}>{month(j.to)}</time> : <span className='job__now'>now</span>}
            <br />
            {j.place}
          </p>
          <div className='job__body'>
            <h3 className='job__company'>{j.company}</h3>
            <p className='job__role'>{j.role}</p>
            {j.summary && <p className='job__summary'>{j.summary}</p>}
            <ul className='job__points'>
              {j.points.map(p => (
                <li key={p.lead}>
                  <span className='job__lead'>{p.lead}</span>
                  <span className='job__detail'>{p.detail}</span>
                </li>
              ))}
            </ul>
            <ul
              className='job__tags notation'
              aria-label='Stack'
            >
              {j.tags.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  </section>
));

export default Experience;
