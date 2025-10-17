import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { getZIndexClass, ZIndexLevel } from "@/global-styles";
import {
  expectNoA11yViolations,
  renderWithProviders,
} from "@/test-utils/test-utils";
import { Sidebar } from "./sidebar";

describe("Sidebar", () => {
  const { sidebar, nav, footer } = NAVIGATION_DATA_TEST_IDS;

  describe("Rendering", () => {
    it("renders the sidebar with nav and footer", () => {
      const { getByTestId } = renderWithProviders(<Sidebar />);

      expect(getByTestId(sidebar)).toBeInTheDocument();
      expect(getByTestId(nav)).toBeInTheDocument();
      expect(getByTestId(footer)).toBeInTheDocument();
    });

    it("has the correct z-index class applied", () => {
      const { getByTestId } = renderWithProviders(<Sidebar />);

      const sidebarElement = getByTestId(sidebar);
      expect(sidebarElement).toHaveClass(getZIndexClass(ZIndexLevel.SECOND));
    });
  });

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      await expectNoA11yViolations(<Sidebar />);
    });
  });
});
