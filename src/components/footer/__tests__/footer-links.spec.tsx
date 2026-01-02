import { FOOTER_CONTENT } from "@/assets/content";
import { renderWithProviders } from "@/test-utils/test-utils";
import { FooterLinks } from "../footer-links";

describe("FooterLinks", () => {
  it("renders the footer links correctly", () => {
    const { getByText } = renderWithProviders(<FooterLinks />);

    Object.values(FOOTER_CONTENT.links).forEach((link) => {
      const linkElement = getByText(link.text);

      expect(linkElement).toHaveAttribute("href", link.link);
    });
  });

  it("renders slashes between links except after the last link", () => {
    const { getAllByText } = renderWithProviders(<FooterLinks />);
    const slashes = getAllByText("/");
    expect(slashes.length).toBe(Object.keys(FOOTER_CONTENT.links).length - 1);
  });
});
