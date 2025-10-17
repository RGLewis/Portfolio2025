import {
  createPageData,
  createRichTextComponent,
  createSkillsComponent,
} from "@/test-utils/factories";
import {
  PageMappings,
  TypeNames,
  type PageComponent,
  type PageData,
  type RichTextComponent,
  type SkillsComponent,
} from "@/types/content-types";
import {
  filterComponentsByType,
  findComponentByTitle,
  getComponents,
} from "../contentful-utils";

// Test Constants
const TEST_TITLES = {
  PAGE: "Test Page",
  RICH_TEXT: "Test Rich Text Section",
  WORK_EXPERIENCE: "Test Work Experience",
  SKILLS: "Test Skills",
  FIRST: "First Rich Text",
  SECOND: "Second Rich Text",
  THIRD: "Third Rich Text",
  DUPLICATE: "Duplicate Title",
  DIFFERENT: "Different Title",
};

const createMinimalPage = (items: PageComponent[]): PageData["page"] => ({
  title: TEST_TITLES.PAGE,
  componentsCollection: { items },
});

const expectEmptyArray = <T>(result: T[]) => {
  expect(result).toEqual([]);
  expect(result).toHaveLength(0);
};

const expectComponentType = (
  component: PageComponent | undefined,
  typename: TypeNames
) => {
  expect(component).toBeDefined();
  expect(component?.__typename).toBe(typename);
};

describe("contentful-utils", () => {
  describe("getComponents", () => {
    it("returns all components from valid page data", () => {
      const pageData = createPageData();
      const components = getComponents(pageData);

      expect(components).toHaveLength(3);
      expect(components[0].__typename).toBe(TypeNames.RICH_TEXT);
      expect(components[1].__typename).toBe(TypeNames.WORK_ACCORDION);
      expect(components[2].__typename).toBe(TypeNames.SKILLS);
    });

    it.each([
      {
        description: "data is undefined",
        data: undefined,
      },
      {
        description: "page is undefined",
        data: { page: undefined } as unknown as PageData,
      },
      {
        description: "componentsCollection is undefined",
        data: {
          page: { componentsCollection: undefined },
        } as unknown as PageData,
      },
      {
        description: "items is undefined",
        data: {
          page: { componentsCollection: { items: undefined } },
        } as unknown as PageData,
      },
      {
        description: "items is empty",
        data: createPageData({
          page: createMinimalPage([]),
        }),
      },
    ])("returns empty array when $description", ({ data }) => {
      const components = getComponents(data);
      expectEmptyArray(components);
    });
  });

  describe("filterComponentsByType", () => {
    const pageData = createPageData();
    const allComponents = getComponents(pageData);

    it.each([
      {
        typename: TypeNames.RICH_TEXT,
        expectedTitle: TEST_TITLES.RICH_TEXT,
        description: "RichText components",
      },
      {
        typename: TypeNames.WORK_ACCORDION,
        expectedTitle: TEST_TITLES.WORK_EXPERIENCE,
        description: "WorkAccordion components",
      },
      {
        typename: TypeNames.SKILLS,
        expectedTitle: TEST_TITLES.SKILLS,
        description: "Skills components",
      },
    ])("filters $description correctly", ({ typename, expectedTitle }) => {
      const filtered = filterComponentsByType(allComponents, typename);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].__typename).toBe(typename);
      expect(filtered[0].title).toBe(expectedTitle);
    });

    it("returns empty array when no components match typename", () => {
      const pageWithOnlyRichText = createPageData({
        page: createMinimalPage([
          createRichTextComponent() as RichTextComponent,
        ]),
      });

      const allComponents = getComponents(pageWithOnlyRichText);
      const skillsComponents = filterComponentsByType<SkillsComponent>(
        allComponents,
        TypeNames.SKILLS
      );

      expectEmptyArray(skillsComponents);
    });

    it("returns empty array when components array is empty", () => {
      const skillsComponents = filterComponentsByType<SkillsComponent>(
        [],
        TypeNames.SKILLS
      );

      expectEmptyArray(skillsComponents);
    });

    it("handles multiple components of the same type", () => {
      const pageData = createPageData({
        page: createMinimalPage([
          createRichTextComponent({
            title: TEST_TITLES.FIRST,
          }) as RichTextComponent,
          createRichTextComponent({
            title: TEST_TITLES.SECOND,
          }) as RichTextComponent,
          createRichTextComponent({
            title: TEST_TITLES.THIRD,
          }) as RichTextComponent,
          createSkillsComponent() as SkillsComponent,
        ]),
      });

      const allComponents = getComponents(pageData);
      const richTextComponents = filterComponentsByType<RichTextComponent>(
        allComponents,
        TypeNames.RICH_TEXT
      );

      expect(richTextComponents).toHaveLength(3);
      expect(richTextComponents[0].title).toBe(TEST_TITLES.FIRST);
      expect(richTextComponents[1].title).toBe(TEST_TITLES.SECOND);
      expect(richTextComponents[2].title).toBe(TEST_TITLES.THIRD);
    });
  });

  describe("findComponentByTitle", () => {
    it.each([
      {
        typename: TypeNames.RICH_TEXT,
        title: TEST_TITLES.RICH_TEXT as PageMappings,
        ComponentType: "RichTextComponent" as const,
        description: "RichText component",
      },
      {
        typename: TypeNames.WORK_ACCORDION,
        title: TEST_TITLES.WORK_EXPERIENCE as PageMappings,
        ComponentType: "WorkAccordionComponent" as const,
        description: "WorkAccordion component",
      },
      {
        typename: TypeNames.SKILLS,
        title: TEST_TITLES.SKILLS as PageMappings,
        ComponentType: "SkillsComponent" as const,
        description: "Skills component",
      },
    ])("finds $description by title", ({ typename, title }) => {
      const pageData = createPageData();

      const component = findComponentByTitle({
        data: pageData,
        typename,
        title,
      });

      expectComponentType(component, typename);
      expect(component?.title).toBe(title);
    });

    it("returns undefined when component with title is not found", () => {
      const pageData = createPageData();

      const component = findComponentByTitle<RichTextComponent>({
        data: pageData,
        typename: TypeNames.RICH_TEXT,
        title: "Non-existent Title" as PageMappings,
      });

      expect(component).toBeUndefined();
    });

    it("returns undefined when typename does not match", () => {
      const pageData = createPageData();

      const component = findComponentByTitle<SkillsComponent>({
        data: pageData,
        typename: TypeNames.SKILLS,
        title: TEST_TITLES.RICH_TEXT as PageMappings,
      });

      expect(component).toBeUndefined();
    });

    it("returns undefined when data is undefined", () => {
      const component = findComponentByTitle<RichTextComponent>({
        data: undefined,
        typename: TypeNames.RICH_TEXT,
        title: PageMappings.ABOUT,
      });

      expect(component).toBeUndefined();
    });

    it("returns first matching component when multiple components have same title", () => {
      const pageData = createPageData({
        page: createMinimalPage([
          createRichTextComponent({
            title: TEST_TITLES.DUPLICATE,
          }) as RichTextComponent,
          createRichTextComponent({
            title: TEST_TITLES.DUPLICATE,
          }) as RichTextComponent,
          createRichTextComponent({
            title: TEST_TITLES.DIFFERENT,
          }) as RichTextComponent,
        ]),
      });

      const component = findComponentByTitle<RichTextComponent>({
        data: pageData,
        typename: TypeNames.RICH_TEXT,
        title: TEST_TITLES.DUPLICATE as PageMappings,
      });

      expect(component).toBeDefined();
      expect(component?.title).toBe(TEST_TITLES.DUPLICATE);
      // Should return first one found
      expect(component).toBe(pageData.page.componentsCollection.items[0]);
    });

    it("works with PageMappings enum values", () => {
      const pageData = createPageData({
        page: createMinimalPage([
          createRichTextComponent({
            title: PageMappings.ABOUT,
          }) as RichTextComponent,
          createRichTextComponent({
            title: PageMappings.PROFILE,
          }) as RichTextComponent,
          createSkillsComponent({
            title: PageMappings.SKILLS,
          }) as SkillsComponent,
        ]),
      });

      const aboutComponent = findComponentByTitle<RichTextComponent>({
        data: pageData,
        typename: TypeNames.RICH_TEXT,
        title: PageMappings.ABOUT,
      });

      const profileComponent = findComponentByTitle<RichTextComponent>({
        data: pageData,
        typename: TypeNames.RICH_TEXT,
        title: PageMappings.PROFILE,
      });

      const skillsComponent = findComponentByTitle<SkillsComponent>({
        data: pageData,
        typename: TypeNames.SKILLS,
        title: PageMappings.SKILLS,
      });

      expect(aboutComponent?.title).toBe(PageMappings.ABOUT);
      expect(profileComponent?.title).toBe(PageMappings.PROFILE);
      expect(skillsComponent?.title).toBe(PageMappings.SKILLS);
    });
  });
});
