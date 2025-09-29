import { useIconSize } from "@/hooks/use-icon-size";
import React from "react";
import { IconButton } from "./nav.styles";

type ExpandCollapseButtonProps = {
  isExpanded: boolean;
  ariaLabel: string;
  onClick: () => void;
};

export const ExpandCollapseButton: React.FC<ExpandCollapseButtonProps> = ({
  isExpanded,
  ariaLabel,
  onClick,
}) => {
  const { iconSize, iconWeight } = useIconSize();

  return (
    <IconButton
      onClick={onClick}
      isExpanded={isExpanded}
      aria-label={ariaLabel}
      iconSize={iconSize}
      iconWeight={iconWeight}
    />
  );
};
