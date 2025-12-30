import {
  PageMappings,
  TypeNames,
  type PageData,
  type RichTextComponent,
  type SkillsComponent,
  type WorkAccordionComponent,
} from "@/types/content-types";
import { findComponentByTitle } from "./contentful-utils";

/**
 * Extracts experience-related data from the page data.
 * If data is null, returns default values.
 * @param data - PageData object from Contentful | null
 * @returns Object containing:
 *  - workAccordion: The work accordion component, or null if not found
 *  - skillsComponent: The skills component, or null if not found
 *  - profileRichText: The profile rich text component, or null if not found
 *  - educationRichText: The education rich text component, or null if not found
 *  - accordionItems: An array of accordion items from the work accordion
 *  - skillsItemCollection: The skills item collection from the skills component
 */
export const extractExperienceData = (data: PageData | null) => {
  if (!data) {
    return {
      workAccordion: null,
      skillsComponent: null,
      profileRichText: null,
      educationRichText: null,
      accordionItems: [],
      skillsItemCollection: { items: [] },
    };
  }

  const workAccordion = findComponentByTitle<WorkAccordionComponent>({
    data,
    typename: TypeNames.WORK_ACCORDION,
    title: PageMappings.WORK,
  });

  const skillsComponent = findComponentByTitle<SkillsComponent>({
    data,
    typename: TypeNames.SKILLS,
    title: PageMappings.SKILLS,
  });

  const profileRichText = findComponentByTitle<RichTextComponent>({
    data,
    typename: TypeNames.RICH_TEXT,
    title: PageMappings.PROFILE,
  });

  const educationRichText = findComponentByTitle<RichTextComponent>({
    data,
    typename: TypeNames.RICH_TEXT,
    title: PageMappings.EDUCATION,
  });

  const accordionItems = workAccordion?.accordionItemsCollection.items || [];
  const skillsItemCollection = skillsComponent?.skillsItemCollection || {
    items: [],
  };

  return {
    workAccordion,
    skillsComponent,
    profileRichText,
    educationRichText,
    accordionItems,
    skillsItemCollection,
  };
};

/**
 * Extracts about-related data from the page data.
 * If data is null, returns default values.
 * @param data - PageData object from Contentful | null
 * @returns Object containing:
 *  - aboutRichText: The about rich text component, or null if not found
 */
export const extractAboutData = (data: PageData | null) => {
  if (!data) {
    return {
      aboutRichText: null,
    };
  }

  const aboutRichText = findComponentByTitle<RichTextComponent>({
    data,
    typename: TypeNames.RICH_TEXT,
    title: PageMappings.ABOUT,
  });

  return {
    aboutRichText,
  };
};
