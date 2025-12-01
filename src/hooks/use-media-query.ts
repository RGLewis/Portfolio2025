import { BREAKPOINTS } from "@/global-styles";
import { useEffect, useState } from "react";

/**
 * Custom hook that watches for media query changes and returns current match state.
 * Updates reactively when the viewport size changes.
 *
 * @param {string} query - CSS media query string (e.g., "(max-width: 768px)")
 * @returns {boolean} true if media query matches, false otherwise
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") {
      return false; // Server-side rendering fallback
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

/**
 * Hook to detect if viewport is desktop size (medium breakpoint and above)
 * @returns {boolean} true if viewport is >= medium breakpoint (768px)
 */
export const useIsDesktop = (): boolean => {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.medium})`);
};
