import { FOOTER_CONTENT } from "@/assets/content";
import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { renderWithProviders } from "@/test-utils/test-utils";
import { FooterCopy } from "../footer-copy";

describe("FooterCopy", () => {
  it("renders the footer copy with correct content", () => {
    const { getByTestId, getByText } = renderWithProviders(<FooterCopy />);

    const footerCopy = getByTestId(NAVIGATION_DATA_TEST_IDS.footerCopy);
    expect(footerCopy).toBeInTheDocument();

    expect(getByText(FOOTER_CONTENT.techStack)).toBeInTheDocument();
    expect(getByText(FOOTER_CONTENT.copyright)).toBeInTheDocument();
  });
});
