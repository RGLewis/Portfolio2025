import { device, pxToRem } from "@/global-styles";
import { styled } from "styled-components";
import { HeadingVariant } from "./types";

export const StyledHeadingFirst = styled.h1<{ variant: HeadingVariant }>`
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  line-height: 1.4;
  font-size: ${pxToRem(40)};
  color: ${({ theme, variant }) => theme[variant]};
  text-transform: capitalize;
  padding-bottom: 0;
  border-bottom: ${pxToRem(1)} solid transparent;
  text-align: center;

  &.page-heading {
    text-transform: uppercase;
    letter-spacing: ${pxToRem(2)};
    text-align: left;
    margin-top: ${pxToRem(-35)};
    text-shadow: ${({ theme }) =>
      `${pxToRem(0)} ${pxToRem(5)} ${pxToRem(30)} ${theme.black}`};
  }

  &.underlined {
    padding-left: ${pxToRem(10)};
    padding-right: ${pxToRem(10)};
    border-bottom-color: ${({ theme }) => theme.accent};
  }

  @media ${device.medium} {
    font-size: ${pxToRem(55)};

    &.page-heading {
      margin-top: ${pxToRem(-45)};
    }
  }

  @media ${device.large} {
    font-size: ${pxToRem(50)};

    &.page-heading {
      font-size: ${pxToRem(60)};
      margin-top: ${pxToRem(-50)};
    }
  }

  @media ${device.extraLarge} {
    font-size: ${pxToRem(70)};

    &.page-heading {
      font-size: ${pxToRem(80)};
      margin-top: ${pxToRem(-70)};
    }
  }
`;

export const StyledHeadingThird = styled.h3<{ variant: HeadingVariant }>`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${pxToRem(20)};
  color: ${({ theme, variant }) => theme[variant]};
  padding: ${pxToRem(5)} 0;
  text-transform: capitalize;
  letter-spacing: ${pxToRem(0.5)};

  @media ${device.large} {
    font-size: ${pxToRem(25)};
  }

  @media ${device.extraLarge} {
    font-size: ${pxToRem(30)};
  }
`;
