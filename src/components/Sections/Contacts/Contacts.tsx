import { Trans, useTranslation } from 'react-i18next';
import { useRegisterSection } from '@/hooks';
import { contacts } from '@/constants';
import { ContactsForm } from '@/components/Common';
import { GitHubSvg, InstagramSvg, TelegramSvg } from '@/components/Icons';
import type { SectionProps } from '@/typescript';
import './Contacts.scss';

export const Contacts = ({ id }: SectionProps) => {
  const sectionRef = useRegisterSection(id);
  const { t } = useTranslation('contacts-form');

  return (
    <section className="contacts" id={id} ref={sectionRef}>
      <div className="container">
        <div className="contacts__inner">
          <div className="contacts__content">
            <div className="contacts__header">
              <h2 className="contacts__title ">
                <Trans
                  i18nKey="contacts.title"
                  ns="contacts-form"
                  components={{ span: <span /> }}
                />
              </h2>
              <p className="contacts__text">{t('contacts.text')}</p>
              <a className="contacts__email" href={`mailto:${contacts.email}`}>
                {contacts.email}
              </a>
            </div>
            <div className="contacts__socials-wrapper">
              <h3 className="contacts__sub-title">{t('contacts.socials')}</h3>
              <ul className="contacts__socials socials">
                <li className="socials__item">
                  <a
                    href={contacts.telegram}
                    className="socials__link"
                    target="_blank"
                    title="Telegram">
                    <TelegramSvg />
                  </a>
                </li>
                <li className="socials__item">
                  <a
                    href={contacts.github}
                    className="socials__link"
                    target="_blank"
                    title="GitHub">
                    <GitHubSvg />
                  </a>
                </li>
                <li className="socials__item">
                  <a
                    href={contacts.instagram}
                    className="socials__link"
                    target="_blank"
                    title="Instagram">
                    <InstagramSvg />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="contacts__form-wrapper">
            <ContactsForm className="contacts__form" />
          </div>
        </div>
      </div>
    </section>
  );
};
