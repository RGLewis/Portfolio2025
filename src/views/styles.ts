import { styled } from "styled-components";
import { device, pxToRem } from "../global-styles";

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: ${pxToRem(20)};
  width: 100%;
  display: flex;
  flex-direction: column;

  &.center-align {
    align-items: center;
  }

  &.center-justify {
    justify-content: center;
  }

  @supports (-webkit-touch-callout: none) {
    /* Fix for iOS Safari's incorrect vh handling */
    min-height: -webkit-fill-available;
  }

  @media ${device.large} {
    padding: ${pxToRem(40)};
  }
`;
