import { createPageData } from "@/test-utils/factories";
import { PageMappings, TypeNames } from "@/types/content-types";
import {
  filterComponentsByType,
  findComponentByTitle,
  getComponents,
} from "../contentful-utils";

describe("contentful-utils", () => {
  const pageData = createPageData();

  describe("getComponents", () => {
    it("returns components from page data", () => {
      const components = getComponents(pageData);
      expect(components).toHaveLength(3);
    });

    it("returns empty array for undefined data", () => {
      expect(getComponents(undefined)).toEqual([]);
    });
  });

  describe("filterComponentsByType", () => {
    it("filters by typename", () => {
      const allComponents = getComponents(pageData);

      const richText = filterComponentsByType(
        allComponents,
        TypeNames.RICH_TEXT
      );

      expect(richText).toHaveLength(1);
      expect(richText[0].__typename).toBe(TypeNames.RICH_TEXT);
    });

    it("returns empty array when no matches", () => {
      const richText = filterComponentsByType([], TypeNames.SKILLS);
      expect(richText).toEqual([]);
    });
  });

  describe("findComponentByTitle", () => {
    it("finds component by typename and title", () => {
      const component = findComponentByTitle({
        data: pageData,
        typename: TypeNames.RICH_TEXT,
        title: "Test Rich Text Section" as PageMappings,
      });
      expect(component).toBeDefined();
      expect(component?.__typename).toBe(TypeNames.RICH_TEXT);
    });

    it("returns undefined when component not found or data is undefined", () => {
      const notFound = findComponentByTitle({
        data: pageData,
        typename: TypeNames.SKILLS,
        title: "Non-existent" as PageMappings,
      });

      const noData = findComponentByTitle({
        data: undefined,
        typename: TypeNames.RICH_TEXT,
        title: PageMappings.ABOUT,
      });

      expect(notFound).toBeUndefined();
      expect(noData).toBeUndefined();
    });
  });
});
