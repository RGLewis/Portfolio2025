import { BREAKPOINTS } from "@/global-styles";
import { IconSizes, IconWeights } from "./types";
import { useMediaQuery } from "./use-media-query";

/**
 * Custom hook that returns responsive icon size based on current viewport.
 * Updates reactively when the viewport size changes.
 *
 * @returns {{ iconSize: IconSizes, iconWeight: IconWeights}} responsive icon dimensions
 *
 */
export const useIconSize = (): {
  iconSize: IconSizes;
  iconWeight: IconWeights;
} => {
  const isLargeScreen = useMediaQuery(`(min-width: ${BREAKPOINTS.large})`);

  return {
    iconSize: isLargeScreen ? IconSizes.LARGE : IconSizes.MEDIUM,
    iconWeight: isLargeScreen ? IconWeights.THICK : IconWeights.THIN,
  };
};
