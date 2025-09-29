import {
  device,
  MOBILE_HEADER_HEIGHT,
  pxToRem,
  SIDEBAR_WIDTHS,
} from "@/global-styles";
import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;

  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  min-width: 0;
  background: ${({ theme }) => theme.background};
  padding-top: ${pxToRem(MOBILE_HEADER_HEIGHT)};

  @media ${device.medium} {
    padding-top: 0;
    margin-left: ${pxToRem(SIDEBAR_WIDTHS.medium)};
  }

  @media ${device.large} {
    margin-left: ${pxToRem(SIDEBAR_WIDTHS.large)};
  }
`;
