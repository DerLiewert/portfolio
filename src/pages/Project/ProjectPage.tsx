import { useLocation } from 'react-router';
import { useMatchMedia } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade } from 'swiper/modules';
import { useData, useTheme } from '@/providers';
import { currentOrDefaultLang } from '@/utils';
import { Arrow, GitHubSvg, ViewSvg } from '@/components';
import type { Swiper as ISwiper } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import 'swiper/scss/effect-fade';

import './ProjectPage.scss';
import { useState } from 'react';

function Project() {
  const { theme } = useTheme();
  const { projects, technologies } = useData();
  const { t, i18n } = useTranslation('project');
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set()); // Из-за EffectFade изображения на всех слайдах сразу подгружаются. Фикс, типа lazy-loading
  const isMobile = useMatchMedia('max', 600);

  const location = useLocation();
  const slug = location.pathname
    .replace('/project', '')
    .split('/')
    .filter(Boolean)
    .map(decodeURIComponent)[0];

  const proj = projects.find((proj) => proj.id === slug);
  if (!proj) return null;

  const projI18n = proj.i18n[currentOrDefaultLang(i18n.resolvedLanguage)];

  const onSlideChange = (index: number) => {
    const total = proj.images.length;
    if (total === loadedSlides.size) return;

    const prev = (index - 1 + total) % total;
    const next = (index + 1) % total;

    setLoadedSlides((prevState) => {
      if (prevState.has(index) && prevState.has(prev) && prevState.has(next)) return prevState;
      return new Set([...prevState, index, prev, next]);
    });
  };

  return (
    <div className="project">
      {/* === proj-header === */}
      <div className="project__header proj-header">
        <div className="container">
          <div className="proj-header__body">
            <p className="proj-header__sub-title">{projI18n.type}</p>
            <h2 className="proj-header__title">{projI18n.title}</h2>
          </div>
        </div>
      </div>

      {/* === proj-preview === */}
      <div className="project__preview proj-preview">
        <div className="container">
          {/* === image slider === */}
          <Swiper
            className="proj-preview__slider"
            modules={[Pagination, Navigation, EffectFade]}
            spaceBetween={50}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            pagination={{ type: 'fraction' }}
            navigation={{
              prevEl: '.proj-preview__button--prev',
              nextEl: '.proj-preview__button--next',
            }}
            loop={true}
            onRealIndexChange={(swiper: ISwiper) => onSlideChange(swiper.realIndex)}
            onInit={(swiper: ISwiper) => onSlideChange(swiper.realIndex)}>
            {proj.images.map((img, i) => (
              <SwiperSlide className="proj-preview__slide" key={img.pc}>
                {loadedSlides.has(i) && (
                  <img
                    src={isMobile ? (img.mobile ? img.mobile : img.pc) : img.pc}
                    alt={`Project Image #${i + 1}`}
                  />
                )}
              </SwiperSlide>
            ))}
            <button
              type="button"
              className="proj-preview__button proj-preview__button--prev"
              aria-label="Prev slides">
              <Arrow />
            </button>
            <button
              type="button"
              className="proj-preview__button proj-preview__button--next"
              aria-label="Next slides">
              <Arrow />
            </button>
          </Swiper>

          {/* === proj-preview__info === */}
          <div className="proj-preview__info">
            <div className="proj-preview__tech proj-preview-tech">
              <p className="proj-preview-tech__text">{t('techStacks')}:</p>
              <ul className="proj-preview-tech__list">
                {proj.techStack.map((str) => {
                  const tech = technologies[str];
                  if (!tech) return null;
                  return (
                    <li className="proj-preview-tech__item" key={tech.id}>
                      <img
                        src={tech.icon.theme ? tech.icon.theme[theme] : tech.icon.default}
                        alt={tech.title}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* === proj-preview__links === */}
            <div className="proj-preview__links">
              <p className="proj-preview__link-wrapper">
                <a href={proj.links.github} target="_blank" className="proj-preview__link">
                  <GitHubSvg />
                  {t('sourceCode')}
                </a>
              </p>
              {proj.id !== 'personal-portfolio' && (
                <p className="proj-preview__link-wrapper">
                  <a href={proj.links.liveDemo} target="_blank" className="proj-preview__link">
                    <ViewSvg />
                    {t('liveDemo')}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* === proj-info === */}
      <div className="project__info proj-info">
        <div className="container">
          {/* == About == */}
          <div className="proj-info__section">
            <h3 className="proj-info__title">{t('about')}</h3>
            <div className="proj-info__description proj-text">
              {projI18n.description.split('\n').map((str, i) => (
                <p key={`${proj.id} + ${i}`}>{str}</p>
              ))}
            </div>
          </div>

          {/* == Demonstrates == */}
          <div className="proj-info__section">
            <h3 className="proj-info__title">{t('demonstrates')}</h3>
            <ul className="proj-info__list">
              {projI18n.demonstrates.map((str, i) => (
                <li className="proj-info__list-item proj-text" key={`${proj.id} + ${i}`}>
                  🎯{str}
                </li>
              ))}
            </ul>
          </div>

          {/* == Features == */}
          <div className="proj-info__section">
            <h3 className="proj-info__title">{t('features')}</h3>
            <ul className="proj-info__list proj-info__list--features">
              {projI18n.features.map((feature) => (
                <li className="proj-info__list-item proj-text" key={feature.id}>
                  {feature.emoji} {feature.text}
                </li>
              ))}
            </ul>
          </div>

          {/* == Challenges == */}
          <div className="proj-info__section">
            <h3 className="proj-info__title">{t('challenges')}</h3>
            <ul className="proj-info__list">
              {projI18n.challenges.map((str, i) => (
                <li className="proj-info__list-item proj-text" key={`${proj.id} + ${i}`}>
                  🎯{str}
                </li>
              ))}
            </ul>
          </div>

          {/* == Technologies == */}
          <div className="proj-info__section">
            <h3 className="proj-info__title">{t('technologies')}</h3>
            <ul className="proj-info__list">
              {proj.technologies.map((str) => {
                const tech = technologies[str];
                if (!tech) return null;

                return (
                  <li className="proj-info__list-item proj-text" key={tech.id}>
                    <img
                      src={tech.icon.theme ? tech.icon.theme[theme] : tech.icon.default}
                      alt={tech.title}
                      aria-hidden
                    />
                    {tech.title}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* == Links == */}
          <div className="proj-info__section">
            <h3 className="proj-info__title">{t('links')}</h3>
            <div className="proj-info__buttons">
              {proj.id !== 'personal-portfolio' && (
                <a className="proj-info__button btn _primary" href={proj.links.liveDemo}>
                  <ViewSvg /> {t('viewDemo')}
                </a>
              )}
              <a className="proj-info__button btn" href={proj.links.github}>
                <GitHubSvg /> {t('viewCode')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
