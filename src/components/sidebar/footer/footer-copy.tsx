import { FOOTER_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/atoms/typography/types";
import { StyledBody } from "@/atoms/typography/typography.styles";
import { SPACINGS } from "@/global-styles";
import styled from "styled-components";

const FooterCopyContainer = styled.div`
  margin-top: ${SPACINGS.xs};
  display: flex;
  flex-direction: column;
  gap: ${SPACINGS.xs} 0;
`;

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
