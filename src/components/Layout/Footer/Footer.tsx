import { Link } from 'react-router';
import { Trans, useTranslation } from 'react-i18next';
import { contacts, sectionsId } from '@/constants';
import { LogoSvg } from '@/components/Icons';
import './Footer.scss';

export const Footer = () => {
  const { t } = useTranslation(['footer', 'nav']);
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__content">
          <div className="footer__col footer__about">
            <Link to="/" className="footer__logo" state={{ scrollTo: sectionsId.intro }}>
              <LogoSvg />
            </Link>
            <div className="footer__about-content">
              <div className="footer__text">
                <p>
                  <Trans i18nKey={'text.0'} ns={'footer'} components={{ span: <span /> }} />
                </p>
                <p>
                  <Trans i18nKey={'text.1'} ns={'footer'} components={{ span: <span /> }} />
                </p>
              </div>
              <p className="footer__status">🟢 {t('status')}</p>
            </div>
          </div>

          <nav className="footer__col footer__nav">
            <h4 className="footer__title">{t('footer:navigation')}</h4>
            <ul className="footer__nav-list">
              <li className="footer__nav-item">
                <Link className="footer__link" to="/" state={{ scrollTo: sectionsId.projects }}>
                  {t('nav:projects')}
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link className="footer__link" to="/" state={{ scrollTo: sectionsId.about }}>
                  {t('nav:about')}
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link className="footer__link" to="/" state={{ scrollTo: sectionsId.contacts }}>
                  {t('nav:contacts')}
                </Link>
              </li>
              <li className="footer__nav-item">
                <a className="footer__link" href={contacts.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

          <div className="footer__col footer__contacts">
            <h4 className="footer__title">{t('footer:contacts')}</h4>
            <ul className="footer__nav-list">
              <li className="footer__nav-item">
                <a
                  className="footer__link footer__link--underline"
                  href={`mailto:${contacts.email}`}>
                  {contacts.email}
                </a>
              </li>
              <li className="footer__nav-item">
                <a
                  className="footer__link"
                  href={contacts.telegram}
                  target="_blank"
                  rel="noreferrer">
                  Telegram
                </a>
              </li>
              <li className="footer__nav-item">
                <a className="footer__link" href={contacts.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>{t('footer:copy')}</p>
          <p>
            © {new Date().getFullYear()}{' '}
            <a href={contacts.github} target="_blank" rel="noreferrer">
              DerLiewert
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
