import Resources from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: 'main';
    resources: Resources;
  }
}

// npm i i18next-resources-for-ts