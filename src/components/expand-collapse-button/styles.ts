import {
  EasingTypes,
  pxToRem,
  SPACINGS,
  transition,
  type ThemeColors,
} from "@/global-styles";
import type { IconSizes, IconWeights } from "@/hooks/types";
import styled from "styled-components";

export const IconButton = styled.button<{
  $isExpanded: boolean;
  $iconSize: IconSizes;
  $iconWeight: IconWeights;
  $color?: ThemeColors[keyof ThemeColors];
}>`
  background: none;
  border: none;
  padding: ${SPACINGS.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  border-radius: ${pxToRem(4)};
  width: ${({ $iconSize }) => pxToRem($iconSize)};
  height: ${({ $iconSize }) => pxToRem($iconSize)};
  position: relative;
  ${transition({
    attr: "color, transform",
  })}

  /* Custom focus-visible with dynamic color */
  &:focus-visible {
    outline: 1px solid;
    outline-color: ${({ theme, $color }) => $color || theme.white};
    outline-offset: 2px;
  }

  &:hover {
    transform: scale(1.1);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: currentColor;
    ${transition({
      attr: "all",
      easing: EasingTypes.EASE,
    })}
  }

  &::before {
    width: ${({ $iconSize }) => pxToRem($iconSize / 2)};
    height: ${({ $iconWeight }) => pxToRem($iconWeight)};
    color: ${({ theme, $color }) => $color || theme.white};
  }

  &::after {
    width: ${({ $iconWeight }) => pxToRem($iconWeight)};
    height: ${({ $iconSize }) => pxToRem($iconSize / 2)};
    color: ${({ theme, $color }) => $color || theme.white};
    transform: ${({ $isExpanded }) =>
      $isExpanded ? "rotate(90deg) scale(0)" : "rotate(0deg) scale(1)"};
    opacity: ${({ $isExpanded }) => ($isExpanded ? 0 : 1)};
  }
`;
