import { ABOUT_PAGE_CONTENT } from "@/assets/content";
import { HERO_IMAGE_DATA_TEST_IDS, RICH_TEXT_DATA_TEST_IDS } from "@/constants";
import {
  createPageData,
  createRichTextComponent,
} from "@/test-utils/factories";
import {
  expectNoA11yViolations,
  mockMatchMedia,
  renderWithProviders,
} from "@/test-utils/test-utils";
import {
  PageMappings,
  TypeNames,
  type PageComponent,
  type PageData,
  type RichTextComponent,
} from "@/types/content-types";
import { useLoaderData } from "react-router-dom";
import { AboutView } from "../about-view";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
}));

const mockUseLoaderData = useLoaderData as jest.MockedFunction<
  typeof useLoaderData
>;

const { heroImage: heroImageTestId } = HERO_IMAGE_DATA_TEST_IDS;
const { richTextSection } = RICH_TEXT_DATA_TEST_IDS;

const RICH_TEXT_TEST_ID = richTextSection(ABOUT_PAGE_CONTENT.title);

const createAboutPageData = (components: PageComponent[]) =>
  createPageData({
    page: {
      title: "About Page",
      componentsCollection: {
        items: components,
      },
    },
  });

const createAboutRichText = (
  overrides?: Partial<RichTextComponent>
): RichTextComponent =>
  createRichTextComponent({
    title: PageMappings.ABOUT,
    ...overrides,
  }) as RichTextComponent;

describe("AboutView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Static Content", () => {
    beforeEach(() => {
      mockUseLoaderData.mockReturnValue(createPageData());
    });

    it("renders hero image", () => {
      const { getByTestId } = renderWithProviders(<AboutView />);

      const heroImage = getByTestId(heroImageTestId);
      expect(heroImage).toBeInTheDocument();
      expect(heroImage).toHaveAttribute("src", ABOUT_PAGE_CONTENT.image.src);
      expect(heroImage).toHaveAttribute("alt", ABOUT_PAGE_CONTENT.image.alt);
    });

    it("renders page heading with correct title", () => {
      const { getByText } = renderWithProviders(<AboutView />);

      const heading = getByText(ABOUT_PAGE_CONTENT.title);
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass("page-heading");
    });

    it("renders page container with correct class", () => {
      const { container } = renderWithProviders(<AboutView />);

      const pageContainer = container.querySelector(".inner-page");
      expect(pageContainer).toBeInTheDocument();
    });
  });

  describe("Dynamic Content - With Data", () => {
    it("renders RichTextWriteUp when aboutRichText exists", () => {
      mockUseLoaderData.mockReturnValue(
        createAboutPageData([createAboutRichText()])
      );

      const { getByTestId } = renderWithProviders(<AboutView />);

      expect(getByTestId(RICH_TEXT_TEST_ID)).toBeInTheDocument();
    });
  });

  describe("Dynamic Content - Without Data", () => {
    it.each([
      {
        description: "aboutRichText is undefined",
        components: [] as PageComponent[],
      },
      {
        description: "component has wrong typename",
        components: [
          {
            ...createAboutRichText(),
            __typename: TypeNames.SKILLS,
          } as unknown as PageComponent,
        ],
      },
      {
        description: "component has wrong title",
        components: [
          createAboutRichText({
            title: "Wrong Title" as PageMappings,
          }),
        ],
      },
    ])(
      "does not render RichTextWriteUp when $description",
      ({ components }) => {
        mockUseLoaderData.mockReturnValue(createAboutPageData(components));

        const { queryByTestId } = renderWithProviders(<AboutView />);

        expect(queryByTestId(RICH_TEXT_TEST_ID)).not.toBeInTheDocument();
      }
    );

    it("does not crash when loader returns undefined data", () => {
      mockUseLoaderData.mockReturnValue(undefined as unknown as PageData);

      const { queryByTestId } = renderWithProviders(<AboutView />);

      expect(queryByTestId(RICH_TEXT_TEST_ID)).not.toBeInTheDocument();
      expect(queryByTestId(heroImageTestId)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    beforeEach(() => {
      mockUseLoaderData.mockReturnValue(createPageData());
    });

    it("has no accessibility violations", async () => {
      mockMatchMedia(false);
      await expectNoA11yViolations(<AboutView />);
    });
  });
});
