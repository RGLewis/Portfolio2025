import { MOBILE_HEADER_HEIGHT, SPACINGS_UNITS } from "@/global-styles";
import { Slugs } from "@/types/content-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  calculateScrollOffset,
  calculateScrollPosition,
  canScrollToSection,
  createObserverOptions,
  createScrollEndHandler,
  findTopmostIntersectingSection,
  setupSectionObserver,
} from "./navigation-utils";
import { useIsDesktop } from "./use-media-query";

const SCROLL_BREATHING_ROOM = SPACINGS_UNITS.md;
const SCROLL_DEBOUNCE_DELAY = 100;

const OBSERVER_BOTTOM_THRESHOLD = "-50%";
const OBSERVER_HORIZONTAL_MARGIN = "0px";

const EXPERIENCE_SECTION_IDS = Object.values(Slugs);

const calculateTopOffset = (isDesktop: boolean): number => {
  return isDesktop
    ? SCROLL_BREATHING_ROOM
    : MOBILE_HEADER_HEIGHT + SCROLL_BREATHING_ROOM;
};

type UseNavigationOptions = {
  setActiveSection: (slug: Slugs | null) => void;
};

type UseNavigationReturn = {
  scrollToSection: (slug: Slugs) => void;
  navigateToSection: (slug: Slugs) => void;
};

/**
 * Custom hook for handling navigation within the page.
 * @param setActiveSection - Function to set the active section slug
 * @returns Object containing:
 *  - scrollToSection: Function to scroll to a section
 *  - navigateToSection: Function to navigate to a section
 */

export const useNavigation = ({
  setActiveSection,
}: UseNavigationOptions): UseNavigationReturn => {
  const isDesktop = useIsDesktop();
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollEndCleanupRef = useRef<(() => void) | null>(null);

  const cleanupPreviousScrollHandler = () => {
    if (scrollEndCleanupRef.current) {
      scrollEndCleanupRef.current();
      scrollEndCleanupRef.current = null;
    }
  };

  const performScroll = (element: HTMLElement, offset: number) => {
    const scrollPosition = calculateScrollPosition({ element, offset });

    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  const setupScrollEndHandler = () => {
    const cleanup = createScrollEndHandler({
      onScrollEnd: () => {
        setIsScrolling(false);
        scrollEndCleanupRef.current = null;
      },
      delay: SCROLL_DEBOUNCE_DELAY,
    });

    scrollEndCleanupRef.current = cleanup;
  };

  const scrollToSection = useCallback(
    (slug: Slugs) => {
      const element = document.getElementById(slug);

      if (!element) {
        return;
      }

      cleanupPreviousScrollHandler();

      setIsScrolling(true);
      setActiveSection(slug);

      const offset = calculateScrollOffset({
        isMobile: !isDesktop,
        mobileHeaderHeight: MOBILE_HEADER_HEIGHT,
        breathingRoom: SCROLL_BREATHING_ROOM,
      });

      performScroll(element, offset);
      setupScrollEndHandler();
    },
    [isDesktop, setActiveSection]
  );

  const navigateToSection = useCallback(
    (slug: Slugs) => {
      const isOnExperiencePage = location.pathname === "/experience";

      if (isOnExperiencePage) {
        window.history.pushState(null, "", `#${slug}`);
        scrollToSection(slug);
      } else {
        navigate(`/experience#${slug}`);
      }
    },
    [location.pathname, navigate, scrollToSection]
  );

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return;

      const activeSectionId = findTopmostIntersectingSection(entries);
      if (activeSectionId) {
        setActiveSection(activeSectionId as Slugs);
      }
    },
    [isScrolling, setActiveSection]
  );

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (canScrollToSection(hash, location.pathname)) {
      scrollToSection(hash);
    }
  }, [location.pathname, scrollToSection]);

  useEffect(() => {
    if (location.pathname !== "/experience") {
      return;
    }

    const topOffset = calculateTopOffset(isDesktop);

    const observerOptions = createObserverOptions({
      topOffset,
      marginRight: OBSERVER_HORIZONTAL_MARGIN,
      marginBottom: OBSERVER_BOTTOM_THRESHOLD,
      marginLeft: OBSERVER_HORIZONTAL_MARGIN,
    });

    return setupSectionObserver({
      sectionIds: EXPERIENCE_SECTION_IDS,
      options: observerOptions,
      callback: handleIntersection,
    });
  }, [handleIntersection, isDesktop, location.pathname]);

  useEffect(() => {
    return () => {
      cleanupPreviousScrollHandler();
    };
  }, []);

  return {
    scrollToSection,
    navigateToSection,
  };
};
