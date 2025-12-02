import { EXPERIENCE_PAGE_CONTENT } from "@/assets/content";
import { SKELETON_LOADER_DATA_TEST_IDS } from "@/components/skeleton-loader/constants";
import {
  ACCORDION_DATA_TEST_IDS,
  HERO_IMAGE_DATA_TEST_IDS,
  SKILLS_ITEM_DATA_TEST_IDS,
} from "@/constants";
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
  type PageData,
  type RichTextComponent,
  type SkillsComponent,
  type WorkAccordionComponent,
} from "@/types/content-types";
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
  WORK_2: "work-2",
  WORK_3: "work-3",
};

const TEST_SKILLS = {
  JAVASCRIPT: "JavaScript",
  TYPESCRIPT: "TypeScript",
  REACT: "React",
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
      createWorkAccordionItem({ sys: { id: TEST_WORK_IDS.WORK_2 } }),
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
        { title: TEST_SKILLS.JAVASCRIPT, level: SkillLevels.EXPERT },
        { title: TEST_SKILLS.TYPESCRIPT, level: SkillLevels.ADVANCED },
      ],
    },
    ...overrides,
  }) as SkillsComponent;

describe("ExperienceView", () => {
  const { accordionHeadingContainer } = ACCORDION_DATA_TEST_IDS;
  const { heroImage } = HERO_IMAGE_DATA_TEST_IDS;
  const { skillsItem } = SKILLS_ITEM_DATA_TEST_IDS;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Static Content", () => {
    beforeEach(() => {
      mockUseLoaderData.mockReturnValue(createPageData());
    });

    it("renders hero image", () => {
      const { getByTestId } = renderWithProviders(<ExperienceView />);

      const heroImageElement = getByTestId(heroImage);
      expect(heroImageElement).toBeInTheDocument();
      expect(heroImageElement).toHaveAttribute(
        "src",
        EXPERIENCE_PAGE_CONTENT.image.src
      );
      expect(heroImageElement).toHaveAttribute(
        "alt",
        EXPERIENCE_PAGE_CONTENT.image.alt
      );
    });

    it("renders page heading with correct title", () => {
      const { getByText } = renderWithProviders(<ExperienceView />);

      const heading = getByText(EXPERIENCE_PAGE_CONTENT.title);
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass("page-heading");
    });

    it("renders page container with correct class", () => {
      const { container } = renderWithProviders(<ExperienceView />);

      const pageContainer = container.querySelector(".inner-page");
      expect(pageContainer).toBeInTheDocument();
    });

    it("renders all section headings", () => {
      const { getByText } = renderWithProviders(<ExperienceView />);

      expect(getByText(PageMappings.PROFILE)).toBeInTheDocument();
      expect(getByText(PageMappings.WORK)).toBeInTheDocument();
      expect(getByText(PageMappings.SKILLS)).toBeInTheDocument();
      expect(getByText(PageMappings.EDUCATION)).toBeInTheDocument();
    });
  });

  describe("Dynamic Content - Profile Section", () => {
    it("renders profile rich text when data exists", () => {
      mockUseLoaderData.mockReturnValue(
        createExperiencePageData([createProfileRichText()])
      );

      const { getByText } = renderWithProviders(<ExperienceView />);

      expect(getByText(PageMappings.PROFILE)).toBeInTheDocument();
    });

    it("does not render profile rich text when data is missing", () => {
      mockUseLoaderData.mockReturnValue(createExperiencePageData([]));

      const { getByText } = renderWithProviders(<ExperienceView />);

      expect(getByText(PageMappings.PROFILE)).toBeInTheDocument();
    });
  });

  describe("Dynamic Content - Work Accordion", () => {
    it("renders accordion items when work accordion data exists", () => {
      const workAccordion = createWorkAccordionComponent();
      mockUseLoaderData.mockReturnValue(
        createExperiencePageData([workAccordion])
      );

      const { getByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.WORK_1))
      ).toBeInTheDocument();
      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.WORK_2))
      ).toBeInTheDocument();
    });

    it("renders correct number of accordion items", () => {
      const workAccordion = createWorkAccordionComponent({
        accordionItemsCollection: {
          items: [
            createWorkAccordionItem({ sys: { id: TEST_WORK_IDS.WORK_1 } }),
            createWorkAccordionItem({ sys: { id: TEST_WORK_IDS.WORK_2 } }),
            createWorkAccordionItem({ sys: { id: TEST_WORK_IDS.WORK_3 } }),
          ],
        },
      });
      mockUseLoaderData.mockReturnValue(
        createExperiencePageData([workAccordion])
      );

      const { getByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.WORK_1))
      ).toBeInTheDocument();
      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.WORK_2))
      ).toBeInTheDocument();
      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.WORK_3))
      ).toBeInTheDocument();
    });

    it("does not render accordion items when work accordion data is missing", () => {
      mockUseLoaderData.mockReturnValue(createExperiencePageData([]));

      const { queryByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        queryByTestId(accordionHeadingContainer(TEST_WORK_IDS.WORK_1))
      ).not.toBeInTheDocument();
    });
  });

  describe("Dynamic Content - Skills Section", () => {
    it("renders skills items when skills data exists", () => {
      const skillsComponent = createSkillsComponentWithDefaults();
      mockUseLoaderData.mockReturnValue(
        createExperiencePageData([skillsComponent])
      );

      const { getByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        getByTestId(skillsItem(TEST_SKILLS.JAVASCRIPT))
      ).toBeInTheDocument();
      expect(
        getByTestId(skillsItem(TEST_SKILLS.TYPESCRIPT))
      ).toBeInTheDocument();
    });

    it("renders correct number of skills items", () => {
      const skillsComponent = createSkillsComponentWithDefaults({
        skillsItemCollection: {
          items: [
            { title: TEST_SKILLS.JAVASCRIPT, level: SkillLevels.EXPERT },
            { title: TEST_SKILLS.TYPESCRIPT, level: SkillLevels.ADVANCED },
            { title: TEST_SKILLS.REACT, level: SkillLevels.EXPERT },
          ],
        },
      });
      mockUseLoaderData.mockReturnValue(
        createExperiencePageData([skillsComponent])
      );

      const { getByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        getByTestId(skillsItem(TEST_SKILLS.JAVASCRIPT))
      ).toBeInTheDocument();
      expect(
        getByTestId(skillsItem(TEST_SKILLS.TYPESCRIPT))
      ).toBeInTheDocument();
      expect(getByTestId(skillsItem(TEST_SKILLS.REACT))).toBeInTheDocument();
    });

    it("does not render skills items when skills data is missing", () => {
      mockUseLoaderData.mockReturnValue(createExperiencePageData([]));

      const { queryByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        queryByTestId(skillsItem(TEST_SKILLS.JAVASCRIPT))
      ).not.toBeInTheDocument();
    });
  });

  describe("Dynamic Content - Education Section", () => {
    it("renders education rich text when data exists", () => {
      mockUseLoaderData.mockReturnValue(
        createExperiencePageData([createEducationRichText()])
      );

      const { getByText } = renderWithProviders(<ExperienceView />);

      expect(getByText(PageMappings.EDUCATION)).toBeInTheDocument();
    });

    it("does not render education rich text when data is missing", () => {
      mockUseLoaderData.mockReturnValue(createExperiencePageData([]));

      const { getByText } = renderWithProviders(<ExperienceView />);

      // Heading should still be there even without data
      expect(getByText(PageMappings.EDUCATION)).toBeInTheDocument();
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

      mockUseLoaderData.mockReturnValue(
        createExperiencePageData(allComponents)
      );

      const { getByTestId } = renderWithProviders(<ExperienceView />);

      expect(
        getByTestId(accordionHeadingContainer(TEST_WORK_IDS.WORK_1))
      ).toBeInTheDocument();

      expect(
        getByTestId(skillsItem(TEST_SKILLS.JAVASCRIPT))
      ).toBeInTheDocument();
    });

    it("does not crash when loader returns undefined data", () => {
      mockUseLoaderData.mockReturnValue(undefined as unknown as PageData);

      const { queryByTestId } = renderWithProviders(<ExperienceView />);

      expect(queryByTestId(heroImage)).toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    it("renders skeleton loader when there is no data", () => {
      mockUseLoaderData.mockReturnValue(null as unknown as PageData);

      const { getByTestId, queryByTestId, getByText, container } =
        renderWithProviders(<ExperienceView />);

      const loader = getByTestId(SKELETON_LOADER_DATA_TEST_IDS.container);
      expect(loader).toBeInTheDocument();

      expect(getByTestId(heroImage)).toBeInTheDocument();
      expect(getByText(EXPERIENCE_PAGE_CONTENT.title)).toBeInTheDocument();

      const skillsItem = SKILLS_ITEM_DATA_TEST_IDS.skillsItem(
        TEST_SKILLS.JAVASCRIPT
      );
      expect(queryByTestId(skillsItem)).not.toBeInTheDocument();

      const blocks = container.querySelectorAll(
        '[data-testid^="skeleton-block-"]'
      );
      expect(blocks).toHaveLength(4);
    });
  });

  describe("Accessibility", () => {
    beforeEach(() => {
      mockUseLoaderData.mockReturnValue(
        createExperiencePageData([
          createProfileRichText(),
          createWorkAccordionComponent(),
          createSkillsComponentWithDefaults(),
          createEducationRichText(),
        ])
      );
    });

    it("has no accessibility violations", async () => {
      mockMatchMedia(false);
      await expectNoA11yViolations(<ExperienceView />);
    });
  });
});
