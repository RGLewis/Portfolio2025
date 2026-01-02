import type { DefaultTheme } from "styled-components";
import { css } from "styled-components";
import { device } from "./breakpoints";
import { COLORS, SPACINGS } from "./constants";
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
 * @example
 * ```tsx
 * borderRadius(8) // applies 8px border radius
 * ```
 */
export const borderRadius = (borderRadius: number) => css`
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
 * @example
 * ```tsx
 * transition({ attr: "opacity", speed: "500ms", easing: EasingTypes.EASE, delay: "100ms" })
 * ```
 */
export const transition = ({
  attr,
  speed = "300ms",
  easing = EasingTypes.EASE_IN_OUT,
  delay = "0s",
}: TransitionArgTypes) => css`
  -webkit-transition: ${attr} ${speed} ${easing} ${delay};
  -moz-transition: ${attr} ${speed} ${easing} ${delay};
  -o-transition: ${attr} ${speed} ${easing} ${delay};
  transition: ${attr} ${speed} ${easing} ${delay};
`;

/**
 * Generates focus-visible styles.
 * @param outlineColor - Outline color (default: white)
 * @param outlineOffset - Outline offset (default: 2)
 * @example
 * ```tsx
 * focusVisible({ outlineColor: ({ theme }) => theme.accent, outlineOffset: OutlineOffsetTypes.LARGE })
 * ```
 */
export const focusVisible = ({
  outlineColor = COLORS.white,
  outlineOffset = OutlineOffsetTypes.DEFAULT,
}: FocusVisibleTypes) => {
  return css`
    &:focus-visible {
      outline: ${pxToRem(1)} solid;
      outline-color: ${outlineColor};
      outline-offset: ${outlineOffset === OutlineOffsetTypes.LARGE
        ? SPACINGS.xs
        : pxToRem(2)};
    }
  `;
};

/**
 * Generates height animation styles.
 * @param isExpanded - Whether the element is expanded or collapsed
 * @param duration - Duration of the animation (default: "500ms")
 * @param easing - Easing function for the animation (default: "cubic-bezier(0.4, 0, 0.2, 1)")
 * @example
 * ```tsx
 * heightAnimation(true, "400ms", EasingTypes.EASE)
 * ```
 */
export const heightAnimation = (
  isExpanded: boolean,
  duration: string = "500ms",
  easing: string = "cubic-bezier(0.4, 0, 0.2, 1)"
) => css`
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
export const baseLinkStyles = () => css`
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
 * @example
 * ```tsx
 * peelUpAnimation(({ theme }) => theme.accent, ZIndexLevel.NEGATIVE)
 * ```
 */
export const peelUpAnimation = (
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
 * @example
 * ```tsx
 * underlineAnimation(({ theme }) => theme.white, 2)
 * ```
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
export const baseTypographyStyles = () => css<{ $variant: string }>`
  color: ${({ theme, $variant }) => theme[$variant as keyof DefaultTheme]};
  padding: ${SPACINGS.xs} 0;
`;

/**
 * Responsive font sizing with media queries
 * @param sizes - Object with font sizes
 *  - base: Base font size in pixels
 *  - large: Large breakpoint font size in pixels
 *  - extraLarge: Extra large breakpoint font size in pixels
 * @example
 * ```tsx
 * responsiveFontSize({ base: 16, large: 20, extraLarge: 24 })
 * ```
 */
export const responsiveFontSize = (sizes: {
  base: number;
  large: number;
  extraLarge: number;
}) => css`
  font-size: ${pxToRem(sizes.base)};

  @media ${device.large} {
    font-size: ${pxToRem(sizes.large)};
  }

  @media ${device.extraLarge} {
    font-size: ${pxToRem(sizes.extraLarge)};
  }
`;

/**
 * Base list styles shared across ordered and unordered lists
 */
export const baseListStyles = () => css<{ $variant: string }>`
  padding-left: ${SPACINGS.lg};
  margin: ${SPACINGS.md} 0;
  color: ${({ theme, $variant }) => theme[$variant as keyof DefaultTheme]};

  li::marker {
    color: ${({ theme }) => theme.accent};
  }
`;

/**
 * Underlined heading modifier
 * @param padding - Padding value from SPACINGS (default: SPACINGS.sm)
 */
export const underlinedHeading = (
  padding: (typeof SPACINGS)[keyof typeof SPACINGS] = SPACINGS.sm
) => css`
  padding: ${padding} 0;
  border-bottom: ${pxToRem(1)} solid
    ${({ theme }: { theme: DefaultTheme }) => theme.accent};
`;
