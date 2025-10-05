import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import {
  expectNoA11yViolations,
  renderWithProviders,
} from "@/test-utils/test-utils";
import { Footer } from "../footer";

describe("Footer", () => {
  it("renders the Footer component and its children", () => {
    const { getByTestId } = renderWithProviders(<Footer />);

    expect(getByTestId(NAVIGATION_DATA_TEST_IDS.footer)).toBeInTheDocument();
    expect(
      getByTestId(NAVIGATION_DATA_TEST_IDS.footerLinks)
    ).toBeInTheDocument();
    expect(
      getByTestId(NAVIGATION_DATA_TEST_IDS.footerCopy)
    ).toBeInTheDocument();
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      await expectNoA11yViolations(<Footer />);
    });
  });
});
