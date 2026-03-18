export const supportedLanguages = ['en', 'ru', 'uk'] as const;
export type Language = (typeof supportedLanguages)[number];

export const defaultLang: Language = 'en';
