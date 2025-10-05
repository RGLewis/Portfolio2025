import { LAYOUT_DATA_TEST_IDS, NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { BREAKPOINTS, getZIndexClass, ZIndexLevel } from "@/global-styles";
import {
  expectNoA11yViolations,
  mockMatchMedia,
  mockMatchMediaWithBreakpoint,
  renderWithProviders,
} from "@/test-utils/test-utils";
import { RootLayout } from "./root-layout";

describe("RootLayout", () => {
  describe("Rendering", () => {
    it.each([
      [
        "mobile",
        false,
        NAVIGATION_DATA_TEST_IDS.mobileMenu,
        NAVIGATION_DATA_TEST_IDS.sidebar,
      ],
      [
        "desktop",
        true,
        NAVIGATION_DATA_TEST_IDS.sidebar,
        NAVIGATION_DATA_TEST_IDS.mobileMenu,
      ],
    ] as const)(
      "renders the %s navigation component",
      (_label, matches, expectedTestId, notExpectedTestId) => {
        mockMatchMediaWithBreakpoint(BREAKPOINTS.medium, matches);

        const { getByTestId, queryByTestId } = renderWithProviders(
          <RootLayout />
        );

        expect(getByTestId(expectedTestId)).toBeInTheDocument();
        expect(queryByTestId(notExpectedTestId)).not.toBeInTheDocument();
      }
    );

    it("renders the layout and main content components", () => {
      mockMatchMedia(false);

      const { getByTestId } = renderWithProviders(<RootLayout />);

      expect(getByTestId(LAYOUT_DATA_TEST_IDS.rootLayout)).toBeInTheDocument();

      expect(getByTestId(LAYOUT_DATA_TEST_IDS.mainContent)).toBeInTheDocument();
    });

    it("renders the correct z-index class on main content", () => {
      mockMatchMedia(false);

      const { getByTestId } = renderWithProviders(<RootLayout />);

      expect(getByTestId(LAYOUT_DATA_TEST_IDS.mainContent)).toHaveClass(
        getZIndexClass(ZIndexLevel.BASE)
      );
    });
  });
  describe("Accessibility", () => {
    it("has no accessibility violations on mobile", async () => {
      mockMatchMediaWithBreakpoint(BREAKPOINTS.medium, false);
      await expectNoA11yViolations(<RootLayout />);
    });

    it("has no accessibility violations on desktop", async () => {
      mockMatchMediaWithBreakpoint(BREAKPOINTS.medium, true);
      await expectNoA11yViolations(<RootLayout />);
    });
  });
});
