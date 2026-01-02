import type { ThemeColors } from "@/global-styles";
import { useIconSize } from "@/hooks/use-icon-size";
import React from "react";
import { useTheme } from "styled-components";
import { IconButton } from "./styles";

type ExpandCollapseButtonProps = {
  isExpanded: boolean;
  ariaLabel: string;
  onClick: () => void;
  color?: ThemeColors[keyof ThemeColors];
  dataTestId: string;
  ariaControls?: string;
};

export const ExpandCollapseButton: React.FC<ExpandCollapseButtonProps> = ({
  isExpanded,
  ariaLabel,
  onClick,
  color,
  dataTestId,
  ariaControls,
}) => {
  const { iconSize, iconWeight } = useIconSize();
  const theme = useTheme();
  const buttonColor = color || theme.white;

  return (
    <IconButton
      onClick={onClick}
      $isExpanded={isExpanded}
      aria-label={ariaLabel}
      $iconSize={iconSize}
      $iconWeight={iconWeight}
      $color={buttonColor}
      aria-expanded={isExpanded}
      data-testid={dataTestId}
      aria-controls={ariaControls}
    />
  );
};
