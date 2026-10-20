// Global motion, registered once before the first page: the loader handoff, the page
// transition and the header that steps aside. Runs on the client only.
import { gsap } from 'gsap';
import { ease, onScroll, setLoaderExit, setTransition } from '../engine';
import { liveStatus } from '../data/projects';

// The curtain prints the query that fetches the next page, while its rows insert.
const queryFor = path => {
  if (path === '/') return "SELECT * FROM developer WHERE handle = 'naufalk25';";
  const m = path.match(/^\/work\/([^/]+)$/);
  if (m) return `SELECT * FROM project WHERE name = '${decodeURIComponent(m[1])}';`;
  return `SELECT * FROM page WHERE path = '${path}';`;
};

export function setupMotion() {
  setLoaderExit(root => {
    const req = root.querySelector('[data-loader-req]');
    return gsap
      .timeline()
      .add(() => {
        req.textContent = liveStatus.text ?? 'still waiting, showing the last build';
        root.classList.add('is-done');
      })
      .to({}, { duration: 0.3 })
      .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: ease.inOut });
  });

  setTransition({
    leave: (c, info) => {
      const panels = c.querySelectorAll('.curtain__panel');
      const q = c.querySelector('.curtain__query');
      q.textContent = queryFor(info?.path ?? '/');
      return gsap
        .timeline()
        .set(c, { autoAlpha: 1 })
        .set(q, { autoAlpha: 0 })
        .fromTo(
          panels,
          { scaleX: 0, transformOrigin: '0% 50%' },
          { scaleX: 1, duration: 0.55, ease: ease.inOut, stagger: 0.05 }
        )
        .to(q, { autoAlpha: 1, duration: 0.2 }, '-=0.25');
    },
    enter: c =>
      gsap
        .timeline()
        .to(c.querySelector('.curtain__query'), { autoAlpha: 0, duration: 0.15 })
        .to(
          c.querySelectorAll('.curtain__panel'),
          { scaleX: 0, transformOrigin: '100% 50%', duration: 0.55, ease: ease.inOut, stagger: 0.05 },
          '<0.05'
        )
        .set(c, { autoAlpha: 0 })
  });

  // The header steps aside while reading down and returns on the way up.
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 4) return;
    const h = document.documentElement.classList;
    h.toggle('frame-away', y > 160 && y > last);
    h.toggle('frame-up', y < last);
    h.toggle('frame-solid', y > 40);
    last = y;
  });
}
