import {
  createRichTextComponent,
  createSkillsComponent,
  createWorkAccordionItem,
} from "@/test-utils/factories";
import { TypeNames, type PageComponent } from "@/types/content-types";
import {
  isRichTextComponent,
  isSkillsComponent,
  isWorkAccordionComponent,
} from "../component-type-guards";

describe("component-type-guards", () => {
  const richText = createRichTextComponent() as PageComponent;
  const skills = createSkillsComponent() as PageComponent;
  const workAccordion: PageComponent = {
    __typename: TypeNames.WORK_ACCORDION,
    title: "Work",
    accordionItemsCollection: { items: [createWorkAccordionItem()] },
  };

  const guards = [
    {
      guard: isRichTextComponent,
      valid: richText,
      invalid: [skills, workAccordion],
    },
    {
      guard: isSkillsComponent,
      valid: skills,
      invalid: [richText, workAccordion],
    },
    {
      guard: isWorkAccordionComponent,
      valid: workAccordion,
      invalid: [richText, skills],
    },
  ];

  it("returns true for matching typename", () => {
    guards.forEach(({ guard, valid }) => {
      expect(guard(valid)).toBe(true);
    });
  });

  it("returns false for non-matching types", () => {
    guards.forEach(({ guard, invalid }) => {
      invalid.forEach((component) => {
        expect(guard(component)).toBe(false);
      });
    });
  });

  it("returns false for undefined", () => {
    guards.forEach(({ guard }) => {
      expect(guard(undefined)).toBe(false);
    });
  });
});
