import { BREAKPOINTS } from "@/global-styles";
import { IconSize, IconWeight } from "./types";
import { useMediaQuery } from "./use-media-query";

type UseIconSizeReturn = {
  iconSize: IconSize;
  iconWeight: IconWeight;
};

/**
 * Custom hook that returns responsive icon size based on current viewport.
 * Updates reactively when the viewport size changes.
 * @returns Object containing:
 *  - iconSize: Size of the icon (LARGE or MEDIUM)
 *  - iconWeight: Weight of the icon (THICK or THIN)
 * @example
 * ```tsx
 * const { iconSize, iconWeight } = useIconSize();
 * ```
 */
export const useIconSize = (): UseIconSizeReturn => {
  const isLargeScreen = useMediaQuery(`(min-width: ${BREAKPOINTS.large})`);

  return {
    iconSize: isLargeScreen ? IconSize.LARGE : IconSize.MEDIUM,
    iconWeight: isLargeScreen ? IconWeight.THICK : IconWeight.THIN,
  };
};
