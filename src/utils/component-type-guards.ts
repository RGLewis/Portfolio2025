import {
  TypeNames,
  type PageComponent,
  type RichTextComponent,
  type SkillsComponent,
  type WorkAccordionComponent,
} from "@/types/content-types";

/**
 * Type guard to check if a component is a RichTextWriteUp component.
 * Narrows the union type for TypeScript.
 * @param component - The page component to check
 * @returns True if the component is a RichTextWriteUp component
 */
export const isRichTextComponent = (
  component: PageComponent | undefined
): component is RichTextComponent => {
  return component?.__typename === TypeNames.RICH_TEXT;
};

/**
 * Type guard to check if a component is a WorkAccordion component.
 * @param component - The page component to check
 * @returns True if the component is a WorkAccordion component
 */
export const isWorkAccordionComponent = (
  component: PageComponent | undefined
): component is WorkAccordionComponent => {
  return component?.__typename === TypeNames.WORK_ACCORDION;
};

/**
 * Type guard to check if a component is a Skills component.
 * @param component - The page component to check
 * @returns True if the component is a Skills component
 */
export const isSkillsComponent = (
  component: PageComponent | undefined
): component is SkillsComponent => {
  return component?.__typename === TypeNames.SKILLS;
};
