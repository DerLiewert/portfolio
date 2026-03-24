import { Link } from 'react-router';
import { Trans, useTranslation } from 'react-i18next';
import { useRegisterSection } from '@/hooks';
import { sectionsId } from '@/constants';
import type { SectionProps } from '@/typescript';
import CVFile from '@/CV_Mandryk_Vladyslav_Front-end_developer.pdf';
import meImg from '@/assets/me.jpg';
import './Intro.scss';

export const Intro = ({ id }: SectionProps) => {
  const { t } = useTranslation('main');
  const sectionRef = useRegisterSection(id);

  return (
    <section className="intro decor" id={id} ref={sectionRef}>
      <div className="container intro__container">
        <div className="intro__body">
          <div className="intro__content">
            <h1 className="intro__title">
              Front-end
              <br />
              Developer
            </h1>
            <div className="intro__description">
              <p className="intro__text">
                <Trans i18nKey="hero.description" ns={'main'} components={{ span: <span /> }} />
              </p>
              <p className="intro__stack">
                {t('hero.stack', { returnObjects: true }).map((stack) => (
                  <span key={stack}>{stack}</span>
                ))}
              </p>
            </div>
            <div className="intro__buttons">
              <a
                href={CVFile}
                download="CV_Mandryk_Vladyslav_Front-end_developer"
                className="intro__button btn _primary">
                {t('hero.downloadCV')}
              </a>
              <Link className="intro__button btn" to="/" state={{ scrollTo: sectionsId.contacts }}>
                {t('hero.contacts')}
              </Link>
            </div>
          </div>
          <div className="intro__image-block">
            <p className="intro__nickname">DerLiewert</p>
            <div className="intro__image">
              <img src={meImg} alt="DerLiewert" aria-hidden="true" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
