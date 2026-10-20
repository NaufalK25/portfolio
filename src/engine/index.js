// Engine core: page lifecycle. No DOM access at import time (safe for the prerender).
//   boot(setup)          once, on first load: setup → loader → page init → intro
//   leave() → cleanup()  before the route swaps
//   enter()              after the new page is in the DOM: init → enter animation → intro
// Page code hooks in with onPage(fn) (usePage in components): fn runs inside a gsap.context, so its
// tweens and ScrollTriggers are reverted on navigation. Return a cleanup for anything else.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll, resetScroll, scrollToTarget, startScroll, stopScroll } from './scroll';
import { initReveals } from './reveal';
import { runLoader } from './loader';
import { playEnter, playLeave } from './transition';
import { prefersReducedMotion } from './env';

export { onScroll, scrollState, scrollToTarget, stopScroll, startScroll } from './scroll';
export { setTransition } from './transition';
export { setLoaderFormat, setLoaderExit, addLoaderTask } from './loader';
export { ease, isTouch, isMobile, prefersReducedMotion } from './env';

const pageFns = new Set();
const cleanups = [];
let ctx = null;
let intro = null;
let ready = false;
let booted = false;

export function onPage(fn) {
  pageFns.add(fn);
  if (ready) runPageFn(fn);
  return () => {
    pageFns.delete(fn);
  };
}

function runPageFn(fn) {
  ctx?.add(() => {
    const c = fn({ intro, path: location.pathname });
    if (typeof c === 'function') cleanups.push(c);
  });
}

export function syncFlags() {
  const h = document.documentElement.classList;
  h.add('js', 'is-booted');
  h.toggle('motion', !prefersReducedMotion());
}

function initPage() {
  syncFlags();
  ctx = gsap.context(() => {
    intro = initReveals(document);
  });
  ready = true;
  pageFns.forEach(runPageFn);
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

export async function boot(setup) {
  if (booted) return;
  booted = true;
  syncFlags();
  initScroll();
  setup?.();
  stopScroll();
  initPage();
  await runLoader();
  startScroll();
  intro?.play();
}

export async function leave(info) {
  stopScroll();
  await playLeave(info);
}

export function cleanup() {
  if (!ready) return;
  ready = false;
  cleanups.splice(0).forEach(c => c());
  ctx?.revert();
  ctx = null;
}

export async function enter({ transition = true, scrollTop = true, hash = null } = {}) {
  if (!booted) return;
  cleanup();
  if (scrollTop) resetScroll();
  initPage();
  if (hash) {
    ScrollTrigger.refresh();
    scrollToTarget(hash, { immediate: true });
  }
  if (transition) await playEnter();
  startScroll();
  // Layout can still move while the curtain lifts: land on the anchor once more.
  if (hash) scrollToTarget(hash, { immediate: true });
  intro?.play();
}
