import type { RichTextDocument } from "./rich-text";

export enum ComponentType {
  RICH_TEXT = "richText",
  WORK_ACCORDION = "workAccordion",
  SKILLS = "skills",
}

// Common types
type ContentfulSys = {
  id: string;
};

type ContentfulCollection<T> = {
  items: T[];
};

type RichTextContent = {
  json: RichTextDocument;
};

// Page Component Types
type RichTextComponent = {
  type: ComponentType.RICH_TEXT;
  title: string;
  content: RichTextContent;
};

type WorkAccordionItem = {
  sys: ContentfulSys;
  jobTitle: string;
  workplace: string;
  accordionContent: RichTextContent;
};

type WorkAccordionComponent = {
  type: ComponentType.WORK_ACCORDION;
  title: string;
  accordionItemsCollection: ContentfulCollection<WorkAccordionItem>;
};

type SkillsItem = {
  title: string;
  level: string;
};

type SkillsComponent = {
  type: ComponentType.SKILLS;
  title: string;
  skillsItemCollection: ContentfulCollection<SkillsItem>;
};

export type PageComponent =
  | RichTextComponent
  | WorkAccordionComponent
  | SkillsComponent;

type ContentfulImage = {
  description: string;
  url: string;
};

export type PageData = {
  page: {
    title: string;
    image: ContentfulImage;
    componentsCollection: ContentfulCollection<PageComponent>;
  };
};

// Static content types
export enum PageMappings {
  HOME = "Home",
  ABOUT = "About",
  EXPERIENCE = "Experience",
  PROFILE = "Profile",
  WORK = "Work",
  SKILLS = "Skills",
  EDUCATION = "Education",
}

export type HomePageContent = {
  name: string;
  tagline: string;
  image: string;
  alt: string;
};

type BaseNavItem = {
  text: PageMappings;
  icon?: string;
};

export type RouteNavItem = BaseNavItem & {
  link: string;
  slug?: never;
};

export type HashNavItem = BaseNavItem & {
  link: string;
  slug: string;
};

export type NavItem = RouteNavItem | HashNavItem;

export type NavContent = {
  [K in PageMappings]: NavItem;
};

type FooterItem = {
  text: string;
  link: string;
};

export type FooterContent = FooterItem[];
