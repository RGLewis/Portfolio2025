import type { ContentfulPageTypes } from "./loaders/types";

export const NAVIGATION_DATA_TEST_IDS = {
  sidebar: "sidebar",
  mobileHeader: "mobile-header",
  hamburgerButton: "hamburger-button",
  mobileMenu: "mobile-menu",
  mobileNav: "mobile-nav",
  nav: "nav",
  navLink: (text: string) => `nav-link-${text}`,
  expandCollapseButton: "expand-collapse-button",
  subLinksContainer: "sub-links-container",
  experienceLink: (text: string) => `experience-link-${text}`,
  footer: "footer",
  footerCopy: "footer-copy",
  footerLinks: "footer-links",
  footerLink: (text: string) => `footer-link-${text}`,
};

export const LAYOUT_DATA_TEST_IDS = {
  rootLayout: "root-layout",
  mainContent: "main-content",
};

export const HOME_PAGE_DATA_TEST_IDS = {
  pageContainer: "home-page-container",
  profileImage: "profile-image",
};

export const EXPERIENCE_PAGE_DATA_TEST_IDS = {
  pageContainer: "experience-page-container",
};

export const ACCORDION_DATA_TEST_IDS = {
  accordionHeadingContainer: (itemId: string) =>
    `accordion-heading-container-${itemId}`,
  accordionButton: (itemId: string) => `accordion-button-${itemId}`,
  accordionContent: (itemId: string) => `accordion-content-${itemId}`,
};

export const SKILLS_ITEM_DATA_TEST_IDS = {
  skillsItem: (title: string) => `skills-item-${title}`,
  skillsLevel: (title: string) => `skills-level-${title}`,
};

export const HERO_IMAGE_DATA_TEST_IDS = {
  heroImage: "hero-image",
};

export const RICH_TEXT_DATA_TEST_IDS = {
  richTextSection: (title: string) => `rich-text-section-${title}`,
};

export const SNACKBAR_DATA_TEST_IDS = {
  errorSnackbarContainer: (page: ContentfulPageTypes) =>
    `error-snackbar-container-${page}`,
};

export const SKELETON_LOADER_DATA_TEST_IDS = {
  container: "skeleton-loader",
  block: (index: number) => `skeleton-block-${index}`,
  subheading: (index: number) => `skeleton-subheading-${index}`,
  line: (blockIndex: number, lineIndex: number) =>
    `skeleton-line-${blockIndex}-${lineIndex}`,
};
