import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { getZIndexClass, ZIndexLevel } from "@/global-styles";
import {
  expectNoA11yViolations,
  renderWithProviders,
} from "@/test-utils/test-utils";
import { MobileNav } from "../mobile-nav";

describe("MobileNav", () => {
  it("renders the mobile navigation and its components", () => {
    const { getByTestId } = renderWithProviders(
      <MobileNav isMenuOpen={true} />
    );

    const mobileNav = getByTestId(NAVIGATION_DATA_TEST_IDS.mobileNav);
    expect(mobileNav).toBeInTheDocument();

    const nav = getByTestId(NAVIGATION_DATA_TEST_IDS.nav);
    expect(nav).toBeInTheDocument();

    const footer = getByTestId(NAVIGATION_DATA_TEST_IDS.footer);
    expect(footer).toBeInTheDocument();
  });

  it.each([
    { isMenuOpen: true, translateX: "0" },
    { isMenuOpen: false, translateX: "-100%" },
  ])(
    "applies the correct styles when the menu is open: $isMenuOpen",
    ({ isMenuOpen, translateX }) => {
      const { getByTestId } = renderWithProviders(
        <MobileNav isMenuOpen={isMenuOpen} />
      );

      const mobileNav = getByTestId(NAVIGATION_DATA_TEST_IDS.mobileNav);
      expect(mobileNav).toHaveStyle(`transform: translateX(${translateX})`);
    }
  );

  it("has the correct z-index class applied", () => {
    const { getByTestId } = renderWithProviders(
      <MobileNav isMenuOpen={true} />
    );

    const mobileNav = getByTestId(NAVIGATION_DATA_TEST_IDS.mobileNav);
    expect(mobileNav).toHaveClass(getZIndexClass(ZIndexLevel.SECOND));
  });

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      await expectNoA11yViolations(<MobileNav isMenuOpen={true} />);
    });
  });
});
