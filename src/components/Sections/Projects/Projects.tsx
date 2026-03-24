import { useRef } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useData } from '@/providers';
import { useRegisterSection } from '@/hooks';
import { currentOrDefaultLang } from '@/utils';
import { CodeSvg, ViewSvg } from '@/components/Icons';
import type { SectionProps } from '@/typescript';
import './Projects.scss';

export const Projects = ({ id }: SectionProps) => {
  const projectsBodyRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRegisterSection(id);

  const { t, i18n } = useTranslation(['main']);
  const { projects, technologies } = useData();

  return (
    <section className="projects" id={id} ref={sectionRef}>
      <div className="container">
        <div className="projects__header">
          <h2 className="projects__title title">{t('projects.title')}</h2>
          <p className="projects__sub-title">{t('projects.text')}</p>
        </div>
        <div className="projects__body" ref={projectsBodyRef}>
          {projects.map((project) => {
            const projI18n = project.i18n[currentOrDefaultLang(i18n.resolvedLanguage)];
            return (
              <div className="projects__item projects-item" key={project.id}>
                <Link to={`/${project.id}`} className="projects-item__card">
                  <img
                    loading="lazy"
                    className="projects-item__image"
                    src={project.preview.pc}
                    alt={projI18n.title}
                    aria-hidden="true"
                  />
                  <div className="projects-item__card-inner">
                    <h3 className="projects-item__title">{projI18n.title}</h3>
                    <p className="projects-item__sub-title">{projI18n.type}</p>
                    <ul className="projects-item__tech-list">
                      {project.techStack.map((str) => {
                        const tech = technologies[str];
                        if (!tech) return;
                        return (
                          <li className="projects-item__tech-item" key={tech.id}>
                            <img src={tech.icon.default} alt={tech.title} title={tech.title} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Link>

                <div className="projects-item__links">
                  <a
                    href={project.links.github}
                    className="projects-item__link projects-item__link--github"
                    target="_blank"
                    title={t('projects.sourceCode')}>
                    <CodeSvg />
                  </a>
                  <a
                    href={project.links.liveDemo}
                    className="projects-item__link projects-item__link--page"
                    target="_blank"
                    title={t('projects.liveDemo')}>
                    <ViewSvg />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
