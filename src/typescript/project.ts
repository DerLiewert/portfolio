import type { Language } from "./language";

export interface Project {
  id: string;
  preview: {
    pc: string;
    mobile: string;
  };
  images: {
    pc: string;
    mobile: string;
  }[];
  links: {
    github: string;
    liveDemo: string;
  };
  i18n: Record<Language, ProjectI18nLangData>;
  techStack: string[];
  technologies: string[];
}

// i18n: {
//   en: ProjectI18nLangData;
//   uk: ProjectI18nLangData;
//   ru: ProjectI18nLangData;
// }

export interface ProjectI18nLangData {
  title: string;
  type: string;
  description: string;
  features: {
    id: number;
    emoji: string;
    text: string;
  }[];
  demonstrates: string[];
  challenges: string[];
}
