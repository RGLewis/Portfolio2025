import {
  baseLinkStyles,
  baseListStyles,
  baseTypographyStyles,
  device,
  focusVisible,
  peelUpAnimation,
  pxToRem,
  responsiveFontSize,
  SPACINGS,
  transition,
  underlineAnimation,
  underlinedHeading,
  ZIndexLevel,
} from "@/global-styles";
import { styled, type DefaultTheme } from "styled-components";
import { TypographyVariants } from "./types";

export const HeadingFirst = styled.h1<{ $variant: TypographyVariants }>`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  line-height: 1.4;
  font-size: ${pxToRem(40)};
  color: ${({ theme, $variant }) => theme[$variant]};
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
    ${underlinedHeading()}
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

export const HeadingSecond = styled.h2<{ $variant: TypographyVariants }>`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${pxToRem(30)};
  color: ${({ theme, $variant }) => theme[$variant]};
  padding: ${SPACINGS.xs} 0;
  text-transform: capitalize;
  letter-spacing: ${pxToRem(0.5)};

  &.underlined {
    ${underlinedHeading()}
  }

  @media ${device.large} {
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

export const HeadingThird = styled.h3<{ $variant: TypographyVariants }>`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.roboto};
  ${baseTypographyStyles()}
  text-transform: capitalize;
  letter-spacing: ${pxToRem(0.5)};
  ${responsiveFontSize({ base: 22, large: 24, extraLarge: 28 })}
`;

export const HeadingFourth = styled.h4<{ $variant: TypographyVariants }>`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  ${baseTypographyStyles()}
  letter-spacing: ${pxToRem(0.3)};
  ${responsiveFontSize({ base: 20, large: 24, extraLarge: 28 })}
`;

export const HeadingFifth = styled.h5<{ $variant: TypographyVariants }>`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  ${baseTypographyStyles()}
  letter-spacing: ${pxToRem(0.2)};
  ${responsiveFontSize({ base: 18, large: 20, extraLarge: 22 })}
`;

export const Body = styled.p<{ $variant: TypographyVariants }>`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.extraLight};
  font-size: ${pxToRem(14)};
  color: ${({ theme, $variant }) => theme[$variant]};
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

export const Link = styled.a<{ $variant: TypographyVariants }>`
  ${baseLinkStyles()}
  color: ${({ theme, $variant }) => theme[$variant]};
  padding: ${SPACINGS.xs};

  ${underlineAnimation(({ theme }) => theme.white, 2)}

  ${focusVisible({})};
`;

export const RichTextLink = styled.a<{ $variant: TypographyVariants }>`
  ${baseLinkStyles()}
  color: ${({ theme, $variant }) => theme[$variant]};
  padding: ${SPACINGS.xs};
  display: inline-block;
  isolation: isolate;

  &:hover {
    color: ${({ theme }) => theme.background};
    ${transition({
      attr: "color",
    })};
  }

  /* Static underline */
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: ${pxToRem(1)};
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.accent};
  }

  /* Peel-up background effect */
  ${peelUpAnimation(({ theme }) => theme.accent, ZIndexLevel.NEGATIVE)}

  ${focusVisible({
    outlineColor: ({ theme }: { theme: DefaultTheme }) => theme.accent,
  })};
`;

export const Slash = styled.p`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  margin: 0 ${SPACINGS.xs};
  cursor: auto;
  color: ${({ theme }) => theme.white};

  @media ${device.medium} {
    margin: 0 ${SPACINGS.sm};
  }
`;

export const UnorderedList = styled.ul<{ $variant: TypographyVariants }>`
  list-style-type: disc;
  ${baseListStyles()}
`;

export const OrderedList = styled.ol<{ $variant: TypographyVariants }>`
  list-style-type: decimal;
  ${baseListStyles()}
`;

export const ListItem = styled.li<{ $variant: TypographyVariants }>`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.extraLight};
  font-size: ${pxToRem(14)};
  color: ${({ theme, $variant }) => theme[$variant]};
  margin: ${SPACINGS.xs} 0;
  line-height: 1.6;

  @media ${device.large} {
    font-size: ${pxToRem(16)};
  }
`;
