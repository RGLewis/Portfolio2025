import { FOOTER_CONTENT } from "@/assets/content";
import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { renderWithProviders } from "@/test-utils/test-utils";
import { FooterCopy } from "../footer-copy";

describe("FooterCopy", () => {
  const { footerCopy } = NAVIGATION_DATA_TEST_IDS;

  it("renders the footer copy with correct content", () => {
    const { getByTestId, getByText } = renderWithProviders(<FooterCopy />);

    const footerCopyElement = getByTestId(footerCopy);
    expect(footerCopyElement).toBeInTheDocument();

    getByText(FOOTER_CONTENT.techStack);
    getByText(FOOTER_CONTENT.copyright);
  });
});
