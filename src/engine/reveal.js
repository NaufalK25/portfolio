// Declarative motion through data attributes:
//   data-split="lines|words|chars"   masked text reveal (SplitText), on scroll or on intro
//   data-reveal="up|fade|clip|scale"  block reveal
//   data-intro                        play with the page intro instead of on scroll
//   data-delay="0.2"                  extra delay (seconds)
//   data-parallax="0.15"              scrubbed vertical drift (fraction of element height)
// Only put data-split on text React never re-renders: SplitText rewrites the DOM inside it.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ease, prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger, SplitText);

const durations = { lines: 1.2, words: 1.1, chars: 0.9 };
const staggers = { lines: 0.08, words: 0.035, chars: 0.018 };

// autoSplit re-splits after font load / resize. A text that already revealed must stay revealed.
function splitTween(el, isIntro) {
  const type = el.dataset.split || 'lines';
  const delay = parseFloat(el.dataset.delay || '0');
  const s = { tween: undefined, done: false, requested: false };
  SplitText.create(el, {
    type: type === 'lines' ? 'lines' : `lines,${type}`,
    mask: 'lines',
    autoSplit: true,
    linesClass: 'split-line',
    onSplit(self) {
      gsap.set(el, { visibility: 'visible' });
      if (s.done) return;
      const targets = type === 'lines' ? self.lines : type === 'words' ? self.words : self.chars;
      s.tween = gsap.from(targets, {
        yPercent: 110,
        duration: durations[type],
        stagger: staggers[type],
        ease: ease.out,
        delay,
        paused: isIntro && !s.requested,
        onComplete: () => {
          s.done = true;
        },
        scrollTrigger: isIntro ? undefined : { trigger: el, start: 'top 88%', once: true }
      });
      return s.tween;
    }
  });
  return () => {
    s.requested = true;
    s.tween?.play();
  };
}

function blockTween(el, paused) {
  const kind = el.dataset.reveal || 'up';
  const delay = parseFloat(el.dataset.delay || '0');
  const from =
    kind === 'fade' ? { autoAlpha: 0 }
    : kind === 'clip' ? { clipPath: 'inset(0% 100% 0% 0%)', autoAlpha: 1 }
    : kind === 'scale' ? { scale: 1.15, clipPath: 'inset(12% 12% 12% 12%)', autoAlpha: 1 }
    : { y: 48, autoAlpha: 0 };
  // clearProps only when there is something to clear: GSAP throws on clearProps: undefined.
  const to =
    kind === 'clip' || kind === 'scale' ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, clearProps: 'clipPath' } : {};
  gsap.set(el, { visibility: 'visible' });
  return gsap.fromTo(el, from, {
    ...to,
    y: 0,
    autoAlpha: 1,
    duration: kind === 'fade' ? 1 : 1.2,
    ease: ease.out,
    delay,
    paused,
    scrollTrigger: paused ? undefined : { trigger: el, start: 'top 90%', once: true }
  });
}

/** Wire every reveal inside `root`. Returns the intro timeline (paused) for the page entrance. */
export function initReveals(root = document) {
  const intro = gsap.timeline({ paused: true });
  if (prefersReducedMotion()) return intro;

  root.querySelectorAll('[data-split]').forEach(el => {
    const isIntro = el.hasAttribute('data-intro');
    const play = splitTween(el, isIntro);
    if (isIntro) intro.add(play, 0);
  });
  root.querySelectorAll('[data-reveal]').forEach(el => {
    const isIntro = el.hasAttribute('data-intro');
    const t = blockTween(el, isIntro);
    if (isIntro) intro.add(() => t.play(), 0);
  });
  root.querySelectorAll('[data-parallax]').forEach(el => {
    const amount = parseFloat(el.dataset.parallax || '0.15');
    gsap.fromTo(
      el,
      { yPercent: -amount * 100 },
      {
        yPercent: amount * 100,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
  });
  return intro;
}
