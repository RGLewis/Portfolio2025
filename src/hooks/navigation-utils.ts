import { Slugs } from "@/types/content-types";

/**
 * Checks if a given hash string is a valid section slug
 * @param hash - The hash string from the URL (without the '#')
 * @returns True if the hash is a valid Slugs value
 */
export const isValidSectionSlug = (hash: string): hash is Slugs => {
  return (Object.values(Slugs) as string[]).includes(hash);
};

/**
 * Checks if we can scroll to a section based on hash and current pathname
 * @param hash - The hash string from the URL (without the '#')
 * @param pathname - The current pathname
 * @returns True if we're on the experience page and the hash is valid
 */
export const canScrollToSection = (
  hash: string,
  pathname: string
): hash is Slugs => {
  return pathname === "/experience" && isValidSectionSlug(hash);
};

type FormatRootMarginArgs = {
  top: string;
  right: string;
  bottom: string;
  left: string;
};

type CreateIntersectionObserverOptionsArgs = {
  topOffset: number;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
};

type CalculateScrollOffsetArgs = {
  isMobile: boolean;
  mobileHeaderHeight: number;
  breathingRoom: number;
};

type CalculateScrollPositionArgs = {
  element: HTMLElement;
  offset: number;
};

type CreateScrollEndHandlerArgs = {
  onScrollEnd: () => void;
  delay: number;
};

type SetupSectionObserverArgs = {
  sectionIds: string[];
  options: IntersectionObserverInit;
  callback: IntersectionObserverCallback;
};

/**
 * Formats rootMargin string for IntersectionObserver.
 * @param params - Margin parameters
 *  - top: Top margin (negative shrinks viewport from top)
 *  - right: Right margin
 *  - bottom: Bottom margin (negative shrinks viewport from bottom)
 *  - left: Left margin
 * @returns Formatted rootMargin string "top right bottom left"
 */
export const formatRootMargin = ({
  top,
  right,
  bottom,
  left,
}: FormatRootMarginArgs): string => {
  return `${top} ${right} ${bottom} ${left}`;
};

/**
 * Finds the topmost intersecting element from IntersectionObserver entries.
 * @param entries - Array of IntersectionObserverEntry objects
 * @returns The ID of the topmost intersecting element, or null if none intersecting
 */
export const findTopmostIntersectingSection = (
  entries: IntersectionObserverEntry[]
): string | null => {
  const intersecting = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => {
      return (
        a.target.getBoundingClientRect().top -
        b.target.getBoundingClientRect().top
      );
    });

  if (intersecting.length > 0) {
    return intersecting[0].target.id;
  }

  return null;
};

/**
 * Creates IntersectionObserver options with calculated rootMargin
 * @param params - Configuration parameters
 *  - topOffset: Offset from top in pixels
 *  - marginRight: Right margin string (e.g., "0px")
 *  - marginBottom: Bottom margin string (e.g., "-50%")
 *  - marginLeft: Left margin string (e.g., "0px")
 * @returns Configuration object
 */
export const createObserverOptions = ({
  topOffset,
  marginRight,
  marginBottom,
  marginLeft,
}: CreateIntersectionObserverOptionsArgs): IntersectionObserverInit => {
  return {
    rootMargin: formatRootMargin({
      top: `-${topOffset}px`,
      right: marginRight,
      bottom: marginBottom,
      left: marginLeft,
    }),
    threshold: 0,
  };
};

/**
 * Calculates scroll offset based on viewport type
 * @param params - Parameters
 *  - isMobile: Whether the viewport is mobile size
 *  - mobileHeaderHeight: Height of mobile header in pixels
 *  - breathingRoom: Additional spacing in pixels
 * @returns Total offset in pixels
 */
export const calculateScrollOffset = ({
  isMobile,
  mobileHeaderHeight,
  breathingRoom,
}: CalculateScrollOffsetArgs): number => {
  return isMobile ? mobileHeaderHeight + breathingRoom : breathingRoom;
};

/**
 * Calculates the scroll position for an element.
 * @param params - Parameters
 *  - element: The DOM element to scroll to
 *  - offset: Offset from top in pixels
 * @returns Scroll position in pixels
 */
export const calculateScrollPosition = ({
  element,
  offset,
}: CalculateScrollPositionArgs): number => {
  const elementTop = element.getBoundingClientRect().top + window.pageYOffset;

  return elementTop - offset;
};

/**
 * Creates a debounced scroll end handler.
 * @param params - Parameters
 *  - onScrollEnd: Callback to execute when scroll ends
 *  - delay: Debounce delay in milliseconds
 * @returns Cleanup function to remove event listener
 */
export const createScrollEndHandler = ({
  onScrollEnd,
  delay,
}: CreateScrollEndHandlerArgs): (() => void) => {
  let scrollEndTimer: NodeJS.Timeout;

  const handleScrollEnd = () => {
    if (scrollEndTimer) {
      clearTimeout(scrollEndTimer);
    }

    scrollEndTimer = setTimeout(() => {
      onScrollEnd();
      window.removeEventListener("scroll", handleScrollEnd);
    }, delay);
  };

  window.addEventListener("scroll", handleScrollEnd, { passive: true });

  return () => {
    if (scrollEndTimer) {
      clearTimeout(scrollEndTimer);
    }

    window.removeEventListener("scroll", handleScrollEnd);
  };
};

/**
 * Sets up an IntersectionObserver for tracking section visibility.
 * @param params - Parameters
 *  - sectionIds: Array of element IDs to observe
 *  - options: IntersectionObserver configuration options
 *  - callback: Callback function to handle intersection events
 * @returns Cleanup function to disconnect the observer
 */
export const setupSectionObserver = ({
  sectionIds,
  options,
  callback,
}: SetupSectionObserverArgs): (() => void) => {
  const observer = new IntersectionObserver(callback, options);

  sectionIds.forEach((id) => {
    const element = document.getElementById(id);

    if (element) {
      observer.observe(element);
    }
  });

  return () => {
    observer.disconnect();
  };
};
