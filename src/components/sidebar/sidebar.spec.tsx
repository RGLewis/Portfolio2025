import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { getZIndexClass, ZIndexLevel } from "@/global-styles";
import {
  expectNoA11yViolations,
  renderWithProviders,
} from "@/test-utils/test-utils";
import { Sidebar } from "./sidebar";

describe("Sidebar", () => {
  describe("Rendering", () => {
    it("renders the sidebar with nav and footer", () => {
      const { getByTestId } = renderWithProviders(<Sidebar />);

      expect(getByTestId(NAVIGATION_DATA_TEST_IDS.sidebar)).toBeInTheDocument();
      expect(getByTestId(NAVIGATION_DATA_TEST_IDS.nav)).toBeInTheDocument();
      expect(getByTestId(NAVIGATION_DATA_TEST_IDS.footer)).toBeInTheDocument();
    });

    it("has the correct z-index class applied", () => {
      const { getByTestId } = renderWithProviders(<Sidebar />);

      const sidebar = getByTestId(NAVIGATION_DATA_TEST_IDS.sidebar);
      expect(sidebar).toHaveClass(getZIndexClass(ZIndexLevel.SECOND));
    });
  });

  describe("Accessibility", () => {
    it("should have no accessibility violations", async () => {
      await expectNoA11yViolations(<Sidebar />);
    });
  });
});
