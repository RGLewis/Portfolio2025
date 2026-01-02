import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component that scrolls to top on route changes, except when navigating to hash links.
 * This ensures each new page starts at the top, while preserving scroll-to-section behavior.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};
