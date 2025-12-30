import { EXPERIENCE_PAGE_CONTENT } from "@/assets/content";
import {
  ACCORDION_DATA_TEST_IDS,
  HERO_IMAGE_DATA_TEST_IDS,
  SKELETON_LOADER_DATA_TEST_IDS,
  SKILLS_ITEM_DATA_TEST_IDS,
  SNACKBAR_DATA_TEST_IDS,
} from "@/constants";
import { ContentfulPageTypes, type PageLoaderResult } from "@/loaders/types";
import {
  createPageData,
  createRichTextComponent,
  createSkillsComponent,
  createWorkAccordionItem,
} from "@/test-utils/factories";
import {
  expectNoA11yViolations,
  mockMatchMedia,
  renderWithProviders,
} from "@/test-utils/test-utils";
import {
  PageMappings,
  SkillLevels,
  TypeNames,
  type PageComponent,
  type RichTextComponent,
  type SkillsComponent,
  type WorkAccordionComponent,
} from "@/types/content-types";
import { waitFor } from "@testing-library/react";
import { useLoaderData } from "react-router-dom";
import { ExperienceView } from "../experience-view";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
}));

const mockUseLoaderData = useLoaderData as jest.MockedFunction<
  typeof useLoaderData
>;

const TEST_WORK_IDS = {
  WORK_1: "work-1",
  work2: "work-2",
  work3: "work-3",
};

const TEST_SKILLS = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
};

const createExperiencePageData = (components: PageComponent[]) =>
  createPageData({
    page: {
      title: "Experience Page",
      componentsCollection: {
        items: components,
      },
    },
  });

const createProfileRichText = (
  overrides?: Partial<RichTextComponent>
): RichTextComponent =>
  createRichTextComponent({
    title: PageMappings.PROFILE,
    ...overrides,
  }) as RichTextComponent;

const createEducationRichText = (
  overrides?: Partial<RichTextComponent>
): RichTextComponent =>
  createRichTextComponent({
    title: PageMappings.EDUCATION,
    ...overrides,
  }) as RichTextComponent;

const createWorkAccordionComponent = (
  overrides?: Partial<WorkAccordionComponent>
): WorkAccordionComponent => ({
  __typename: TypeNames.WORK_ACCORDION,
  title: PageMappings.WORK,
  accordionItemsCollection: {
    items: [
      createWorkAccordionItem({ sys: { id: TEST_WORK_IDS.WORK_1 } }),
      createWorkAccordionItem({ sys: { id: TEST_WORK_IDS.work2 } }),
    ],
  },
  ...overrides,
});

const createSkillsComponentWithDefaults = (
  overrides?: Partial<SkillsComponent>
): SkillsComponent =>
  createSkillsComponent({
    title: PageMappings.SKILLS,
    skillsItemCollection: {
      items: [
        { title: TEST_SKILLS.javascript, level: SkillLevels.EXPERT },
        { title: TEST_SKILLS.typescript, level: SkillLevels.ADVANCED },
      ],
    },
    ...overrides,
  }) as SkillsComponent;

describe("ExperienceView", () => {
  const { accordionHeadingContainer } = ACCORDION_DATA_TEST_IDS;
  const { heroImage } = HERO_IMAGE_DATA_TEST_IDS;
  const { skillsItem } = SKILLS_ITEM_DATA_TEST_IDS;
  const { image, title } = EXPERIENCE_PAGE_CONTENT;
  const { container: skeletonLoaderContainer } = SKELETON_LOADER_DATA_TEST_IDS;
  const { errorSnackbarContainer } = SNACKBAR_DATA_TEST_IDS;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Static Content", () => {
    beforeEach(() => {
      mockUseLoaderData.mockReturnValue({
        data: createPageData(),
        error: null,
      } as PageLoaderResult);
    });

    it("renders hero image", () => {
      const { getByTestId } = renderWithProviders(<ExperienceView />);

      const heroImageElement = getByTestId(heroImage);
      expect(heroImageElement).toBeInTheDocument();
      expect(heroImageElement).toHaveAttribute("src", image.src);
      expect(heroImageElement).toHaveAttribute("alt", image.alt);
    });

    it("renders page heading with correct title", () => {
      const { getByText } = renderWithProviders(<ExperienceView />);

      const heading = getByText(title);
      expect(heading).toHaveClass("page-heading");
    });

    it("renders page container with correct class", () => {
      const { container } = renderWithProviders(<ExperienceView />);

      const pageContainer = container.querySelector(".inner-page");
      expect(pageContainer).toBeInTheDocument();
    });

    it("renders all section headings", () => {
      const { getByText } = renderWithProviders(<ExperienceView />);

      getByText(PageMappings.PROFILE);
      getByText(PageMappings.WORK);
      getByText(PageMappings.SKILLS);
      getByText(PageMappings.EDUCATION);
    });
  });

  describe("Dynamic Content - Profile Section", () => {
    it("renders profile rich text when data exists", () => {
      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData([createProfileRichText()]),
        error: null,
      } as PageLoaderResult);

      const { getByText } = renderWithProviders(<ExperienceView />);

      expect(getByText(PageMappings.PROFILE)).toBeInTheDocument();
    });

    it("does not render profile rich text when data is missing", () => {
      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData([]),
        error: null,
      } as PageLoaderResult);

      const { getByText } = renderWithProviders(<ExperienceView />);

      getByText(PageMappings.PROFILE);
    });
  });

  describe("Dynamic Content - Work Accordion", () => {
    it("renders accordion items when work accordion data exists", () => {
      const workAccordion = createWorkAccordionComponent();
      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData([workAccordion]),
        error: null,
      } as PageLoaderResult);

      const { getByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.WORK_1))
      ).toBeInTheDocument();
      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.work2))
      ).toBeInTheDocument();
    });

    it("renders correct number of accordion items", () => {
      const workAccordion = createWorkAccordionComponent({
        accordionItemsCollection: {
          items: [
            createWorkAccordionItem({ sys: { id: TEST_WORK_IDS.WORK_1 } }),
            createWorkAccordionItem({ sys: { id: TEST_WORK_IDS.work2 } }),
            createWorkAccordionItem({ sys: { id: TEST_WORK_IDS.work3 } }),
          ],
        },
      });
      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData([workAccordion]),
        error: null,
      } as PageLoaderResult);

      const { getByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.WORK_1))
      ).toBeInTheDocument();
      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.work2))
      ).toBeInTheDocument();
      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.work3))
      ).toBeInTheDocument();
    });

    it("does not render accordion items when work accordion data is missing", () => {
      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData([]),
        error: null,
      } as PageLoaderResult);

      const { queryByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        queryByTestId(accordionHeadingContainer(TEST_WORK_IDS.WORK_1))
      ).not.toBeInTheDocument();
    });
  });

  describe("Dynamic Content - Skills Section", () => {
    it("renders skills items when skills data exists", () => {
      const skillsComponent = createSkillsComponentWithDefaults();
      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData([skillsComponent]),
        error: null,
      } as PageLoaderResult);

      const { getByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        getByTestId(skillsItem(TEST_SKILLS.javascript))
      ).toBeInTheDocument();
      expect(
        getByTestId(skillsItem(TEST_SKILLS.typescript))
      ).toBeInTheDocument();
    });

    it("renders correct number of skills items", () => {
      const skillsComponent = createSkillsComponentWithDefaults({
        skillsItemCollection: {
          items: [
            { title: TEST_SKILLS.javascript, level: SkillLevels.EXPERT },
            { title: TEST_SKILLS.typescript, level: SkillLevels.ADVANCED },
            { title: TEST_SKILLS.react, level: SkillLevels.EXPERT },
          ],
        },
      });
      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData([skillsComponent]),
        error: null,
      } as PageLoaderResult);

      const { getByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        getByTestId(skillsItem(TEST_SKILLS.javascript))
      ).toBeInTheDocument();
      expect(
        getByTestId(skillsItem(TEST_SKILLS.typescript))
      ).toBeInTheDocument();
      expect(getByTestId(skillsItem(TEST_SKILLS.react))).toBeInTheDocument();
    });

    it("does not render skills items when skills data is missing", () => {
      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData([]),
        error: null,
      } as PageLoaderResult);

      const { queryByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        queryByTestId(skillsItem(TEST_SKILLS.javascript))
      ).not.toBeInTheDocument();
    });
  });

  describe("Dynamic Content - Education Section", () => {
    it("renders education rich text when data exists", () => {
      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData([createEducationRichText()]),
        error: null,
      } as PageLoaderResult);

      const { getByText } = renderWithProviders(<ExperienceView />);

      getByText(PageMappings.EDUCATION);
    });

    it("does not render education rich text when data is missing", () => {
      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData([]),
        error: null,
      } as PageLoaderResult);

      const { getByText } = renderWithProviders(<ExperienceView />);

      getByText(title);
    });
  });

  describe("Dynamic Content - Combined Sections", () => {
    it("renders all sections when all data exists", () => {
      const allComponents = [
        createProfileRichText(),
        createWorkAccordionComponent(),
        createSkillsComponentWithDefaults(),
        createEducationRichText(),
      ];

      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData(allComponents),
        error: null,
      } as PageLoaderResult);

      const { getByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.WORK_1))
      ).toBeInTheDocument();

      expect(
        getByTestId(skillsItem(TEST_SKILLS.javascript))
      ).toBeInTheDocument();
    });

    it("does not crash when loader returns undefined data", () => {
      mockUseLoaderData.mockReturnValue(
        undefined as unknown as PageLoaderResult
      );

      const { queryByTestId } = renderWithProviders(<ExperienceView />);

      expect(queryByTestId(heroImage)).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("renders skeleton loader when there is no data after delay", async () => {
      mockUseLoaderData.mockReturnValue(
        undefined as unknown as PageLoaderResult
      );

      const { getByTestId, queryByTestId, getByText, container } =
        renderWithProviders(<ExperienceView />);

      await waitFor(() => {
        expect(getByTestId(skeletonLoaderContainer)).toBeInTheDocument();
      });

      expect(getByTestId(heroImage)).toBeInTheDocument();
      getByText(title);

      expect(
        queryByTestId(skillsItem(TEST_SKILLS.javascript))
      ).not.toBeInTheDocument();

      const blocks = container.querySelectorAll(
        '[data-testid^="skeleton-block-"]'
      );
      expect(blocks).toHaveLength(4);
    });
  });

  describe("Error State", () => {
    const { EXPERIENCE_PAGE } = ContentfulPageTypes;

    it("renders skeleton loader, error snackbar and static content when there is an error", async () => {
      mockUseLoaderData.mockReturnValue({
        data: null,
        error: EXPERIENCE_PAGE,
      } as PageLoaderResult);

      const { getByTestId, getByText } = renderWithProviders(
        <ExperienceView />
      );

      await waitFor(() => {
        expect(getByTestId(skeletonLoaderContainer)).toBeInTheDocument();
      });

      expect(
        getByTestId(errorSnackbarContainer(EXPERIENCE_PAGE))
      ).toBeInTheDocument();

      expect(getByTestId(heroImage)).toBeInTheDocument();
      getByText(title);
    });
  });

  describe("Accessibility", () => {
    beforeEach(() => {
      mockUseLoaderData.mockReturnValue({
        data: createExperiencePageData([
          createProfileRichText(),
          createWorkAccordionComponent(),
          createSkillsComponentWithDefaults(),
          createEducationRichText(),
        ]),
        error: null,
      } as PageLoaderResult);
    });

    it("has no accessibility violations", async () => {
      mockMatchMedia(false);
      await expectNoA11yViolations(<ExperienceView />);
    });
  });
});
