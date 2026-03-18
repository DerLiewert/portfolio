import { useEffect } from 'react';
import { useMatchMedia, type MediaQueryParams } from '@/hooks';
import { closeMenu } from '@/utils';
import clsx from 'clsx';
import './BurgerBtn.scss';

interface BurgerBtn {
  onClick: () => void;
  showOn: MediaQueryParams;
  className?: string;
}

export const BurgerBtn = ({ className, onClick, showOn }: BurgerBtn) => {
  const isShow = useMatchMedia(...showOn);

  useEffect(() => {
    if (!isShow) closeMenu();
  }, [isShow]);

  return (
    <button
      type="button"
      className={clsx('burger-icon', className, { _hide: !isShow })}
      onClick={onClick}>
      <span></span>
    </button>
  );
};
