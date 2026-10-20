import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useData } from '../data/context';
import { joinStacks } from '../data/projects';
import { ease, prefersReducedMotion } from '../engine';
import { usePage } from '../router';
import { flow } from '../motion/flow';

const mean = a => a.reduce((s, v) => s + v, 0) / a.length;

// Order both columns by the mean position of their partners (one barycenter pass each way):
// fewer crossings, so the diagram reads like a schema someone laid out by hand.
function layout(projects) {
  const used = joinStacks(projects);
  const sIndex = new Map(used.map((s, i) => [s.name, i]));
  const ps = [...projects].sort(
    (a, b) =>
      mean(a.stacks.map(s => sIndex.get(s))) -
      mean(b.stacks.map(s => sIndex.get(s)))
  );
  const pIndex = new Map(ps.map((p, i) => [p.slug, i]));
  const ss = [...used].sort(
    (a, b) =>
      mean(a.slugs.map(x => pIndex.get(x))) -
      mean(b.slugs.map(x => pIndex.get(x)))
  );
  return { stacks: ss, projects: ps };
}

const curve = (x1, y1, x2, y2) => {
  const m = (x1 + x2) / 2;
  return `M${x1} ${y1} C${m} ${y1} ${m} ${y2} ${x2} ${y2}`;
};
// Crow's foot ("many") opening toward the node edge at x; dir = +1 points right.
const foot = (x, y, dir) =>
  `M${x - 10 * dir} ${y} L${x} ${y - 6} M${x - 10 * dir} ${y} L${x} ${y} M${x - 10 * dir} ${y} L${x} ${y + 6}`;

const Relations = () => {
  const { projects } = useData();
  const { stacks, projects: ps } = useMemo(() => layout(projects), [projects]);
  const edges = useMemo(
    () => stacks.flatMap(s => s.slugs.map(p => ({ s: s.name, p }))),
    [stacks]
  );
  // Opens on the newest project, so the diagram reads before anyone touches it.
  const [sel, setSel] = useState(() => ({ kind: 'p', key: projects[0]?.slug }));
  const [hover, setHover] = useState(null);
  const [geom, setGeom] = useState(null);
  const wrap = useRef(null);
  const svg = useRef(null);
  const active = hover ?? sel;

  const on = e =>
    active && (active.kind === 's' ? e.s === active.key : e.p === active.key);
  const lit = new Set(
    active ? [`${active.kind}:${active.key}`, ...edges.filter(on).flatMap(e => [`s:${e.s}`, `p:${e.p}`])] : []
  );

  useLayoutEffect(() => {
    const el = wrap.current;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const ys = {};
      let x1 = 0;
      let x2 = box.width;
      el.querySelectorAll('[data-node]').forEach(n => {
        const r = n.getBoundingClientRect();
        const [kind] = n.dataset.node.split(':');
        ys[n.dataset.node] = r.top - box.top + r.height / 2;
        if (kind === 's') x1 = Math.max(x1, r.right - box.left);
        else x2 = Math.min(x2, r.left - box.left);
      });
      setGeom({ w: box.width, h: box.height, x1: x1 + 10, x2: x2 - 10, ys });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [stacks, ps]);

  // Lines draw in once the diagram enters; then data keeps flowing along them while the section is on screen.
  usePage(() => {
    const el = svg.current;
    if (!el || prefersReducedMotion()) return;
    gsap.fromTo(
      el,
      { clipPath: 'inset(0% 100% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4,
        ease: ease.inOut,
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top 75%',
          once: true
        }
      }
    );
    return flow(el, wrap.current);
  });

  const nodeProps = (kind, key) => {
    const id = `${kind}:${key}`;
    const pressed = sel?.kind === kind && sel.key === key;
    return {
      type: 'button',
      'data-node': id,
      'aria-pressed': pressed,
      className: `node${lit.has(id) ? ' is-lit' : ''}${active && !lit.has(id) ? ' is-dim' : ''}`,
      onClick: () => setSel(pressed ? null : { kind, key }),
      onPointerEnter: e => e.pointerType === 'mouse' && setHover({ kind, key }),
      onPointerLeave: () => setHover(null),
      onFocus: () => setHover({ kind, key }),
      onBlur: () => setHover(null)
    };
  };

  const rows = active ? edges.filter(on).length : edges.length;
  const query = !active
    ? 'SELECT COUNT(*) FROM project_stack'
    : active.kind === 's'
      ? `SELECT project FROM project_stack WHERE stack = '${active.key}'`
      : `SELECT stack FROM project_stack WHERE project = '${active.key}'`;

  return (
    <section
      id='schema'
      className='schema'
      aria-labelledby='schema-title'
    >
      <header className='section-head grid'>
        <h2
          id='schema-title'
          className='section-title'
          data-split='lines'
        >
          Stack, joined to work
        </h2>
        <p className='section-query notation'>
          <span>{'project }o──o{ stack'}</span>
        </p>
        <p className='schema__lede'>
          Each line is one row of the join table, drawn from the same API data
          as the list above. Pick a stack or a project to follow its relations.
        </p>
      </header>

      <div
        className='join'
        ref={wrap}
      >
        <ul
          className='join__col join__col--stacks'
          aria-label='Stacks'
        >
          {stacks.map(s => (
            <li key={s.name}>
              <button {...nodeProps('s', s.name)}>
                <span className='node__name'>{s.name}</span>
                <span className='node__count notation'>{s.slugs.length}</span>
              </button>
            </li>
          ))}
        </ul>
        <svg
          className='join__lines'
          ref={svg}
          width={geom?.w}
          height={geom?.h}
          aria-hidden='true'
        >
          {geom &&
            edges.map(e => {
              const y1 = geom.ys[`s:${e.s}`];
              const y2 = geom.ys[`p:${e.p}`];
              if (y1 === undefined || y2 === undefined) return null;
              return (
                <path
                  key={`${e.s}|${e.p}`}
                  className={`edge${on(e) ? ' is-on' : ''}${active && !on(e) ? ' is-off' : ''}`}
                  d={curve(geom.x1, y1, geom.x2, y2)}
                />
              );
            })}
          {geom &&
            stacks.map(s => (
              <path
                key={s.name}
                className={`feet${lit.has(`s:${s.name}`) ? ' is-on' : ''}`}
                d={foot(geom.x1, geom.ys[`s:${s.name}`], -1)}
              />
            ))}
          {geom &&
            ps.map(p => (
              <path
                key={p.slug}
                className={`feet${lit.has(`p:${p.slug}`) ? ' is-on' : ''}`}
                d={foot(geom.x2, geom.ys[`p:${p.slug}`], 1)}
              />
            ))}
        </svg>
        <ul
          className='join__col join__col--projects'
          aria-label='Projects'
        >
          {ps.map(p => (
            <li key={p.slug}>
              <button {...nodeProps('p', p.slug)}>
                <span className='node__name'>{p.name}</span>
                <span className='node__count notation'>{p.stacks.length}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p
        className='join__result notation'
        aria-live='polite'
      >
        <span className='join__query'>{query}</span>
        <span className='join__rows'>
          {rows} {rows === 1 ? 'row' : 'rows'}
        </span>
        {sel?.kind === 'p' && (
          <a
            className='link join__open'
            href={`/work/${sel.key}`}
          >
            Open {sel.key}
          </a>
        )}
      </p>
    </section>
  );
};

export default Relations;
