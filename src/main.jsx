import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { fetchProjects } from './data/projects';
import { addLoaderTask } from './engine';
import { normalize } from './router';
import './styles/tokens.css';
import './styles/engine.css';
import './styles/site.css';

// The first request to portfolio-api is part of the loader's real progress.
const live = fetchProjects();
addLoaderTask(live);

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App
      initialPath={normalize(location.pathname)}
      live={live}
    />
  </StrictMode>
);

if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
