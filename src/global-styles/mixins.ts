import type { DefaultTheme } from "styled-components";
import { css } from "styled-components";
import { GLOBAL_COLOR_MAPPINGS, SPACINGS } from "./constants";
import { EasingTypes, OutlineOffsetTypes, type ThemeColors } from "./types";
import { pxToRem } from "./utils";
import { ZIndexLevel, getZIndexValue } from "./z-index-utils";

type TransitionArgTypes = {
  attr: string;
  speed?: string;
  easing?: EasingTypes | string;
  delay?: string;
};

type FocusVisibleTypes = {
  outlineColor?:
    | ThemeColors[keyof ThemeColors]
    | ((props: { theme: DefaultTheme }) => string);
  outlineOffset?: OutlineOffsetTypes;
};

type ThemeColorsFunction = (props: { theme: DefaultTheme }) => string;

/**
 * Generates border radius styles.
 * @param borderRadius - Border radius in pixels
 */
export const borderRadius = (borderRadius: number) => `
border-radius: ${pxToRem(borderRadius)};
-webkit-border-radius: ${pxToRem(borderRadius)};
-moz-border-radius: ${pxToRem(borderRadius)};
`;

/**
 * Generates transition styles.
 * @param attr - CSS attribute(s) to apply the transition to
 * @param speed - Duration of the transition (default: "300ms")
 * @param easing - Easing function for the transition (default: "ease-in-out")
 * @param delay - Delay before the transition starts (default: "0s")
 */
export const transition = ({
  attr,
  speed = "300ms",
  easing = EasingTypes.EASE_IN_OUT,
  delay = "0s",
}: TransitionArgTypes) => `
  -webkit-transition: ${attr} ${speed} ${easing} ${delay};
  -moz-transition: ${attr} ${speed} ${easing} ${delay};
  -o-transition: ${attr} ${speed} ${easing} ${delay};
  transition: ${attr} ${speed} ${easing} ${delay};
`;

/**
 * Generates focus-visible styles.
 * @param outlineColor - Outline color (default: white)
 * @param outlineOffset - Outline offset (default: 2)
 */
export const focusVisible = ({
  outlineColor = GLOBAL_COLOR_MAPPINGS.white,
  outlineOffset = OutlineOffsetTypes.DEFAULT,
}: FocusVisibleTypes) => {
  return css`
    &:focus-visible {
      outline: 1px solid;
      outline-color: ${outlineColor};
      outline-offset: ${outlineOffset === OutlineOffsetTypes.LARGE
        ? SPACINGS.xs
        : 2};
    }
  `;
};

/**
 * Generates height animation styles.
 * @param isExpanded - Whether the element is expanded or collapsed
 * @param duration - Duration of the animation (default: "500ms")
 * @param easing - Easing function for the animation (default: "cubic-bezier(0.4, 0, 0.2, 1)")
 */
export const heightAnimation = (
  isExpanded: boolean,
  duration: string = "500ms",
  easing: string = "cubic-bezier(0.4, 0, 0.2, 1)"
) => `
  display: grid;
  grid-template-rows: ${isExpanded ? "1fr" : "0fr"};
  overflow: hidden;
  transition: grid-template-rows ${duration} ${easing};
  
  > * {
    min-height: 0;
  }
`;

/**
 * Base link styles shared across link components
 */
export const baseLinkStyles = () => `
  font-family: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.roboto};
  font-weight: ${({ theme }: { theme: DefaultTheme }) =>
    theme.fontWeights.light};
  position: relative;
  text-decoration: none;
`;

/**
 * Peel-up hover effect - background fills from bottom to top
 * @param backgroundColor - Color function that returns the background color from theme
 * @param zIndexLevel - Z-index level from ZIndexLevel enum (default: NEGATIVE)
 */
export const peelUpEffect = (
  backgroundColor: ThemeColorsFunction,
  zIndexLevel: ZIndexLevel = ZIndexLevel.NEGATIVE
) => {
  const zIndex = getZIndexValue(zIndexLevel);

  return css`
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0%;
      background-color: ${backgroundColor};
      ${transition({
        attr: "height",
      })}
      z-index: ${zIndex};
    }

    &:hover::before {
      height: 100%;
    }
  `;
};

/**
 * Underline animation - scales in from left on hover
 * @param underlineColor - Color function that returns the underline color from theme
 * @param thickness - Thickness of the underline in pixels (default: 2)
 */
export const underlineAnimation = (
  underlineColor: ThemeColorsFunction,
  thickness: number = 2
) => {
  return css`
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: ${pxToRem(thickness)};
      bottom: 0;
      left: 0;
      background-color: ${underlineColor};
      transform: scaleX(0);
      transform-origin: left;
      ${transition({
        attr: "transform",
      })}
    }

    &:hover::before {
      transform: scaleX(1);
    }
  `;
};

/**
 * Base typography styles - color and padding
 */
export const baseTypographyStyles = () => `
  color: ${({ theme, $variant }: { theme: DefaultTheme; $variant: string }) =>
    theme[$variant as keyof DefaultTheme]};
  padding: ${SPACINGS.xs} 0;
`;

/**
 * Responsive font sizing with media queries
 * @param sizes - Object with base, large, and extraLarge font sizes in pixels
 */
export const responsiveFontSize = (sizes: {
  base: number;
  large: number;
  extraLarge: number;
}) => `
  font-size: ${pxToRem(sizes.base)};

  @media ${({ theme }: { theme: DefaultTheme }) =>
    `(min-width: ${theme.breakpoints.large})`} {
    font-size: ${pxToRem(sizes.large)};
  }

  @media ${({ theme }: { theme: DefaultTheme }) =>
    `(min-width: ${theme.breakpoints.extraLarge})`} {
    font-size: ${pxToRem(sizes.extraLarge)};
  }
`;

/**
 * Base list styles shared across ordered and unordered lists
 */
export const baseListStyles = () => `
  padding-left: ${SPACINGS.lg};
  margin: ${SPACINGS.md} 0;
  color: ${({ theme, $variant }: { theme: DefaultTheme; $variant: string }) =>
    theme[$variant as keyof DefaultTheme]};

  li::marker {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.accent};
  }
`;

/**
 * Underlined heading modifier
 * @param padding - Padding value from SPACINGS (default: SPACINGS.sm)
 */
export const underlinedHeading = (
  padding: (typeof SPACINGS)[keyof typeof SPACINGS] = SPACINGS.sm
) => `
  padding: ${padding} 0;
  border-bottom: ${pxToRem(1)} solid ${({ theme }: { theme: DefaultTheme }) =>
  theme.accent};
`;
