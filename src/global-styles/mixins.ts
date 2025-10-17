import { GLOBAL_COLOR_MAPPINGS, SPACINGS } from "./constants";
import type { ThemeColors } from "./types";
import { pxToRem } from "./utils";

export const borderRadius = (borderRadius: number) => `
border-radius: ${pxToRem(borderRadius)};
-webkit-border-radius: ${pxToRem(borderRadius)};
-moz-border-radius: ${pxToRem(borderRadius)};
`;

export enum EasingTypes {
  EASE_IN_OUT = "ease-in-out",
  EASE = "ease",
}

type TransitionArgTypes = {
  attr: string;
  speed?: string;
  easing?: string;
  delay?: string;
};

export enum OutlineOffsetTypes {
  LARGE = "large",
  DEFAULT = "default",
}

type FocusVisibleTypes = {
  outlineColor?: ThemeColors[keyof ThemeColors];
  outlineOffset?: OutlineOffsetTypes;
};

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

export const focusVisible = ({
  outlineColor = GLOBAL_COLOR_MAPPINGS.white,
  outlineOffset = OutlineOffsetTypes.DEFAULT,
}: FocusVisibleTypes) => `
  &:focus-visible {
    outline: 1px solid;
    outline-color: ${outlineColor};
    outline-offset: ${
      outlineOffset === OutlineOffsetTypes.LARGE ? SPACINGS.xs : 2
    };
  }
`;

export const heightAnimation = (
  isExpanded: boolean,
  duration = "500ms",
  easing = "cubic-bezier(0.4, 0, 0.2, 1)"
) => `
  display: grid;
  grid-template-rows: ${isExpanded ? "1fr" : "0fr"};
  overflow: hidden;
  transition: grid-template-rows ${duration} ${easing};
  
  > * {
    min-height: 0;
  }
`;
