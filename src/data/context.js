import { createContext, useContext } from 'react';
import { initialProjects } from './projects';

export const Data = createContext({ projects: initialProjects, ms: null, status: 'snapshot' });
export const useData = () => useContext(Data);
