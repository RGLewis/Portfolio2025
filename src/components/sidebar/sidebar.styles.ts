import { pxToRem, SIDEBAR_WIDTHS } from "@/global-styles";
import styled from "styled-components";

export const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  // TODO: Update when tackling responsive
  width: ${pxToRem(SIDEBAR_WIDTHS.large)}
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.menuBackground};
  border-right: ${pxToRem(1)} solid ${({ theme }) => theme.menuBorder};
  padding: ${pxToRem(40)} ${pxToRem(20)};
  justify-content: space-between;
  z-index: 100;

  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
  }
`;
