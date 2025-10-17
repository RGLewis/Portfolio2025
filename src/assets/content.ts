import {
  FooterLinksMappings,
  PageMappings,
  type HomePageContent,
  type InnerPageContent,
  type NavContent,
} from "@/types/content-types";
import aboutImage from "./about.jpeg";
import experienceImage from "./experience.JPG";
import homeImage from "./home.JPG";

export const HOME_PAGE_CONTENT: HomePageContent = {
  name: "Rafaela Lewis Ghildyal",
  tagline: "Front-End Developer",
  image: homeImage,
  alt: "A headshot of Rafaela Lewis Ghildyal, wearing a blue cardigan with white polka dots.",
};

export const ABOUT_PAGE_CONTENT: InnerPageContent = {
  title: "About",
  image: {
    src: aboutImage,
    alt: "Rafaela's Potcake puppy, Molly, posing in front of a black iron gate. Molly is a white dog with black markings, wearing a red patterned collar, blue and black harness and blue and black leash.",
  },
};

export const EXPERIENCE_PAGE_CONTENT: InnerPageContent = {
  title: "Experience",
  image: {
    src: experienceImage,
    alt: "A black keyboard illuminated by a purple light",
  },
};

export const NAV_CONTENT: NavContent = [
  {
    text: PageMappings.HOME,
    link: "/",
    icon: "HouseIcon",
  },
  {
    text: PageMappings.ABOUT,
    link: `/${PageMappings.ABOUT.toLowerCase()}`,
    icon: "HandWavingIcon",
  },
  {
    text: PageMappings.PROFILE,
    link: `/${PageMappings.EXPERIENCE.toLowerCase()}`,
    slug: PageMappings.PROFILE.toLowerCase(),
  },
  {
    text: PageMappings.EXPERIENCE,
    link: `/${PageMappings.EXPERIENCE.toLowerCase()}`,
    icon: "LightbulbIcon",
  },
  {
    text: PageMappings.WORK,
    link: `/${PageMappings.EXPERIENCE.toLowerCase()}`,
    slug: PageMappings.WORK.toLowerCase(),
  },
  {
    text: PageMappings.SKILLS,
    link: `/${PageMappings.EXPERIENCE.toLowerCase()}`,
    slug: PageMappings.SKILLS.toLowerCase(),
  },
  {
    text: PageMappings.EDUCATION,
    link: `/${PageMappings.EXPERIENCE.toLowerCase()}`,
    slug: PageMappings.EDUCATION.toLowerCase(),
  },
];

export const FOOTER_CONTENT = {
  links: {
    [FooterLinksMappings.EMAIL]: {
      text: FooterLinksMappings.EMAIL,
      link: "mailto:rafaela.codes@gmail.com",
    },
    [FooterLinksMappings.GITHUB]: {
      text: FooterLinksMappings.GITHUB,
      link: "https://github.com/RGLewis",
    },
    [FooterLinksMappings.LINKEDIN]: {
      text: FooterLinksMappings.LINKEDIN,
      link: "https://www.linkedin.com/in/rafaela-lewis/",
    },
  },
  techStack:
    "Made with React, TypeScript, Jest, Styled Components, Contentful & GraphQL",
  copyright: "© Rafaela Lewis Ghildyal 2025",
};
