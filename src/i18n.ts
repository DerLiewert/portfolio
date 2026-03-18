import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { defaultLang, supportedLanguages } from './typescript';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: 'languageOnly',
    fallbackLng: defaultLang,
    supportedLngs: supportedLanguages,

    ns: ['main', 'project', 'nav', 'footer', 'contacts-form'],
    defaultNS: 'main',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
