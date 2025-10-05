import { FOOTER_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/atoms/typography/types";
import { StyledBody } from "@/atoms/typography/typography.styles";
import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { FooterCopyContainer } from "./footer.styles";

export const FooterCopy = () => {
  const { copyright, techStack } = FOOTER_CONTENT;

  return (
    <FooterCopyContainer data-testid={NAVIGATION_DATA_TEST_IDS.footerCopy}>
      <StyledBody variant={TypographyVariants.WHITE} className="small">
        {techStack}
      </StyledBody>
      <StyledBody variant={TypographyVariants.WHITE} className="small">
        {copyright}
      </StyledBody>
    </FooterCopyContainer>
  );
};
