import {
  createPageData,
  createRichTextComponent,
  createSkillsComponent,
  createWorkAccordionItem,
} from "@/test-utils/factories";
import {
  PageMappings,
  SkillLevels,
  TypeNames,
  type PageComponent,
  type RichTextComponent,
  type SkillsComponent,
  type WorkAccordionComponent,
} from "@/types/content-types";
import { extractAboutData, extractExperienceData } from "../page-data-utils";

const createExperiencePageData = (components: PageComponent[]) =>
  createPageData({
    page: {
      title: "Experience Page",
      componentsCollection: {
        items: components,
      },
    },
  });

const createAboutPageData = (components: PageComponent[]) =>
  createPageData({
    page: {
      title: "About Page",
      componentsCollection: {
        items: components,
      },
    },
  });

const createProfileRichText = (): RichTextComponent =>
  createRichTextComponent({
    title: PageMappings.PROFILE,
  }) as RichTextComponent;

const createEducationRichText = (): RichTextComponent =>
  createRichTextComponent({
    title: PageMappings.EDUCATION,
  }) as RichTextComponent;

const createWorkAccordion = (): WorkAccordionComponent => ({
  __typename: TypeNames.WORK_ACCORDION,
  title: PageMappings.WORK,
  accordionItemsCollection: {
    items: [
      createWorkAccordionItem({ sys: { id: "work-1" } }),
      createWorkAccordionItem({ sys: { id: "work-2" } }),
    ],
  },
});

const createSkillsComponentWithDefaults = (): SkillsComponent =>
  createSkillsComponent({
    title: PageMappings.SKILLS,
    skillsItemCollection: {
      items: [
        { title: "JavaScript", level: SkillLevels.EXPERT },
        { title: "TypeScript", level: SkillLevels.ADVANCED },
      ],
    },
  }) as SkillsComponent;

const createAboutRichText = (): RichTextComponent =>
  createRichTextComponent({
    title: PageMappings.ABOUT,
  }) as RichTextComponent;

describe("page data utils", () => {
  describe("extractExperienceData", () => {
    it("returns default empty values when data is null", () => {
      const result = extractExperienceData(null);

      expect(result).toEqual({
        workAccordion: null,
        skillsComponent: null,
        profileRichText: null,
        educationRichText: null,
        accordionItems: [],
        skillsItemCollection: { items: [] },
      });
    });

    it("extracts all components from page data", () => {
      const pageData = createExperiencePageData([
        createProfileRichText(),
        createEducationRichText(),
        createWorkAccordion(),
        createSkillsComponentWithDefaults(),
      ]);

      const result = extractExperienceData(pageData);

      expect(result.profileRichText).toBeDefined();
      expect(result.profileRichText?.title).toBe(PageMappings.PROFILE);

      expect(result.educationRichText).toBeDefined();
      expect(result.educationRichText?.title).toBe(PageMappings.EDUCATION);

      expect(result.workAccordion).toBeDefined();
      expect(result.workAccordion?.title).toBe(PageMappings.WORK);

      expect(result.skillsComponent).toBeDefined();
      expect(result.skillsComponent?.title).toBe(PageMappings.SKILLS);

      expect(result.accordionItems).toHaveLength(2);
      expect(result.skillsItemCollection.items).toHaveLength(2);
    });
  });

  describe("extractAboutData", () => {
    it("returns default empty values when data is null", () => {
      const result = extractAboutData(null);

      expect(result).toEqual({
        aboutRichText: null,
      });
    });

    it("extracts about component from page data", () => {
      const pageData = createAboutPageData([createAboutRichText()]);

      const result = extractAboutData(pageData);

      expect(result.aboutRichText).toBeDefined();
      expect(result.aboutRichText?.title).toBe(PageMappings.ABOUT);
    });
  });
});
