import { FOOTER_CONTENT } from "@/assets/content";
import { renderWithProviders } from "@/test-utils/test-utils";
import { FooterLinks } from "../footer-links";

describe("FooterLinks", () => {
  it("renders the footer links with correct content", () => {
    const { getByText } = renderWithProviders(<FooterLinks />);

    Object.values(FOOTER_CONTENT.links).forEach((link) => {
      expect(getByText(link.text)).toBeInTheDocument();
    });
  });

  it("renders links with correct href attributes", () => {
    const { getByTestId } = renderWithProviders(<FooterLinks />);

    Object.values(FOOTER_CONTENT.links).forEach((link) => {
      const linkElement = getByTestId(`footer-link-${link.text}`);
      expect(linkElement).toHaveAttribute("href", link.link);
    });
  });

  it("renders slashes between links except after the last link", () => {
    const { getAllByText } = renderWithProviders(<FooterLinks />);
    const slashes = getAllByText("/");
    expect(slashes.length).toBe(Object.keys(FOOTER_CONTENT.links).length - 1);
  });
});
