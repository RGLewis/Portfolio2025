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
  return (
    <IconButton
      onClick={onClick}
      isExpanded={isExpanded}
      aria-label={ariaLabel}
    />
  );
};
