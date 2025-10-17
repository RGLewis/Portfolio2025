import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { FooterCopy } from "./footer-copy";
import { FooterLinks } from "./footer-links";

export const Footer = () => {
  const { footer } = NAVIGATION_DATA_TEST_IDS;

  return (
    <footer data-testid={footer}>
      <FooterLinks />
      <FooterCopy />
    </footer>
  );
};
