import {
  EasingTypes,
  focusVisible,
  pxToRem,
  SPACINGS,
  transition,
} from "@/global-styles";
import React from "react";
import styled from "styled-components";

const ICON_SIZE = 40;
const ICON_WEIGHT = 3;

const Button = styled.button<{ isExpanded: boolean }>`
  background: none;
  // color: ${({ theme }) => theme.white};
  border: none;
  padding: ${SPACINGS.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  border-radius: ${pxToRem(4)};
  width: ${pxToRem(ICON_SIZE)};
  height: ${pxToRem(ICON_SIZE)};
  position: relative;
  ${transition({
    attr: "color, transform",
  })}

  ${focusVisible({})}

  /* Subtle scale effect for button interactivity */
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

  /* Horizontal line (always visible) */
  &::before {
    width: ${pxToRem(ICON_SIZE / 2)};
    height: ${pxToRem(ICON_WEIGHT)};
    color: ${({ theme }) => theme.white};
  }

  /* Vertical line (rotates to become invisible when expanded) */
  &::after {
    width: ${pxToRem(ICON_WEIGHT)};
    height: ${pxToRem(ICON_SIZE / 2)};
    color: ${({ theme }) => theme.white};
    transform: ${({ isExpanded }) =>
      isExpanded ? "rotate(90deg) scale(0)" : "rotate(0deg) scale(1)"};
    opacity: ${({ isExpanded }) => (isExpanded ? 0 : 1)};
  }
`;

export interface ExpandCollapseButtonProps {
  isExpanded: boolean;
  ariaLabel: string;
  onClick: () => void;
}

export const ExpandCollapseButton: React.FC<ExpandCollapseButtonProps> = ({
  isExpanded,
  ariaLabel,
  onClick,
}) => {
  return (
    <Button onClick={onClick} isExpanded={isExpanded} aria-label={ariaLabel} />
  );
};
