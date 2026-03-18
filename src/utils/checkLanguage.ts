import { defaultLang, supportedLanguages, type Language } from '@/typescript';

export const isSupportedLang = (lng: string): lng is Language => {
  return supportedLanguages.includes(lng as Language);
};

export const currentOrDefaultLang = (lng?: string): Language => {
  return lng && isSupportedLang(lng) ? lng : defaultLang;
};
