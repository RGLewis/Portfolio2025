import { NAV_CONTENT } from "@/assets/content";
import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import {
  expectNoA11yViolations,
  renderWithProviders,
} from "@/test-utils/test-utils";
import type { NavItem } from "@/types/content-types";
import userEvent from "@testing-library/user-event";
import { Nav } from "../nav";

const mainLinks: NavItem[] = [];
const experienceLinks: NavItem[] = [];

NAV_CONTENT.forEach((item) => {
  if (item.slug) {
    experienceLinks.push(item);
  } else {
    mainLinks.push(item);
  }
});

const {
  nav,
  navLink,
  expandCollapseButton,
  subLinksContainer,
  experienceLink,
} = NAVIGATION_DATA_TEST_IDS;

/**
 * Helper function to toggle the experience submenu by clicking the expand/collapse button
 */
const toggleExperienceSubmenu = async (
  getByTestId: ReturnType<typeof renderWithProviders>["getByTestId"]
) => {
  const user = userEvent.setup();
  await user.click(getByTestId(expandCollapseButton));
};

describe("Nav", () => {
  describe("Rendering", () => {
    it("renders the navigation", () => {
      const { getByTestId } = renderWithProviders(<Nav />);

      expect(getByTestId(nav)).toBeInTheDocument();
      expect(getByTestId(expandCollapseButton)).toBeInTheDocument();
      expect(getByTestId(subLinksContainer)).toBeInTheDocument();

      mainLinks.forEach((item) => {
        expect(getByTestId(navLink(item.text))).toBeInTheDocument();
      });

      experienceLinks.forEach((item) => {
        expect(getByTestId(experienceLink(item.text))).toBeInTheDocument();
      });
    });

    it("renders the appropriate href for main links", () => {
      const { getByTestId } = renderWithProviders(<Nav />);

      mainLinks.forEach((item) => {
        expect(getByTestId(navLink(item.text))).toHaveAttribute(
          "href",
          item.link
        );
      });
    });

    it("renders the appropriate slug for experience links", () => {
      const { getByTestId } = renderWithProviders(<Nav />);

      experienceLinks.forEach((item) => {
        const link = getByTestId(experienceLink(item.text));
        expect(link).toHaveAttribute("href", item.link);
        expect(link).toHaveAttribute("data-slug", item.slug);
      });
    });
  });

  describe("Interactions", () => {
    it.each(mainLinks)(
      "navigates to $link when $text link is clicked",
      async ({ text, link }) => {
        const user = userEvent.setup();
        const { getByTestId } = renderWithProviders(<Nav />);

        const linkElement = getByTestId(navLink(text)) as HTMLAnchorElement;

        expect(linkElement).toHaveAttribute("href", link);

        await user.click(linkElement);

        expect(linkElement).toHaveClass("active");
      }
    );
  });

  describe("Accessibility", () => {
    it("toggles sub-links container aria-label when button is clicked", async () => {
      const { getByTestId } = renderWithProviders(<Nav />);

      const container = getByTestId(subLinksContainer);

      expect(container).toHaveAttribute(
        "aria-label",
        "Experience submenu collapsed"
      );

      await toggleExperienceSubmenu(getByTestId);

      expect(container).toHaveAttribute(
        "aria-label",
        "Experience submenu expanded"
      );
    });

    it("should have no accessibility violations when expanded", async () => {
      const { container, getByTestId } = renderWithProviders(<Nav />);

      await toggleExperienceSubmenu(getByTestId);

      const { axe } = await import("jest-axe");
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations when collapsed", async () => {
      await expectNoA11yViolations(<Nav />);
    });
  });
});
