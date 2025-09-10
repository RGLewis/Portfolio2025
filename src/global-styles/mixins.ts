import { pxToRem } from "./utils";

export const borderRadius = (borderRadius: number) => `
border-radius: ${pxToRem(borderRadius)};
-webkit-border-radius: ${pxToRem(borderRadius)};
-moz-border-radius: ${pxToRem(borderRadius)};
`;

type TransitionArgTypes = {
  attr: string;
  speed: string;
  easing: string;
  delay: string;
};
export const transition = ({
  attr,
  speed,
  easing,
  delay,
}: TransitionArgTypes) => `
  -webkit-transition: ${attr} ${speed} ${easing} ${delay};
  -moz-transition: ${attr} ${speed} ${easing} ${delay};
  -o-transition: ${attr} ${speed} ${easing} ${delay};
  transition: ${attr} ${speed} ${easing} ${delay};
`;

export const focusVisible = (outlineColor?: string) => `
  &:focus-visible {
    outline: 1px solid;
    outline-color: ${outlineColor || "${({ theme }: any) => theme.white}"};
    outline-offset: 1px;
    background-color: ${({ theme }: any) => theme.blackOpaque};
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
