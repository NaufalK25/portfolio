// The idle state: data dashes run along relation lines while their section is on screen.
// One clock (gsap.ticker), paused off screen, off under reduced motion. Call inside usePage.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../engine';

export function flow(el, trigger, speed = 14) {
  if (!el || prefersReducedMotion()) return;
  const tick = t => el.style.setProperty('--flow', `${(-t * speed).toFixed(1)}px`);
  const st = ScrollTrigger.create({
    trigger,
    onToggle: s => (s.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick))
  });
  return () => {
    gsap.ticker.remove(tick);
    st.kill();
  };
}
