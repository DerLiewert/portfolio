export const supportedLanguages = ['en', 'uk', 'ru'] as const;
export type Language = (typeof supportedLanguages)[number];

export const defaultLang: Language = 'en';
