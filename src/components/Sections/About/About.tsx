import { useTranslation } from 'react-i18next';
import { useRegisterSection } from '@/hooks';
import { technologiesIcons } from '@/constants';
import type { SectionProps } from '@/typescript';
import aboutImg from '@/assets/about.webp';
import './About.scss';

export const About = ({ id }: SectionProps) => {
  const { t } = useTranslation('main');
  const sectionRef = useRegisterSection(id);

  return (
    <section className="about" id={id} ref={sectionRef}>
      <div className="container">
        <div className="about__inner">
          <div className="about__image">
            <img src={aboutImg} alt={t('about.image')} aria-hidden="true" />
          </div>
          <div className="about__content">
            <h2 className="about__title title">{t('about.title')}</h2>
            <div className="about__skills">
              <h3 className="about__skills-title about-title">{t('skills.title')}</h3>
              <ul className="about__skills-list">
                {t('skills.list', { returnObjects: true }).map((skill, i) => (
                  <li key={i}>
                    <p>{skill}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="about__technologies">
              <h3 className="about__technologies-title about-title">{t('technologies')}</h3>
              <ul className="about__technologies-list">
                {technologiesIcons.map((obj) => (
                  <li key={obj.alt}>
                    <img src={obj.src} alt={obj.alt} loading="lazy" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
