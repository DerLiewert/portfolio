import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getInitialTheme } from '@/utils';
import { Theme } from '@/typescript';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const applyWithTransition = (fc: () => void) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    document.documentElement.classList.add('theme-transition');
    fc();

    timeoutRef.current = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 200);
  };

  const setTheme = (value: Theme) => {
    applyWithTransition(() => {
      setThemeState(value);
    });
  };

  const toggleTheme = () => {
    applyWithTransition(() => {
      setThemeState((prev) => (prev === Theme.Light ? Theme.Dark : Theme.Light));
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (theme === Theme.Dark) {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.dataset.theme = theme;
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return ctx;
};
