import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import {
  expectNoA11yViolations,
  renderWithProviders,
} from "@/test-utils/test-utils";
import "@testing-library/jest-dom";
import { MobileMenu } from "../mobile-menu";

describe("MobileMenu", () => {
  describe("Rendering", () => {
    it("should render components correctly", () => {
      const { getByTestId } = renderWithProviders(<MobileMenu />);

      const menu = getByTestId(NAVIGATION_DATA_TEST_IDS.mobileMenu);
      expect(menu).toBeInTheDocument();

      const mobileHeader = getByTestId(NAVIGATION_DATA_TEST_IDS.mobileHeader);
      expect(mobileHeader).toBeInTheDocument();

      const mobileNav = getByTestId(NAVIGATION_DATA_TEST_IDS.mobileNav);
      expect(mobileNav).toBeInTheDocument();
    });
  });
  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      await expectNoA11yViolations(<MobileMenu />);
    });
  });
});
