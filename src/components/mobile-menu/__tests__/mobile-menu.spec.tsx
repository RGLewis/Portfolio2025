import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import {
  expectNoA11yViolations,
  renderWithProviders,
} from "@/test-utils/test-utils";
import "@testing-library/jest-dom";
import { MobileMenu } from "../mobile-menu";

describe("MobileMenu", () => {
  const { mobileMenu, mobileHeader, mobileNav } = NAVIGATION_DATA_TEST_IDS;

  describe("Rendering", () => {
    it("should render components correctly", () => {
      const { getByTestId } = renderWithProviders(<MobileMenu />);

      const menu = getByTestId(mobileMenu);
      expect(menu).toBeInTheDocument();

      const headerElement = getByTestId(mobileHeader);
      expect(headerElement).toBeInTheDocument();

      const navElement = getByTestId(mobileNav);
      expect(navElement).toBeInTheDocument();
    });
  });
  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      await expectNoA11yViolations(<MobileMenu />);
    });
  });
});
