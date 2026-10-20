import snapshot from './repos.json';
import { site } from './site';

// "foo — bar" → "foo. Bar"; strip wrapping quotes. Visible text has no dashes.
const clean = s =>
  (s || '')
    .trim()
    .replace(/^"(.*)"$/, '$1')
    .replace(/\s+[—–]\s+(\w)/g, (_, c) => `. ${c.toUpperCase()}`);

export const toProjects = repos =>
  repos
    .map(r => ({
      slug: r.name,
      name: r.name,
      description: clean(r.description),
      stacks: r.stacks || [],
      created: r.created_at,
      year: new Date(r.created_at).getUTCFullYear(),
      homepage: r.homepage || null,
      repo: r.htmlUrl,
      license: r.licenseName || null,
      licenseUrl: r.licenseUrl || null,
      thumbnail: r.thumbnail || null
    }))
    .sort((a, b) => new Date(b.created) - new Date(a.created));

export const initialProjects = toProjects(snapshot);

/** Cloudinary delivery transform: right size, best format. */
export const img = (url, w) => url?.replace('/upload/', `/upload/f_auto,q_auto,c_limit,w_${w}/`);

export const formatDate = iso =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Every stack used by a project, with the projects that use it. */
export function joinStacks(projects) {
  const map = new Map();
  for (const p of projects) for (const s of p.stacks) map.set(s, [...(map.get(s) || []), p.slug]);
  return [...map]
    .map(([name, slugs]) => ({ name, slugs }))
    .sort((a, b) => b.slugs.length - a.slugs.length || a.name.localeCompare(b.name));
}

/** Projects that share at least one stack with `p`, most shared first. */
export const related = (p, projects) =>
  projects
    .filter(o => o.slug !== p.slug)
    .map(o => ({ ...o, shared: o.stacks.filter(s => p.stacks.includes(s)) }))
    .filter(o => o.shared.length)
    .sort((a, b) => b.shared.length - a.shared.length)
    .slice(0, 4);

/** Title and description per route; shared by the prerender and the client. */
export function pageMeta(path, projects) {
  if (path === '/') return { kind: 'home', title: `${site.name} | ${site.role}`, description: site.description };
  const m = path.match(/^\/work\/([^/]+)$/);
  const p = m && projects.find(x => x.slug === decodeURIComponent(m[1]));
  if (p) {
    const cut = (s, n) => (s.length > n ? `${s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[,.;:(]+$/, '')}…` : s);
    const what = p.description.replace(/\.$/, '');
    return {
      kind: 'project',
      project: p,
      title: `${p.name}, a project by ${site.short}`,
      description: `${cut(what, 105).replace(/([^…])$/, '$1.')} Built with ${p.stacks.join(', ')} in ${p.year}.`
    };
  }
  return {
    kind: '404',
    title: `No such page | ${site.short}`,
    description: `This address doesn’t match any page on ${site.short}’s portfolio. The projects and the schema are one link away.`
  };
}

/** What the loader prints when it exits. */
export const liveStatus = { text: null };

/** Live rows from portfolio-api, with the request time. */
export async function fetchProjects() {
  const t = performance.now();
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/repo`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { data } = await res.json();
    // An empty answer would wipe the snapshot (and turn every case page into the 404): keep the last build.
    if (!data?.length) throw new Error('No rows');
    const ms = Math.round(performance.now() - t);
    liveStatus.text = `${res.status} OK, ${data.length} rows, ${ms} ms`;
    return { projects: toProjects(data), ms };
  } catch (err) {
    liveStatus.text = 'API unreachable, showing the last build';
    throw err;
  }
}
