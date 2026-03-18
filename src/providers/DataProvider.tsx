import { createContext, useContext, useEffect, useState } from 'react';
import type { Project, Technology } from '@/typescript';

type ContextType = {
  projects: Project[];
  technologies: { [x: string]: Technology };
};

const DataContext = createContext<ContextType | null>(null);

export const DataProvider = ({ children }: { children: any }) => {
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState({});

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch('api/projects.json');

        if (!response.ok) {
          throw new Error(`Projects response status: ${response.status}`);
        }

        const result = await response.json();
        setProjects(result);
      } catch (error) {
        console.log(error);
      }
    };

    const getTechnologies = async () => {
      try {
        const response = await fetch('api/technologies.json');

        if (!response.ok) {
          throw new Error(`Technologies response status: ${response.status}`);
        }

        const result = await response.json();
        setTechnologies(result);
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
    getTechnologies();
  }, []);

  return <DataContext.Provider value={{ projects, technologies }}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be inside provider');
  return ctx;
};
