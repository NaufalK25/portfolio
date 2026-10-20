import { useRef } from 'react';
import { gsap } from 'gsap';
import { useData } from '../data/context';
import { img } from '../data/projects';
import { ease, isTouch, onScroll, prefersReducedMotion } from '../engine';
import { usePage } from '../router';

const WorkIndex = () => {
  const { projects } = useData();
  const list = useRef(null);
  const preview = useRef(null);

  usePage(() => {
    const rows = list.current;
    const box = preview.current;
    if (!rows || !box) return;
    // Rows insert: each slides out of its own clipped line.
    if (!prefersReducedMotion())
      gsap.from(rows.querySelectorAll('.row__inner'), {
        yPercent: 100,
        duration: 1,
        ease: ease.out,
        stagger: 0.05,
        scrollTrigger: { trigger: rows, start: 'top 85%', once: true }
      });
    if (isTouch() || prefersReducedMotion()) return;

    const image = box.querySelector('img');
    const x = gsap.quickTo(box, 'x', { duration: 0.6, ease: ease.soft });
    const y = gsap.quickTo(box, 'y', { duration: 0.6, ease: ease.soft });
    const rot = gsap.quickTo(box, 'rotation', { duration: 0.8, ease: ease.soft });
    let px = 0;
    let py = 0;
    let lastX = 0;
    const move = e => {
      px = e.clientX;
      py = e.clientY;
      x(px);
      y(py);
      rot(gsap.utils.clamp(-8, 8, (px - lastX) * 0.4));
      lastX = px;
    };
    const show = e => {
      const src = e.currentTarget.dataset.preview;
      if (!src) return;
      if (image.getAttribute('src') !== src) image.src = src;
      if (e.type === 'focus') {
        const r = e.currentTarget.getBoundingClientRect();
        gsap.set(box, { x: r.left + r.width * 0.55, y: r.bottom - r.height * 0.4 });
      }
      gsap.to(box, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: ease.out,
        overwrite: 'auto'
      });
    };
    const hide = () =>
      gsap.to(box, {
        autoAlpha: 0,
        scale: 0.9,
        duration: 0.35,
        ease: ease.out,
        overwrite: 'auto'
      });
    const links = [...rows.querySelectorAll('a[data-preview]')];
    links.forEach(a => {
      a.addEventListener('pointerenter', show);
      a.addEventListener('focus', show);
      a.addEventListener('blur', hide);
    });
    rows.addEventListener('pointerleave', hide);
    addEventListener('pointermove', move, { passive: true });
    // pointerleave never fires when the page scrolls under a still pointer.
    const off = onScroll(() => {
      if (!rows.contains(document.elementFromPoint(px, py))) hide();
    });
    // Warm the cache so the first hover isn't blank.
    links.forEach(a => (new Image().src = a.dataset.preview));
    return () => {
      links.forEach(a => {
        a.removeEventListener('pointerenter', show);
        a.removeEventListener('focus', show);
        a.removeEventListener('blur', hide);
      });
      rows.removeEventListener('pointerleave', hide);
      removeEventListener('pointermove', move);
      off();
    };
  });

  return (
    <section
      id='work'
      className='work'
      aria-labelledby='work-title'
    >
      <header className='section-head grid'>
        <h2
          id='work-title'
          className='section-title'
          data-split='lines'
        >
          Projects
        </h2>
        <p className='section-query notation'>
          <span>SELECT * FROM project ORDER BY created_at DESC</span>
          <span className='section-count'>{projects.length} rows</span>
        </p>
      </header>

      <div
        className='rows-head grid notation'
        aria-hidden='true'
      >
        <span>name</span>
        <span>description</span>
        <span>stack</span>
        <span>created</span>
      </div>
      <ol
        className='rows'
        ref={list}
      >
        {projects.map(p => (
          <li
            className='row'
            key={p.slug}
          >
            <a
              className='row__link'
              href={`/work/${p.slug}`}
              data-preview={p.thumbnail ? img(p.thumbnail, 640) : undefined}
            >
              <span
                className='row__fill'
                aria-hidden='true'
              />
              <span className='row__inner grid'>
                <span className='row__name'>{p.name}</span>
                <span className='row__desc'>{p.description}</span>
                <span className='row__stack'>{p.stacks.join(', ')}</span>
                <span className='row__year notation'>{p.year}</span>
                {p.thumbnail && (
                  <img
                    className='row__thumb'
                    src={img(p.thumbnail, 480)}
                    alt=''
                    width='480'
                    height='300'
                    loading='lazy'
                    decoding='async'
                  />
                )}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <div
        className='preview'
        ref={preview}
        aria-hidden='true'
      >
        <img
          alt=''
          width='640'
          height='400'
        />
      </div>
    </section>
  );
};

export default WorkIndex;
