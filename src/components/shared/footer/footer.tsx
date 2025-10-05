import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { FooterCopy } from "./footer-copy";
import { FooterLinks } from "./footer-links";

export const Footer = () => {
  return (
    <footer data-testid={NAVIGATION_DATA_TEST_IDS.footer}>
      <FooterLinks />
      <FooterCopy />
    </footer>
  );
};
