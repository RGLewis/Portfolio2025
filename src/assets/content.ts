import {
  PageMappings,
  type FooterContent,
  type HomePageContent,
  type NavContent,
} from "../types/content-types";
import homeImage from "./home.JPG";

export const HOME_PAGE_CONTENT: HomePageContent = {
  name: "Rafaela Lewis Ghildyal",
  tagline: "Front-End Developer",
  image: homeImage,
  alt: "A headshot of Rafaela Lewis Ghildyal, wearing a blue cardigan with white polka dots.",
};

export const NAV_CONTENT: NavContent = {
  [PageMappings.HOME]: {
    text: PageMappings.HOME,
    link: "/",
    icon: "HouseIcon",
  },
  [PageMappings.ABOUT]: {
    text: PageMappings.ABOUT,
    link: `/${PageMappings.ABOUT.toLowerCase()}`,
    icon: "HandWavingIcon",
  },
  [PageMappings.EXPERIENCE]: {
    text: PageMappings.EXPERIENCE,
    link: `/${PageMappings.EXPERIENCE.toLowerCase()}`,
    icon: "LightbulbIcon",
  },
  [PageMappings.PROFILE]: {
    text: PageMappings.PROFILE,
    link: `/${PageMappings.EXPERIENCE.toLowerCase()}`,
    slug: PageMappings.PROFILE.toLowerCase(),
  },
  [PageMappings.WORK]: {
    text: PageMappings.WORK,
    link: `/${PageMappings.EXPERIENCE.toLowerCase()}`,
    slug: PageMappings.WORK.toLowerCase(),
  },
  [PageMappings.SKILLS]: {
    text: PageMappings.SKILLS,
    link: `/${PageMappings.EXPERIENCE.toLowerCase()}`,
    slug: PageMappings.SKILLS.toLowerCase(),
  },
  [PageMappings.EDUCATION]: {
    text: PageMappings.EDUCATION,
    link: `/${PageMappings.EXPERIENCE.toLowerCase()}`,
    slug: PageMappings.EDUCATION.toLowerCase(),
  },
};

export const FOOTER_CONTENT: FooterContent = [
  { text: "Email", link: "rafaela.codes@gmail.com" },
  { text: "GitHub", link: "https://github.com/RGLewis" },
  { text: "LinkedIn", link: "https://www.linkedin.com/in/rafaela-lewis/" },
];
