// Page transitions. The look is set per project with setTransition() (see src/motion/setup.js).
import { gsap } from 'gsap';
import { prefersReducedMotion } from './env';

let current = {
  leave: c => gsap.timeline().set(c, { autoAlpha: 1 }),
  enter: c => gsap.timeline().set(c, { autoAlpha: 0 })
};

const reduced = {
  leave: c => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.2 }),
  enter: c => gsap.to(c, { autoAlpha: 0, duration: 0.2 })
};

export const setTransition = t => {
  current = t;
};
const pick = () => (prefersReducedMotion() ? reduced : current);
const curtain = () => document.getElementById('curtain');

export const playLeave = info => Promise.resolve(pick().leave(curtain(), info));
export const playEnter = info => Promise.resolve(pick().enter(curtain(), info));
