import { NAV_CONTENT } from "@/assets/content";
import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import {
  expectNoA11yViolations,
  mockMatchMediaWithBreakpoint,
  renderWithProviders,
} from "@/test-utils/test-utils";
import type { NavItem } from "@/types/content-types";
import userEvent from "@testing-library/user-event";
import { Nav } from "..";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

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

const toggleExperienceSubmenu = async (
  getByTestId: ReturnType<typeof renderWithProviders>["getByTestId"],
  user: ReturnType<typeof userEvent.setup>
) => {
  await user.click(getByTestId(expandCollapseButton));
};

const expectExperienceSubmenuExpanded = (container: HTMLElement): void => {
  expect(container).toHaveAttribute(
    "aria-label",
    "Experience submenu expanded"
  );
};

const expectExperienceSubmenuCollapsed = (container: HTMLElement): void => {
  expect(container).toHaveAttribute(
    "aria-label",
    "Experience submenu collapsed"
  );
};

describe("Nav", () => {
  describe("Rendering", () => {
    it("renders the navigation", () => {
      const { getByTestId, getByText } = renderWithProviders(<Nav />);

      expect(getByTestId(nav)).toBeInTheDocument();
      expect(getByTestId(expandCollapseButton)).toBeInTheDocument();
      expect(getByTestId(subLinksContainer)).toBeInTheDocument();

      mainLinks.forEach((item) => {
        getByText(item.text);
      });

      experienceLinks.forEach((item) => {
        getByText(item.text);
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
  });

  describe("Interactions", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
      user = userEvent.setup();
    });

    it.each(mainLinks)(
      "navigates to $link when $text link is clicked",
      async ({ text }) => {
        const { getByTestId } = renderWithProviders(<Nav />);

        const linkElement = getByTestId(navLink(text)) as HTMLAnchorElement;

        await user.click(linkElement);

        expect(linkElement).toHaveClass("active");
      }
    );

    it("should keep experience submenu expanded when clicking hash link on desktop", async () => {
      mockMatchMediaWithBreakpoint("768px", true);

      const mockOnLinkClick = jest.fn();
      const { getByTestId } = renderWithProviders(
        <Nav onLinkClick={mockOnLinkClick} />
      );

      await toggleExperienceSubmenu(getByTestId, user);

      const hashLinkElement = getByTestId(
        experienceLink(experienceLinks[0].text)
      ) as HTMLAnchorElement;

      await user.click(hashLinkElement);

      expect(mockOnLinkClick).toHaveBeenCalledTimes(1);

      const subLinks = getByTestId(subLinksContainer);
      expectExperienceSubmenuExpanded(subLinks);
    });

    it("should collapse the experience submenu when clicking any link on mobile", async () => {
      mockMatchMediaWithBreakpoint("768px", false);

      const mockOnLinkClick = jest.fn();

      const { getByTestId } = renderWithProviders(
        <Nav onLinkClick={mockOnLinkClick} />
      );

      await toggleExperienceSubmenu(getByTestId, user);

      const linkElement = getByTestId(
        experienceLink(experienceLinks[0].text)
      ) as HTMLAnchorElement;

      await user.click(linkElement);

      expect(mockOnLinkClick).toHaveBeenCalledTimes(1);

      const subLinks = getByTestId(subLinksContainer);
      expectExperienceSubmenuCollapsed(subLinks);
    });
  });

  describe("Cross-page navigation", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
      mockNavigate.mockClear();
      user = userEvent.setup();
    });

    it.each([
      { page: "About", path: "/about" },
      { page: "Home", path: "/" },
    ])(
      "should call navigate with hash when clicking hash link from $page page",
      async ({ path }) => {
        const { getByTestId } = renderWithProviders(<Nav />, {
          initialEntries: [path],
        });

        await toggleExperienceSubmenu(getByTestId, user);

        const targetExperienceLink = experienceLinks[0];

        const hashLink = getByTestId(
          experienceLink(targetExperienceLink.text)
        ) as HTMLAnchorElement;

        await user.click(hashLink);

        expect(mockNavigate).toHaveBeenCalledWith(
          `/experience#${targetExperienceLink.slug}`
        );
      }
    );

    it("should NOT call navigate when clicking hash link on Experience page", async () => {
      const { getByTestId } = renderWithProviders(<Nav />, {
        initialEntries: ["/experience"],
      });

      await toggleExperienceSubmenu(getByTestId, user);

      const targetExperienceLink = experienceLinks[0];

      const hashLink = getByTestId(
        experienceLink(targetExperienceLink.text)
      ) as HTMLAnchorElement;

      await user.click(hashLink);

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    describe("State reset when navigating away from Experience", () => {
      it("should collapse Experience section when navigating from Experience to a different page", async () => {
        const { getByTestId } = renderWithProviders(<Nav />, {
          initialEntries: ["/experience"],
        });

        await toggleExperienceSubmenu(getByTestId, user);

        const subLinks = getByTestId(subLinksContainer);
        expectExperienceSubmenuExpanded(subLinks);

        const aboutLink = getByTestId(navLink("About"));

        await user.click(aboutLink);

        expectExperienceSubmenuCollapsed(subLinks);
      });

      it("should start with Experience section collapsed when on a non-Experience page", () => {
        const { getByTestId } = renderWithProviders(<Nav />, {
          initialEntries: ["/about"],
        });

        const subLinks = getByTestId(subLinksContainer);
        expectExperienceSubmenuCollapsed(subLinks);
      });

      it("should allow expanding Experience section when on Experience page", async () => {
        const { getByTestId } = renderWithProviders(<Nav />, {
          initialEntries: ["/experience"],
        });

        let subLinks = getByTestId(subLinksContainer);
        expectExperienceSubmenuCollapsed(subLinks);

        await toggleExperienceSubmenu(getByTestId, user);

        subLinks = getByTestId(subLinksContainer);
        expectExperienceSubmenuExpanded(subLinks);
      });
    });
  });

  describe("Accessibility", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
      user = userEvent.setup();
    });

    it("toggles sub-links container aria-label when button is clicked", async () => {
      const { getByTestId } = renderWithProviders(<Nav />);

      const container = getByTestId(subLinksContainer);

      expectExperienceSubmenuCollapsed(container);

      await toggleExperienceSubmenu(getByTestId, user);

      expectExperienceSubmenuExpanded(container);
    });

    it("should have no accessibility violations when expanded", async () => {
      const { container, getByTestId } = renderWithProviders(<Nav />);

      await toggleExperienceSubmenu(getByTestId, user);

      const { axe } = await import("jest-axe");
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations when collapsed", async () => {
      await expectNoA11yViolations(<Nav />);
    });
  });
});
