import type { ThemeColors } from "@/global-styles";
import { useIconSize } from "@/hooks/use-icon-size";
import React from "react";
import { IconButton } from "./styles";

type ExpandCollapseButtonProps = {
  isExpanded: boolean;
  ariaLabel: string;
  onClick: () => void;
  color?: ThemeColors[keyof ThemeColors];
  dataTestId: string;
};

export const ExpandCollapseButton: React.FC<ExpandCollapseButtonProps> = ({
  isExpanded,
  ariaLabel,
  onClick,
  color,
  dataTestId,
}) => {
  const { iconSize, iconWeight } = useIconSize();

  return (
    <IconButton
      onClick={onClick}
      $isExpanded={isExpanded}
      aria-label={ariaLabel}
      $iconSize={iconSize}
      $iconWeight={iconWeight}
      $color={color}
      aria-expanded={isExpanded}
      data-testid={dataTestId}
    />
  );
};
