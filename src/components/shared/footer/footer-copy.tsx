import { FOOTER_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/atoms/typography/types";
import { StyledBody } from "@/atoms/typography/typography.styles";
import { FooterCopyContainer } from "./footer.styles";

export const FooterCopy = () => {
  const { copyright, techStack } = FOOTER_CONTENT;

  return (
    <FooterCopyContainer>
      <StyledBody variant={TypographyVariants.WHITE} className="small">
        {techStack}
      </StyledBody>
      <StyledBody variant={TypographyVariants.WHITE} className="small">
        {copyright}
      </StyledBody>
    </FooterCopyContainer>
  );
};
