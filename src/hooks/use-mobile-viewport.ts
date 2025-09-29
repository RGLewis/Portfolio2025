import { BREAKPOINTS } from "@/global-styles";
import { useMediaQuery } from "./use-media-query";

/**
 * Custom hook that watches for mobile viewport changes.
 * Returns true when viewport is mobile size (768px and below).
 * Updates reactively when the viewport size changes.
 *
 * @returns {boolean} true if mobile viewport, false otherwise
 */
export const useMobileViewport = (): boolean => {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.medium})`);
};
