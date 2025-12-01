import { LAYOUT_DATA_TEST_IDS, NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { BREAKPOINTS, getZIndexClass, ZIndexLevel } from "@/global-styles";
import {
  expectNoA11yViolations,
  mockMatchMedia,
  mockMatchMediaWithBreakpoint,
  renderWithProviders,
} from "@/test-utils/test-utils";
import { RootLayout } from "../root-layout";

describe("RootLayout", () => {
  const { mobileMenu, sidebar } = NAVIGATION_DATA_TEST_IDS;
  const { rootLayout, mainContent } = LAYOUT_DATA_TEST_IDS;

  describe("Rendering", () => {
    it.each([
      ["mobile", false, sidebar, mobileMenu],
      ["desktop", true, mobileMenu, sidebar],
    ] as const)(
      "renders the %s navigation component",
      (_label, matches, notExpectedTestId, expectedTestId) => {
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

      expect(getByTestId(rootLayout)).toBeInTheDocument();

      expect(getByTestId(mainContent)).toBeInTheDocument();
    });

    it("renders the correct z-index class on main content", () => {
      mockMatchMedia(false);

      const { getByTestId } = renderWithProviders(<RootLayout />);

      expect(getByTestId(mainContent)).toHaveClass(
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
