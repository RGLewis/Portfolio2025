import {
  device,
  focusVisible,
  pxToRem,
  SPACINGS,
  transition,
} from "@/global-styles";
import { styled } from "styled-components";
import { TypographyVariants } from "./types";

export const StyledHeadingFirst = styled.h1<{ variant: TypographyVariants }>`
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
    margin-top: ${pxToRem(-55)};
    text-shadow: ${({ theme }) =>
      `${pxToRem(0)} ${pxToRem(5)} ${pxToRem(30)} ${theme.black}`};
  }

  &.underlined {
    padding: ${SPACINGS.sm} 0;
    border-bottom-color: ${({ theme }) => theme.accent};
  }

  @media ${device.medium} {
    font-size: ${pxToRem(55)};

    &.page-heading {
      margin-top: ${pxToRem(-85)};
    }
  }

  @media ${device.large} {
    font-size: ${pxToRem(50)};

    &.page-heading {
      font-size: ${pxToRem(60)};
      margin-top: ${pxToRem(-90)};
    }
  }

  @media ${device.extraLarge} {
    font-size: ${pxToRem(70)};

    &.page-heading {
      font-size: ${pxToRem(80)};
      margin-top: ${pxToRem(-110)};
    }
  }
`;

export const StyledHeadingSecond = styled.h2<{ variant: TypographyVariants }>`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${pxToRem(30)};
  color: ${({ theme, variant }) => theme[variant]};
  padding: ${SPACINGS.xs} 0;
  text-transform: capitalize;
  letter-spacing: ${pxToRem(0.5)};

  &.underlined {
    padding: ${SPACINGS.sm} 0;
    border-bottom: ${pxToRem(1)} solid ${({ theme }) => theme.accent};
  }

  @media ${device.large} {
    font-size: ${pxToRem(16)};

    &.large {
      font-size: ${pxToRem(36)};
    }
  }

  @media ${device.extraLarge} {
    font-size: ${pxToRem(50)};

    &.large {
      font-size: ${pxToRem(56)};
    }
  }
`;

export const StyledHeadingThird = styled.h3<{ variant: TypographyVariants }>`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-size: ${pxToRem(22)};
  color: ${({ theme, variant }) => theme[variant]};
  padding: ${SPACINGS.xs} 0;
  text-transform: capitalize;
  letter-spacing: ${pxToRem(0.5)};

  @media ${device.large} {
    font-size: ${pxToRem(24)};
  }

  @media ${device.extraLarge} {
    font-size: ${pxToRem(28)};
  }
`;

export const StyledHeadingFourth = styled.h4<{ variant: TypographyVariants }>`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: ${pxToRem(20)};
  color: ${({ theme, variant }) => theme[variant]};
  padding: ${SPACINGS.xs} 0;
  letter-spacing: ${pxToRem(0.3)};

  @media ${device.large} {
    font-size: ${pxToRem(24)};
  }

  @media ${device.extraLarge} {
    font-size: ${pxToRem(28)};
  }
`;

export const StyledHeadingFifth = styled.h5<{ variant: TypographyVariants }>`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: ${pxToRem(18)};
  color: ${({ theme, variant }) => theme[variant]};
  padding: ${SPACINGS.xs} 0;
  letter-spacing: ${pxToRem(0.2)};

  @media ${device.large} {
    font-size: ${pxToRem(20)};
  }

  @media ${device.extraLarge} {
    font-size: ${pxToRem(22)};
  }
`;

export const StyledBody = styled.p<{ variant: TypographyVariants }>`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.extraLight};
  font-size: ${pxToRem(14)};
  color: ${({ theme, variant }) => theme[variant]};
  margin-bottom: ${SPACINGS.md};

  &.bold {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  &.small {
    font-size: ${pxToRem(12)};
  }

  &.large {
    font-size: ${pxToRem(18)};
  }

  @media ${device.large} {
    font-size: ${pxToRem(16)};

    &.large {
      font-size: ${pxToRem(20)};
    }
  }
`;

export const StyledLink = styled.a<{ variant: TypographyVariants }>`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  color: ${({ theme, variant }) => theme[variant]};
  position: relative;
  padding: ${SPACINGS.xs};

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: ${pxToRem(2)};
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.white};
    transform: scaleX(0);
    transform-origin: left;
    ${transition({
      attr: "transform",
    })};
  }

  ${focusVisible({})};

  &:hover::before {
    transform: scaleX(1);
  }
`;

export const StyledSlash = styled.p`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  margin: 0 ${SPACINGS.xs};
  cursor: auto;
  color: ${({ theme }) => theme.white};

  @media ${device.medium} {
    margin: 0 ${SPACINGS.sm};
  }
`;

export const StyledUnorderedList = styled.ul<{ variant: TypographyVariants }>`
  list-style-type: disc;
  padding-left: ${SPACINGS.lg};
  margin: ${SPACINGS.md} 0;
  color: ${({ theme, variant }) => theme[variant]};

  li::marker {
    color: ${({ theme }) => theme.accent};
  }
`;

export const StyledOrderedList = styled.ol<{ variant: TypographyVariants }>`
  list-style-type: decimal;
  padding-left: ${SPACINGS.lg};
  margin: ${SPACINGS.md} 0;
  color: ${({ theme, variant }) => theme[variant]};

  li::marker {
    color: ${({ theme }) => theme.accent};
  }
`;

export const StyledListItem = styled.li<{ variant: TypographyVariants }>`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.extraLight};
  font-size: ${pxToRem(14)};
  color: ${({ theme, variant }) => theme[variant]};
  margin: ${SPACINGS.xs} 0;
  line-height: 1.6;

  @media ${device.large} {
    font-size: ${pxToRem(16)};
  }
`;
