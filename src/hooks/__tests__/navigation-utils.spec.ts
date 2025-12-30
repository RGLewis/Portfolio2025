import { MOBILE_HEADER_HEIGHT, SPACINGS_UNITS } from "@/global-styles";
import { Slugs } from "@/types/content-types";
import {
  calculateScrollOffset,
  calculateScrollPosition,
  canScrollToSection,
  createObserverOptions,
  createScrollEndHandler,
  findTopmostIntersectingSection,
  formatRootMargin,
  isValidSectionSlug,
  setupSectionObserver,
} from "../navigation-utils";

const TEST_CONSTANTS = {
  mobileHeaderHeight: MOBILE_HEADER_HEIGHT,
  breathingRoom: SPACINGS_UNITS.md,
  scrollDelay: 100,
  topOffset: 80,
  marginRight: "0px",
  marginBottom: "-50%",
  marginLeft: "0px",
  validSlugs: Object.values(Slugs),
  invalidSlugs: ["invalid", "test", "", "profile-invalid"],
  experiencePath: "/experience",
  homePath: "/",
};

const createMockElement = (id: string, top: number = 100): HTMLElement => {
  const element = document.createElement("div");
  element.id = id;

  element.getBoundingClientRect = jest.fn().mockReturnValue({ top });

  return element;
};

describe("navigation-utils", () => {
  beforeEach(() => {
    Object.defineProperty(window, "pageYOffset", {
      value: 0,
      writable: true,
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    Reflect.deleteProperty(window, "pageYOffset");
  });

  describe("isValidSectionSlug", () => {
    const { validSlugs, invalidSlugs } = TEST_CONSTANTS;

    it("should return true for all valid slugs", () => {
      validSlugs.forEach((slug) => {
        expect(isValidSectionSlug(slug)).toBe(true);
      });
    });

    it("should return false for all invalid slugs", () => {
      invalidSlugs.forEach((slug) => {
        expect(isValidSectionSlug(slug)).toBe(false);
      });
    });
  });

  describe("canScrollToSection", () => {
    const { validSlugs, invalidSlugs, experiencePath, homePath } =
      TEST_CONSTANTS;

    it("should return true for all valid slugs on experience page", () => {
      validSlugs.forEach((slug) => {
        expect(canScrollToSection(slug, experiencePath)).toBe(true);
      });
    });

    it("should return false for all invalid slugs", () => {
      invalidSlugs.forEach((slug) => {
        expect(canScrollToSection(slug, experiencePath)).toBe(false);
      });
    });

    it("should return false for valid slug on non-experience page", () => {
      expect(canScrollToSection(validSlugs[0], homePath)).toBe(false);
    });
  });

  describe("formatRootMargin", () => {
    const { topOffset, marginRight, marginBottom, marginLeft } = TEST_CONSTANTS;

    it("should format rootMargin string", () => {
      const result = formatRootMargin({
        top: `-${topOffset}px`,
        right: marginRight,
        bottom: marginBottom,
        left: marginLeft,
      });

      expect(result).toBe(
        `-${topOffset}px ${marginRight} ${marginBottom} ${marginLeft}`
      );
    });
  });

  describe("findTopmostIntersectingSection", () => {
    it("should return topmost intersecting element ID", () => {
      const element1 = createMockElement("section1", 50);
      const element2 = createMockElement("section2", 100);

      const entries = [
        {
          target: element2,
          isIntersecting: true,
          boundingClientRect: { top: 100 },
        } as unknown as IntersectionObserverEntry,
        {
          target: element1,
          isIntersecting: true,
          boundingClientRect: { top: 50 },
        } as unknown as IntersectionObserverEntry,
      ];

      expect(findTopmostIntersectingSection(entries)).toBe("section1");
    });

    it("should return null when no intersections", () => {
      const element = createMockElement("section1", 50);
      const entries = [
        {
          target: element,
          isIntersecting: false,
          boundingClientRect: { top: 50 },
        } as unknown as IntersectionObserverEntry,
      ];

      expect(findTopmostIntersectingSection(entries)).toBeNull();
      expect(findTopmostIntersectingSection([])).toBeNull();
    });
  });

  describe("createObserverOptions", () => {
    const { topOffset, marginRight, marginBottom, marginLeft } = TEST_CONSTANTS;

    it("should create IntersectionObserver options", () => {
      const result = createObserverOptions({
        topOffset: topOffset,
        marginRight: marginRight,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
      });

      expect(result).toEqual({
        rootMargin: `-${topOffset}px ${marginRight} ${marginBottom} ${marginLeft}`,
        threshold: 0,
      });
    });
  });

  describe("calculateScrollOffset", () => {
    const { mobileHeaderHeight, breathingRoom } = TEST_CONSTANTS;

    it("should calculate offsets correctly", () => {
      const mobile = calculateScrollOffset({
        isMobile: true,
        mobileHeaderHeight: mobileHeaderHeight,
        breathingRoom: breathingRoom,
      });

      const desktop = calculateScrollOffset({
        isMobile: false,
        mobileHeaderHeight: mobileHeaderHeight,
        breathingRoom: breathingRoom,
      });

      expect(mobile).toBe(mobileHeaderHeight + breathingRoom);
      expect(desktop).toBe(breathingRoom);
    });
  });

  describe("calculateScrollPosition", () => {
    const { topOffset } = TEST_CONSTANTS;

    it("should calculate scroll position", () => {
      const element = createMockElement("test", 200);
      window.pageYOffset = 100;

      const result = calculateScrollPosition({
        element,
        offset: topOffset,
      });

      expect(result).toBe(220);
    });
  });

  describe("createScrollEndHandler", () => {
    const { scrollDelay } = TEST_CONSTANTS;

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should debounce scroll events", () => {
      const onScrollEnd = jest.fn();
      const cleanup = createScrollEndHandler({
        onScrollEnd,
        delay: scrollDelay,
      });

      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("scroll"));

      jest.advanceTimersByTime(scrollDelay);

      expect(onScrollEnd).toHaveBeenCalledTimes(1);
      cleanup();
    });

    it("should cleanup event listener", () => {
      const onScrollEnd = jest.fn();
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

      const cleanup = createScrollEndHandler({
        onScrollEnd,
        delay: scrollDelay,
      });

      cleanup();

      expect(removeEventListenerSpy).toHaveBeenCalled();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe("setupSectionObserver", () => {
    let mockObserve: jest.Mock;
    let mockDisconnect: jest.Mock;

    beforeEach(() => {
      mockObserve = jest.fn();
      mockDisconnect = jest.fn();

      global.IntersectionObserver = jest.fn().mockImplementation(() => ({
        observe: mockObserve,
        disconnect: mockDisconnect,
      }));
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    const { validSlugs } = TEST_CONSTANTS;

    it("should observe existing elements and cleanup", () => {
      const sectionIds = validSlugs.slice(0, 2);
      const callback = jest.fn();

      sectionIds.forEach((id) => {
        document.body.appendChild(createMockElement(id));
      });

      const cleanup = setupSectionObserver({
        sectionIds,
        options: { rootMargin: "0px", threshold: 0 },
        callback,
      });

      expect(mockObserve).toHaveBeenCalledTimes(2);

      cleanup();
      expect(mockDisconnect).toHaveBeenCalledTimes(1);
    });

    it("should skip non-existent elements", () => {
      const cleanup = setupSectionObserver({
        sectionIds: ["non-existent"],
        options: { rootMargin: "0px", threshold: 0 },
        callback: jest.fn(),
      });

      expect(mockObserve).not.toHaveBeenCalled();
      cleanup();
    });
  });
});
