import { Theme } from "@/typescript";

export const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem('theme');

  if (saved === Theme.Light || saved === Theme.Dark) {
    return saved;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return Theme.Dark;
  }

  return Theme.Light;
};
