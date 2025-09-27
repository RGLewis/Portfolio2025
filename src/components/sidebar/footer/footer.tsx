import { pxToRem, SIDEBAR_WIDTHS } from "@/global-styles";
import styled from "styled-components";
import { FooterCopy } from "./footer-copy";
import { FooterLinks } from "./footer-links";

const FooterContainer = styled.div`
  // TODO: Update when tackling responsive
  max-width: ${pxToRem(SIDEBAR_WIDTHS.large)};
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks />
      <FooterCopy />
    </FooterContainer>
  );
};
