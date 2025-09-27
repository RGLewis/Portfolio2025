import { device, pxToRem } from "@/global-styles";
import { styled } from "styled-components";

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

export const Headshot = styled.img`
  width: ${pxToRem(300)};
  height: ${pxToRem(300)};
  border-radius: 50%;
  box-shadow: 0 ${pxToRem(3)} ${pxToRem(15)} ${({ theme }) => theme.blackOpaque};
  border: ${pxToRem(2)} solid ${({ theme }) => theme.accent};
  margin-bottom: ${pxToRem(20)};
`;
