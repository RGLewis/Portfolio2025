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
  MOBILE_HEADER_HEIGHT,
  BREATHING_ROOM: SPACINGS_UNITS.md,
  SCROLL_DELAY: 100,
  TOP_OFFSET: 80,
  MARGIN_RIGHT: "0px",
  MARGIN_BOTTOM: "-50%",
  MARGIN_LEFT: "0px",
  VALID_SLUGS: Object.values(Slugs),
  INVALID_SLUGS: ["invalid", "test", "", "profile-invalid"],
  EXPERIENCE_PATH: "/experience",
  HOME_PATH: "/",
  ABOUT_PATH: "/about",
};

// Test helper functions
const createMockElement = (id: string, top: number = 100): HTMLElement => {
  const element = document.createElement("div");
  element.id = id;
  element.getBoundingClientRect = jest.fn().mockReturnValue({
    top,
    left: 0,
    bottom: 200,
    right: 100,
    width: 100,
    height: 100,
    x: 0,
    y: top,
    toJSON: jest.fn(),
  });
  return element;
};

const createMockIntersectionEntry = (
  target: HTMLElement,
  isIntersecting: boolean,
  top: number = 100
): IntersectionObserverEntry => ({
  target,
  isIntersecting,
  intersectionRatio: isIntersecting ? 1 : 0,
  boundingClientRect: {
    top,
    left: 0,
    bottom: 200,
    right: 100,
    width: 100,
    height: 100,
    x: 0,
    y: top,
    toJSON: jest.fn(),
  },
  intersectionRect: {
    top: isIntersecting ? top : 0,
    left: 0,
    bottom: isIntersecting ? 200 : 0,
    right: isIntersecting ? 100 : 0,
    width: isIntersecting ? 100 : 0,
    height: isIntersecting ? 100 : 0,
    x: 0,
    y: isIntersecting ? top : 0,
    toJSON: jest.fn(),
  },
  rootBounds: {
    top: 0,
    left: 0,
    bottom: 400,
    right: 800,
    width: 800,
    height: 400,
    x: 0,
    y: 0,
    toJSON: jest.fn(),
  },
  time: Date.now(),
});

const setupMockWindow = () => {
  Object.defineProperty(window, "pageYOffset", {
    value: 0,
    writable: true,
  });
};

const cleanupMockWindow = () => {
  delete (window as any).pageYOffset;
};

describe("navigation-utils", () => {
  beforeEach(() => {
    setupMockWindow();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupMockWindow();
  });

  describe("isValidSectionSlug", () => {
    it.each(TEST_CONSTANTS.VALID_SLUGS)(
      "should return true for valid slug: %s",
      (slug) => {
        expect(isValidSectionSlug(slug)).toBe(true);
      }
    );

    it.each(TEST_CONSTANTS.INVALID_SLUGS)(
      "should return false for invalid slug: %s",
      (slug) => {
        expect(isValidSectionSlug(slug)).toBe(false);
      }
    );
  });

  describe("canScrollToSection", () => {
    it.each(TEST_CONSTANTS.VALID_SLUGS)(
      "should return true for valid slug on experience page: %s",
      (slug) => {
        expect(canScrollToSection(slug, TEST_CONSTANTS.EXPERIENCE_PATH)).toBe(
          true
        );
      }
    );

    it.each(TEST_CONSTANTS.INVALID_SLUGS)(
      "should return false for invalid slug on experience page: %s",
      (slug) => {
        expect(canScrollToSection(slug, TEST_CONSTANTS.EXPERIENCE_PATH)).toBe(
          false
        );
      }
    );

    it.each(TEST_CONSTANTS.VALID_SLUGS)(
      "should return false for valid slug on non-experience page: %s",
      (slug) => {
        expect(canScrollToSection(slug, TEST_CONSTANTS.HOME_PATH)).toBe(false);
        expect(canScrollToSection(slug, TEST_CONSTANTS.ABOUT_PATH)).toBe(false);
      }
    );
  });

  describe("formatRootMargin", () => {
    it("should format rootMargin string correctly", () => {
      const result = formatRootMargin({
        top: `-${TEST_CONSTANTS.TOP_OFFSET}px`,
        right: TEST_CONSTANTS.MARGIN_RIGHT,
        bottom: TEST_CONSTANTS.MARGIN_BOTTOM,
        left: TEST_CONSTANTS.MARGIN_LEFT,
      });

      expect(result).toBe(
        `-${TEST_CONSTANTS.TOP_OFFSET}px ${TEST_CONSTANTS.MARGIN_RIGHT} ${TEST_CONSTANTS.MARGIN_BOTTOM} ${TEST_CONSTANTS.MARGIN_LEFT}`
      );
    });

    it("should handle different margin values", () => {
      const result = formatRootMargin({
        top: "10px",
        right: "20px",
        bottom: "30px",
        left: "40px",
      });

      expect(result).toBe("10px 20px 30px 40px");
    });
  });

  describe("findTopmostIntersectingSection", () => {
    it("should return the topmost intersecting element ID", () => {
      const element1 = createMockElement("section1", 50);
      const element2 = createMockElement("section2", 100);
      const element3 = createMockElement("section3", 150);

      const entries = [
        createMockIntersectionEntry(element3, true, 150),
        createMockIntersectionEntry(element1, true, 50),
        createMockIntersectionEntry(element2, true, 100),
      ];

      const result = findTopmostIntersectingSection(entries);
      expect(result).toBe("section1");
    });

    it("should return null when no elements are intersecting", () => {
      const element1 = createMockElement("section1", 50);
      const element2 = createMockElement("section2", 100);

      const entries = [
        createMockIntersectionEntry(element1, false, 50),
        createMockIntersectionEntry(element2, false, 100),
      ];

      const result = findTopmostIntersectingSection(entries);
      expect(result).toBeNull();
    });

    it("should return null for empty entries array", () => {
      const result = findTopmostIntersectingSection([]);
      expect(result).toBeNull();
    });

    it("should filter out non-intersecting elements", () => {
      const element1 = createMockElement("section1", 50);
      const element2 = createMockElement("section2", 100);

      const entries = [
        createMockIntersectionEntry(element1, true, 50),
        createMockIntersectionEntry(element2, false, 100),
      ];

      const result = findTopmostIntersectingSection(entries);
      expect(result).toBe("section1");
    });
  });

  describe("createObserverOptions", () => {
    it("should create correct IntersectionObserver options", () => {
      const result = createObserverOptions({
        topOffset: TEST_CONSTANTS.TOP_OFFSET,
        marginRight: TEST_CONSTANTS.MARGIN_RIGHT,
        marginBottom: TEST_CONSTANTS.MARGIN_BOTTOM,
        marginLeft: TEST_CONSTANTS.MARGIN_LEFT,
      });

      expect(result).toEqual({
        rootMargin: `-${TEST_CONSTANTS.TOP_OFFSET}px ${TEST_CONSTANTS.MARGIN_RIGHT} ${TEST_CONSTANTS.MARGIN_BOTTOM} ${TEST_CONSTANTS.MARGIN_LEFT}`,
        threshold: 0,
      });
    });
  });

  describe("calculateScrollOffset", () => {
    it("should calculate mobile offset correctly", () => {
      const result = calculateScrollOffset({
        isMobile: true,
        mobileHeaderHeight: TEST_CONSTANTS.MOBILE_HEADER_HEIGHT,
        breathingRoom: TEST_CONSTANTS.BREATHING_ROOM,
      });

      expect(result).toBe(
        TEST_CONSTANTS.MOBILE_HEADER_HEIGHT + TEST_CONSTANTS.BREATHING_ROOM
      );
    });

    it("should calculate desktop offset correctly", () => {
      const result = calculateScrollOffset({
        isMobile: false,
        mobileHeaderHeight: TEST_CONSTANTS.MOBILE_HEADER_HEIGHT,
        breathingRoom: TEST_CONSTANTS.BREATHING_ROOM,
      });

      expect(result).toBe(TEST_CONSTANTS.BREATHING_ROOM);
    });
  });

  describe("calculateScrollPosition", () => {
    it("should calculate scroll position correctly", () => {
      const element = createMockElement("test-section", 200);
      window.pageYOffset = 100;

      const result = calculateScrollPosition({
        element,
        offset: TEST_CONSTANTS.TOP_OFFSET,
      });

      expect(result).toBe(200 + 100 - TEST_CONSTANTS.TOP_OFFSET);
    });

    it("should handle zero pageYOffset", () => {
      const element = createMockElement("test-section", 150);
      window.pageYOffset = 0;

      const result = calculateScrollPosition({
        element,
        offset: 50,
      });

      expect(result).toBe(150 - 50);
    });
  });

  describe("createScrollEndHandler", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should call onScrollEnd after delay", () => {
      const onScrollEnd = jest.fn();
      const cleanup = createScrollEndHandler({
        onScrollEnd,
        delay: TEST_CONSTANTS.SCROLL_DELAY,
      });

      window.dispatchEvent(new Event("scroll"));

      jest.advanceTimersByTime(TEST_CONSTANTS.SCROLL_DELAY);

      expect(onScrollEnd).toHaveBeenCalledTimes(1);
      cleanup();
    });

    it("should debounce multiple scroll events", () => {
      const onScrollEnd = jest.fn();
      const cleanup = createScrollEndHandler({
        onScrollEnd,
        delay: TEST_CONSTANTS.SCROLL_DELAY,
      });

      window.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(50);
      window.dispatchEvent(new Event("scroll"));
      jest.advanceTimersByTime(50);
      window.dispatchEvent(new Event("scroll"));

      jest.advanceTimersByTime(TEST_CONSTANTS.SCROLL_DELAY);

      expect(onScrollEnd).toHaveBeenCalledTimes(1);
      cleanup();
    });

    it("should cleanup timer and event listener", () => {
      const onScrollEnd = jest.fn();
      const addEventListenerSpy = jest.spyOn(window, "addEventListener");
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

      const cleanup = createScrollEndHandler({
        onScrollEnd,
        delay: TEST_CONSTANTS.SCROLL_DELAY,
      });

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function),
        { passive: true }
      );

      cleanup();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function)
      );

      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe("setupSectionObserver", () => {
    let mockObserver: jest.Mocked<IntersectionObserver>;
    let mockObserve: jest.Mock;
    let mockDisconnect: jest.Mock;

    beforeEach(() => {
      mockObserve = jest.fn();
      mockDisconnect = jest.fn();
      mockObserver = {
        observe: mockObserve,
        disconnect: mockDisconnect,
      } as any;

      global.IntersectionObserver = jest
        .fn()
        .mockImplementation(() => mockObserver);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should observe all valid section elements", () => {
      const sectionIds = TEST_CONSTANTS.VALID_SLUGS.slice(0, 2);
      const options = { rootMargin: "0px", threshold: 0 };
      const callback = jest.fn();

      sectionIds.forEach((id) => {
        document.body.appendChild(createMockElement(id));
      });

      const cleanup = setupSectionObserver({
        sectionIds,
        options,
        callback,
      });

      expect(mockObserve).toHaveBeenCalledTimes(sectionIds.length);
      sectionIds.forEach((id) => {
        expect(mockObserve).toHaveBeenCalledWith(
          expect.objectContaining({ id })
        );
      });

      cleanup();
      expect(mockDisconnect).toHaveBeenCalledTimes(1);
    });

    it("should skip non-existent elements", () => {
      const sectionIds = ["non-existent", "also-missing"];
      const options = { rootMargin: "0px", threshold: 0 };
      const callback = jest.fn();

      const cleanup = setupSectionObserver({
        sectionIds,
        options,
        callback,
      });

      expect(mockObserve).not.toHaveBeenCalled();
      cleanup();
    });

    it("should return cleanup function that disconnects observer", () => {
      const sectionIds = TEST_CONSTANTS.VALID_SLUGS.slice(0, 1);
      const options = { rootMargin: "0px", threshold: 0 };
      const callback = jest.fn();

      document.body.appendChild(createMockElement(sectionIds[0]));

      const cleanup = setupSectionObserver({
        sectionIds,
        options,
        callback,
      });

      expect(typeof cleanup).toBe("function");

      cleanup();
      expect(mockDisconnect).toHaveBeenCalledTimes(1);
    });
  });
});
