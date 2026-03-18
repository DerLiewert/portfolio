import { Link } from 'react-router';
import { useScrollSpy } from '@/providers';
import { closeMenu } from '@/utils';
import type { sectionsId } from '@/constants';
import clsx from 'clsx';

type HeaderLink = {
  id: keyof typeof sectionsId;
  text: string;
};

export const HeaderLink = ({ id, text }: HeaderLink) => {
  const { activeId } = useScrollSpy();
  return (
    <Link
      to="/"
      className={clsx('header-menu__link', {
        _active: activeId === id,
      })}
      state={{ scrollTo: id }}
      onClick={closeMenu}>
      {text}
    </Link>
  );
};
