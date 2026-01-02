import { FOOTER_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/components/typography/types";
import { Body } from "@/components/typography/typography.styles";
import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { FooterCopyContainer } from "./styles";

export const FooterCopy = () => {
  const { footerCopy } = NAVIGATION_DATA_TEST_IDS;
  const { copyright, techStack } = FOOTER_CONTENT;

  return (
    <FooterCopyContainer data-testid={footerCopy}>
      <Body $variant={TypographyVariants.WHITE} className="small">
        {techStack}
      </Body>
      <Body $variant={TypographyVariants.WHITE} className="small">
        {copyright}
      </Body>
    </FooterCopyContainer>
  );
};
