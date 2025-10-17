import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import {
  expectNoA11yViolations,
  renderWithProviders,
} from "@/test-utils/test-utils";
import { Footer } from "../footer";

describe("Footer", () => {
  const { footer, footerLinks, footerCopy } = NAVIGATION_DATA_TEST_IDS;

  it("renders the Footer component and its children", () => {
    const { getByTestId } = renderWithProviders(<Footer />);

    expect(getByTestId(footer)).toBeInTheDocument();
    expect(getByTestId(footerLinks)).toBeInTheDocument();
    expect(getByTestId(footerCopy)).toBeInTheDocument();
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      await expectNoA11yViolations(<Footer />);
    });
  });
});
