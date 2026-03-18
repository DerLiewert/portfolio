import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

type Section = {
  id: string;
  el: HTMLElement;
};

type ContextType = {
  activeId: string | null;
  register: (id: string, el: HTMLElement) => void;
  unRegister: (id: string) => void;
};

const ScrollSpyContext = createContext<ContextType | null>(null);

export const ScrollSpyProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const sections = useRef<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    setActiveId(null);
    if (!sections.current.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => {
            return entry.isIntersecting;
          })
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        } else {
          const activeEntry = entries.find((entry) => entry.target.id === activeIdRef.current);

          if (activeEntry && activeEntry.boundingClientRect.top < window.innerHeight / 2) {
            return;
          } else if (entries.length > 0) {
            const active = entries
              .filter((entry) => {
                entry.boundingClientRect.y < window.innerHeight / 2;
              })
              .sort((a, b) => b.boundingClientRect.y - a.boundingClientRect.y);
            if (active[0]) setActiveId(active[0].target.id);
          } else {
            setActiveId(null);
          }
        }
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: [0, 1],
      },
    );

    sections.current.forEach((s) => observer.observe(s.el));

    return () => observer.disconnect();
  }, [location.pathname]);

  const register = (id: string, el: HTMLElement) => {
    sections.current.push({ id, el });
  };
  const unRegister = (id: string) => {
    sections.current = sections.current.filter((obj) => obj.id !== id);
  };

  return (
    <ScrollSpyContext.Provider value={{ activeId, register, unRegister }}>
      {children}
    </ScrollSpyContext.Provider>
  );
};

export const useScrollSpy = () => {
  const ctx = useContext(ScrollSpyContext);
  if (!ctx) throw new Error('useScrollSpy must be inside provider');
  return ctx;
};
