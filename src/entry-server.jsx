import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { initialProjects, pageMeta } from './data/projects';
import { site } from './data/site';

export { site };
export const projects = initialProjects;

export function render(path) {
  return { html: renderToString(<App initialPath={path} />), meta: pageMeta(path, initialProjects) };
}
