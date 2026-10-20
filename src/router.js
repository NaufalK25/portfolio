// A pushState router wired to the engine: leave → cleanup → swap → enter.
// Internal <a> clicks are intercepted; external, _blank, mailto, download and
// data-no-transition links pass through.
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { boot, cleanup, enter, leave, onPage, scrollToTarget } from './engine';

export const normalize = p => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';

let path = typeof location === 'undefined' ? null : normalize(location.pathname);
let mode = 'idle'; // idle | push | pop
let hash = null;
const subs = new Set();
const emit = () => subs.forEach(f => f());
const subscribe = f => (subs.add(f), () => subs.delete(f));

export function usePath(initial) {
  return useSyncExternalStore(subscribe, () => path ?? initial, () => initial);
}

export async function navigate(url) {
  const target = normalize(url.pathname);
  if (target === path) {
    if (url.hash) scrollToTarget(url.hash);
    return;
  }
  if (mode !== 'idle') return;
  mode = 'push';
  await leave({ path: target });
  cleanup();
  history.pushState(null, '', target + url.search + url.hash);
  hash = url.hash || null;
  path = target;
  emit();
}

/** Mount once at the end of <App>: boots the engine, intercepts links, runs enter() per route. */
export function useEngine(currentPath, setup) {
  const first = useRef(true);

  useEffect(() => {
    boot(setup);
    const onClick = e => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href]');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download') || a.hasAttribute('data-no-transition'))
        return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      e.preventDefault();
      navigate(url);
    };
    const onPop = () => {
      cleanup();
      mode = 'pop';
      path = normalize(location.pathname);
      emit();
    };
    document.addEventListener('click', onClick);
    addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('click', onClick);
      removeEventListener('popstate', onPop);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const pop = mode === 'pop';
    const h = hash;
    mode = 'idle';
    hash = null;
    enter({ transition: !pop, scrollTop: !pop, hash: h }).then(() => {
      document.getElementById('main')?.focus({ preventScroll: true });
    });
  }, [currentPath]);
}

/** Component-level page code: runs when the page is ready, reverted on navigation. */
export function usePage(fn) {
  useEffect(() => onPage(fn), []); // eslint-disable-line react-hooks/exhaustive-deps
}
