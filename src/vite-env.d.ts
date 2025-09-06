/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_CONTENTFUL_SPACE_ID: string;
  readonly VITE_CONTENTFUL_ACCESS_TOKEN: string;
  readonly VITE_CONTENTFUL_NAVIGATION_ID: string;
  readonly VITE_CONTENTFUL_FOOTER_ID: string;
  readonly VITE_CONTENTFUL_HOME_PAGE_ID: string;
  readonly VITE_CONTENTFUL_ABOUT_PAGE_ID: string;
  readonly VITE_CONTENTFUL_EXPERIENCE_PAGE_ID: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
