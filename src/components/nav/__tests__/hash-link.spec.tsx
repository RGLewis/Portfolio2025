import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { renderWithProviders } from "@/test-utils/test-utils";
import { Slugs } from "@/types/content-types";
import userEvent from "@testing-library/user-event";
import { HashLink } from "../hash-link";

const mockNavigateToSection = jest.fn();
let mockActiveSection: Slugs | null = null;

jest.mock("@/contexts/navigation-context", () => ({
  ...jest.requireActual("@/contexts/navigation-context"),
  useNavigationContext: () => ({
    navigateToSection: mockNavigateToSection,
    get activeSection() {
      return mockActiveSection;
    },
  }),
}));

const { experienceLink } = NAVIGATION_DATA_TEST_IDS;

const TEST_SLUG = Slugs.WORK;
const TEST_TEXT = "Work";
const TEST_HREF = `#${TEST_SLUG}`;

const defaultProps = {
  to: TEST_HREF,
  text: TEST_TEXT,
  slug: TEST_SLUG,
  onClick: jest.fn(),
  isExperienceExpanded: true,
};

const renderHashLink = (props = {}) => {
  return renderWithProviders(<HashLink {...defaultProps} {...props} />);
};

describe("HashLink", () => {
  beforeEach(() => {
    mockNavigateToSection.mockClear();
    defaultProps.onClick.mockClear();
    mockActiveSection = null;
  });

  describe("Rendering", () => {
    it("renders with correct attributes", () => {
      const { getByTestId } = renderHashLink();

      const link = getByTestId(experienceLink(TEST_TEXT));
      expect(link).toHaveAttribute("href", TEST_HREF);
      expect(link).toHaveAttribute("data-slug", TEST_SLUG);
      expect(link).toHaveTextContent(TEST_TEXT);
    });

    it.each(Object.values(Slugs))("renders correctly for slug: %s", (slug) => {
      const text = slug.charAt(0).toUpperCase() + slug.slice(1);

      const { getByTestId } = renderHashLink({
        slug,
        text,
        to: `#${slug}`,
      });

      const link = getByTestId(experienceLink(text));
      expect(link).toHaveAttribute("href", `#${slug}`);
      expect(link).toHaveAttribute("data-slug", slug);
      expect(link).toHaveTextContent(text);
    });
  });

  describe("Active state", () => {
    it.each(Object.values(Slugs))(
      "shows active state correctly for slug: %s",
      (slug) => {
        mockActiveSection = slug;
        const upperCaseSlug = slug.charAt(0).toUpperCase() + slug.slice(1);

        const { getByTestId } = renderHashLink({
          slug,
          text: upperCaseSlug,
          to: `#${slug}`,
        });

        const link = getByTestId(experienceLink(upperCaseSlug));
        expect(link).toHaveStyle({ textDecoration: "underline" });
      }
    );

    it("does not show active state when activeSection does not match slug", () => {
      mockActiveSection = Slugs.EDUCATION;

      const { getByTestId } = renderHashLink({
        slug: Slugs.WORK,
        text: "Work",
        to: `#${Slugs.WORK}`,
      });

      const link = getByTestId(experienceLink("Work"));
      expect(link).toHaveStyle({ textDecoration: "none" });
    });
  });

  describe("Interactions", () => {
    it("calls navigateToSection with slug when clicked", async () => {
      const user = userEvent.setup();

      const { getByTestId } = renderHashLink();

      const link = getByTestId(experienceLink(TEST_TEXT));
      await user.click(link);

      expect(mockNavigateToSection).toHaveBeenCalledWith(TEST_SLUG);
    });

    it("calls onClick prop after navigating", async () => {
      const user = userEvent.setup();

      const mockOnClick = jest.fn();

      const { getByTestId } = renderHashLink({ onClick: mockOnClick });

      const link = getByTestId(experienceLink(TEST_TEXT));
      await user.click(link);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("prevents default link behavior", async () => {
      const { getByTestId } = renderHashLink();

      const link = getByTestId(experienceLink(TEST_TEXT));

      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(clickEvent, "preventDefault");

      link.dispatchEvent(clickEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("sets tabIndex to 0 when experience is expanded", () => {
      const { getByTestId } = renderHashLink({ isExperienceExpanded: true });

      const link = getByTestId(experienceLink(TEST_TEXT));
      expect(link).toHaveAttribute("tabIndex", "0");
    });

    it("sets tabIndex to -1 when experience is collapsed", () => {
      const { getByTestId } = renderHashLink({ isExperienceExpanded: false });

      const link = getByTestId(experienceLink(TEST_TEXT));
      expect(link).toHaveAttribute("tabIndex", "-1");
    });
  });
});
