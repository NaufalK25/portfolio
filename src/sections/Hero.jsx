import { memo, useRef } from 'react';
import { developer, site } from '../data/site';
import { useData } from '../data/context';
import { usePage } from '../router';
import { flow } from '../motion/flow';

// Split text lives here and never re-renders (memo, no props).
const Name = memo(() => (
  <h1 className='hero__name'>
    <span
      className='hero__first'
      data-split='chars'
      data-intro
    >
      Muhammad
    </span>
    <span
      className='hero__last'
      data-split='chars'
      data-intro
      data-delay='0.06'
    >
      Naufal
    </span>
    <span
      className='hero__last'
      data-split='chars'
      data-intro
      data-delay='0.12'
    >
      Kateni
    </span>
  </h1>
));

const Source = () => {
  const { projects, ms, status } = useData();
  return (
    <p className='hero__source notation'>
      {projects.length} project rows from portfolio-api
      {status === 'live'
        ? `, read live in ${ms} ms`
        : status === 'offline'
          ? ', from the last build'
          : ''}
    </p>
  );
};

const Hero = () => {
  const line = useRef(null);
  usePage(() => flow(line.current, line.current, 8));
  return (
    <section
      className='hero grid'
      aria-label='Introduction'
    >
      <Name />
      <div className='hero__intro'>
        <p
          className='hero__statement'
          data-split='lines'
          data-intro
          data-delay='0.3'
        >
          {site.statement}
        </p>
        <Source />
      </div>
      <div className='hero__dev'>
        <figure
          className='entity'
          data-reveal='clip'
          data-intro
          data-delay='0.45'
        >
          <figcaption className='entity__head'>
            <span className='entity__table'>developer</span>
            <span className='notation'>1 row</span>
          </figcaption>
          <dl className='entity__rows'>
            {developer.map(r => (
              <div
                className='entity__row'
                key={r.field}
              >
                <dt>
                  <span className='entity__key notation'>
                    {r.key && <abbr title='primary key'>{r.key}</abbr>}
                  </span>
                  <span className='entity__field notation'>{r.field}</span>
                  <span className='entity__type notation'>{r.type}</span>
                </dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        </figure>
        <svg
          className='hero__relation relation'
          ref={line}
          viewBox='0 0 24 120'
          preserveAspectRatio='none'
          aria-hidden='true'
        >
          <path
            className='relation__line'
            d='M12 0 V120'
          />
          <path
            className='relation__foot'
            d='M12 104 L2 120 M12 104 V120 M12 104 L22 120 M4 8 H20'
          />
        </svg>
        <span
          className='hero__cardinality notation'
          aria-hidden='true'
        >
          builds 1:N project
        </span>
      </div>
    </section>
  );
};

export default Hero;
