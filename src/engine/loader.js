// First-load sequence. Progress follows REAL work (fonts, critical images, and any task added
// with addLoaderTask), with a floor so it reads as intentional and a ceiling so it never blocks.
import { gsap } from 'gsap';
import { ease, prefersReducedMotion } from './env';

let format = p => String(Math.round(p)).padStart(3, '0');
export const setLoaderFormat = fn => {
  format = fn;
};
let exit = null;
export const setLoaderExit = fn => {
  exit = fn;
};
const extra = [];
/** Count a promise (an API request) as part of the first load. */
export const addLoaderTask = p => {
  extra.push(Promise.resolve(p).catch(() => {}));
};

const MIN = 0.8;
const MAX = 2.6;

function criticalAssets() {
  const imgs = [...document.querySelectorAll('img[data-critical], [data-intro] img')];
  return [
    document.fonts.ready,
    ...imgs.map(i => (i.complete ? Promise.resolve() : i.decode().catch(() => {}))),
    ...extra
  ];
}

export async function runLoader() {
  const root = document.getElementById('loader');
  if (!root || root.hidden) return;
  if (getComputedStyle(root).display === 'none') return finish(root);
  if (prefersReducedMotion()) {
    await Promise.race([Promise.all(criticalAssets()), wait(1.2)]);
    await gsap.to(root, { autoAlpha: 0, duration: 0.3 });
    return finish(root);
  }
  const count = root.querySelector('[data-loader-count]');
  const bar = root.querySelector('[data-loader-bar]');
  const tasks = criticalAssets();
  let done = 0;
  const shown = { v: 0 };
  const target = { v: 0 };
  tasks.forEach(t =>
    t.then(() => {
      done++;
      target.v = (done / tasks.length) * 100;
    })
  );
  // The budget counts from navigation start, so a slow script download eats into it rather than
  // adding to it. Exit time comes out of the same 2.6 s.
  const start = 0;
  const cap = MAX - (exit ? 0.9 : 1);

  await new Promise(resolve => {
    const tick = () => {
      const elapsed = (performance.now() - start) / 1000;
      const timeCap = Math.min(100, (elapsed / MIN) * 100);
      const goal = elapsed > cap ? 100 : Math.min(target.v, timeCap);
      shown.v += (goal - shown.v) * (1 - Math.pow(0.86, gsap.ticker.deltaRatio()));
      if ((goal === 100 && shown.v > 99.5) || elapsed > cap + 0.15) shown.v = 100;
      if (count) count.textContent = format(shown.v);
      if (bar) bar.style.transform = `scaleX(${shown.v / 100})`;
      if (shown.v === 100) {
        gsap.ticker.remove(tick);
        resolve();
      }
    };
    gsap.ticker.add(tick);
  });

  // Script arrived late (slow network): CSS has already faded the loader out (engine.css).
  if (performance.now() / 1000 > cap + 0.15) {
    if (performance.now() < 2300) await gsap.to(root, { autoAlpha: 0, duration: 0.3 });
    return finish(root);
  }
  if (exit) {
    await exit(root);
    return finish(root);
  }
  await gsap
    .timeline()
    .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.6, ease: ease.inOut, stagger: 0.05 })
    .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: ease.inOut }, '-=0.35');
  finish(root);
}

function finish(root) {
  root.hidden = true;
  document.documentElement.classList.add('is-loaded');
}

const wait = s => new Promise(r => setTimeout(r, s * 1000));
