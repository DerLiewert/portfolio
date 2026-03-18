import { useTheme } from '@/providers';
import { MoonSvg, SunSvg } from '@/components/Icons';
import clsx from 'clsx';
import './ThemeToggle.scss';

interface ThemeToggle {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggle) => {
  const { toggleTheme } = useTheme();

  return (
    <button className={clsx('theme', className)} onClick={toggleTheme}>
      <span className="theme__icon theme__icon--light">
        <SunSvg />
      </span>
      <span className="theme__icon theme__icon--dark">
        <MoonSvg />
      </span>
    </button>
  );
};
