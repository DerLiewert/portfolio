import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { breakpoints, contacts, sectionsId } from '@/constants';
import { toggleMenu } from '@/utils';
import { LogoSvg, BurgerBtn, ThemeToggle, HeaderLink, GitHubSvg } from '@/components';
import { supportedLanguages, type Language } from '@/typescript';
import clsx from 'clsx';
import './Header.scss';

export const Header = () => {
  const refHeader = useRef<HTMLElement>(null);
  const location = useLocation();
  const { t, i18n } = useTranslation('nav');
  const activeLang = i18n.resolvedLanguage;
  const [scrolled, setScrolled] = useState(false);

  const onChangeLange = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  useLayoutEffect(() => {
    const header = refHeader.current;
    if (!header) return;

    const resizeHeaderObserver = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    });

    resizeHeaderObserver.observe(header);

    return () => resizeHeaderObserver.disconnect();
  }, []);

  useEffect(() => {
    const updateHeaderScroll = () => {
      setScrolled((prev) => {
        const next = window.scrollY > 0;
        return prev === next ? prev : next;
      });
    };

    updateHeaderScroll();
    window.addEventListener('scroll', updateHeaderScroll);

    return () => {
      window.removeEventListener('scroll', updateHeaderScroll);
    };
  }, []);

  return (
    <header
      ref={refHeader}
      className={clsx('header', {
        _absolute: location.pathname === '/',
        '_header-scroll': scrolled,
      })}>
      <div className="container">
        <div className="header__inner">
          <Link to="/" className="header__logo" state={{ scrollTo: sectionsId.intro }}>
            <LogoSvg />
          </Link>

          <div className="header__menu header-menu">
            <nav className="header-menu__body">
              <ul className="header-menu__list">
                <li className="header-menu__item">
                  <HeaderLink id={sectionsId.intro} text={t('intro')} />
                </li>
                <li className="header-menu__item">
                  <HeaderLink id={sectionsId.about} text={t('about')} />
                </li>
                <li className="header-menu__item">
                  <HeaderLink id={sectionsId.projects} text={t('projects')} />
                </li>
                <li className="header-menu__item">
                  <HeaderLink id={sectionsId.contacts} text={t('contacts')} />
                </li>
              </ul>
            </nav>
          </div>

          <div className="header__actions">
            <div className="header__lang">
              {supportedLanguages.map((lang) => (
                <button
                  className={`header__lang-item ${activeLang === lang ? '_active' : ''}`}
                  onClick={() => onChangeLange(lang)}
                  key={lang}>
                  {lang}
                </button>
              ))}
            </div>
            <ThemeToggle className="header__theme" />
            <a href={contacts.github} className="header__github" target="_blank" title="GitHub">
              <GitHubSvg />
            </a>
            <BurgerBtn
              className="header__burger"
              onClick={toggleMenu}
              showOn={['max', breakpoints.tablet]}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
