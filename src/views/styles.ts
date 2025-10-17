import { device, pxToRem } from "@/global-styles";
import { styled } from "styled-components";

export const PageContainer = styled.div`
  min-height: 100%;
  padding: ${pxToRem(20)};
  width: 100%;
  max-width: ${pxToRem(1600)};
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  &.center-align {
    align-items: center;
  }

  &.center-justify {
    justify-content: center;
  }

  &.inner-page {
    width: 90%;

    @media ${device.large} {
      width: 70%;
    }
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
