import { focusVisible, pxToRem, SPACINGS } from "@/global-styles";
import React from "react";
import styled from "styled-components";

const ICON_SIZE = 40;
const ICON_WEIGHT = 3;

const Button = styled.button<{ isExpanded: boolean }>`
  background: none;
  border: none;
  padding: ${SPACINGS.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  border-radius: ${pxToRem(4)};
  width: ${pxToRem(ICON_SIZE)};
  height: ${pxToRem(ICON_SIZE)};
  position: relative;

  ${focusVisible()}

  &:hover {
    background-color: ${({ theme }) => theme.blackOpaque};
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: currentColor;
    transition: all 0.3s ease;
  }

  /* Horizontal line (always visible) */
  &::before {
    width: ${pxToRem(ICON_SIZE / 2)};
    height: ${pxToRem(ICON_WEIGHT)};
  }

  /* Vertical line (rotates to become invisible when expanded) */
  &::after {
    width: ${pxToRem(ICON_WEIGHT)};
    height: ${pxToRem(ICON_SIZE / 2)};
    transform: ${({ isExpanded }) =>
      isExpanded ? "rotate(90deg) scale(0)" : "rotate(0deg) scale(1)"};
    opacity: ${({ isExpanded }) => (isExpanded ? 0 : 1)};
  }
`;

export interface ExpandCollapseButtonProps {
  isExpanded: boolean;
  ariaLabel: string;
  onClick?: () => void;
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
