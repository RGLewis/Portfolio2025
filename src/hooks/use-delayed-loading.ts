import { useEffect, useState } from "react";

/**
 * Delay in milliseconds before showing loader to prevent flash on fast loads
 */
export const LOADER_DELAY = 300;

/**
 * Hook to delay showing loading state to prevent flash of loader for fast requests
 * @param isLoading - Whether data is currently loading
 * @returns Whether to show the loading state
 */
export const useDelayedLoading = (isLoading: boolean): boolean => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowLoading(true);
    }, LOADER_DELAY);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return showLoading;
};
