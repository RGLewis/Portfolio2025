import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { getZIndexClass, ZIndexLevel } from "@/global-styles";
import {
  expectNoA11yViolations,
  renderWithProviders,
} from "@/test-utils/test-utils";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileNav } from "../mobile-nav";

const defaultProps = {
  isMenuOpen: true,
  onLinkClick: jest.fn(),
};

describe("MobileNav", () => {
  const { mobileNav, nav, footer, navLink } = NAVIGATION_DATA_TEST_IDS;

  it("renders the mobile navigation and its components", () => {
    const { getByTestId } = renderWithProviders(
      <MobileNav {...defaultProps} />
    );

    const mobileNavElement = getByTestId(mobileNav);
    expect(mobileNavElement).toBeInTheDocument();

    const navElement = getByTestId(nav);
    expect(navElement).toBeInTheDocument();

    const footerElement = getByTestId(footer);
    expect(footerElement).toBeInTheDocument();
  });

  it.each([
    { isMenuOpen: true, translateX: "0" },
    { isMenuOpen: false, translateX: "-100%" },
  ])(
    "applies the correct styles when the menu is open: $isMenuOpen",
    ({ isMenuOpen, translateX }) => {
      const { getByTestId } = renderWithProviders(
        <MobileNav {...defaultProps} isMenuOpen={isMenuOpen} />
      );

      const mobileNavElement = getByTestId(mobileNav);
      expect(mobileNavElement).toHaveStyle(
        `transform: translateX(${translateX})`
      );
    }
  );

  it("has the correct z-index class applied", () => {
    const { getByTestId } = renderWithProviders(
      <MobileNav {...defaultProps} />
    );

    const mobileNavElement = getByTestId(mobileNav);
    expect(mobileNavElement).toHaveClass(getZIndexClass(ZIndexLevel.SECOND));
  });

  it("closes the menu when a link is clicked", async () => {
    const user = userEvent.setup();
    const onLinkClickMock = jest.fn();

    const { getByTestId } = renderWithProviders(
      <MobileNav isMenuOpen={true} onLinkClick={onLinkClickMock} />
    );

    const aboutLink = getByTestId(navLink("About"));

    await user.click(aboutLink);

    await waitFor(() => {
      expect(onLinkClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      await expectNoA11yViolations(<MobileNav {...defaultProps} />);
    });
  });
});
