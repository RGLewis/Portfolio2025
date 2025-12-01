import type { Document } from "@contentful/rich-text-types";

export enum TypeNames {
  RICH_TEXT = "RichTextWriteUp",
  WORK_ACCORDION = "WorkAccordion",
  SKILLS = "Skills",
}

// Common types
type ContentfulSys = {
  id: string;
};

type ContentfulCollection<T> = {
  items: T[];
};

type RichTextContent = {
  json: Document;
};

// Page Component Types
export type RichTextComponent = {
  __typename: TypeNames.RICH_TEXT;
  title: string;
  content: RichTextContent;
};

export type WorkAccordionItem = {
  sys: ContentfulSys;
  jobTitle: string;
  workplace: string;
  accordionContent: RichTextContent;
};

export type WorkAccordionComponent = {
  __typename: TypeNames.WORK_ACCORDION;
  title: string;
  accordionItemsCollection: ContentfulCollection<WorkAccordionItem>;
};

export enum SkillLevels {
  COMFORTABLE = "Comfortable",
  ADVANCED = "Advanced",
  EXPERT = "Expert",
}

export type SkillsItem = {
  title: string;
  level: SkillLevels;
};

export type SkillsComponent = {
  __typename: TypeNames.SKILLS;
  title: string;
  skillsItemCollection: ContentfulCollection<SkillsItem>;
};

export type PageComponent =
  | RichTextComponent
  | WorkAccordionComponent
  | SkillsComponent;

export type PageData = {
  page: {
    title: string;
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

export enum FooterLinksMappings {
  EMAIL = "Email",
  GITHUB = "GitHub",
  LINKEDIN = "LinkedIn",
}

export type HomePageContent = {
  name: string;
  tagline: string;
  image: string;
  alt: string;
};

export type InnerPageContent = {
  title: string;
  image: {
    src: string;
    alt: string;
  };
};

type BaseNavItem = {
  text: PageMappings;
};

export enum Slugs {
  PROFILE = "profile",
  WORK = "work",
  SKILLS = "skills",
  EDUCATION = "education",
}

export type RouteNavItem = BaseNavItem & {
  link: string;
  slug?: never;
};

export type HashNavItem = BaseNavItem & {
  link: string;
  slug: Slugs;
};

export type NavItem = RouteNavItem | HashNavItem;

export type NavContent = NavItem[];

export type FooterLink = {
  text: FooterLinksMappings;
  link: string;
};

export type FooterContent = {
  links: {
    [K in FooterLinksMappings]: FooterLink;
  };
  techStack: string;
  copyright: string;
};
