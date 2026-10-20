import { useEffect, useRef, useState } from 'react';
import { Data } from './data/context';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';
import { initialProjects, pageMeta } from './data/projects';
import { usePath, useEngine } from './router';
import { enter } from './engine';
import { setupMotion } from './motion/setup';

const App = ({ initialPath, live }) => {
  const path = usePath(initialPath);
  const [data, setData] = useState({ projects: initialProjects, ms: null, status: 'snapshot' });
  const meta = pageMeta(path, data.projects);

  useEffect(() => {
    live
      ?.then(({ projects, ms }) => setData({ projects, ms, status: 'live' }))
      .catch(() => setData(d => ({ ...d, status: 'offline' })));
  }, [live]);

  useEffect(() => {
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [meta.title, meta.description]);

  // A project added after the last build lands on the 404 shell, then resolves once live rows arrive.
  const shown = useRef({ path, kind: meta.kind });
  useEffect(() => {
    const prev = shown.current;
    shown.current = { path, kind: meta.kind };
    if (prev.path === path && prev.kind !== meta.kind) enter({ transition: false, scrollTop: false });
  }, [path, meta.kind]);

  useEngine(path, setupMotion);

  return (
    <Data.Provider value={data}>
      <Header path={path} />
      <main
        id='main'
        tabIndex={-1}
      >
        {meta.kind === 'home' ? (
          <Home />
        ) : meta.kind === 'project' ? (
          <Project
            key={meta.project.slug}
            project={meta.project}
          />
        ) : (
          <NotFound path={path} />
        )}
      </main>
      <Footer />
    </Data.Provider>
  );
};

export default App;
