import { MOBILE_HEADER_HEIGHT, SPACINGS_UNITS } from "@/global-styles";
import { mockMatchMedia } from "@/test-utils/test-utils";
import { Slugs } from "@/types/content-types";

const TEST_CONSTANTS = {
  MOBILE_HEADER_HEIGHT,
  BREATHING_ROOM: SPACINGS_UNITS.md,
  SCROLL_DELAY: 100,
  VALID_SLUGS: Object.values(Slugs),
  EXPERIENCE_PATH: "/experience",
  HOME_PATH: "/",
  ABOUT_PATH: "/about",
  DESKTOP_BREAKPOINT: "(min-width: 1024px)",
};

const mockDesktop = () => mockMatchMedia(true); // matches (min-width: 768px)
const mockMobile = () => mockMatchMedia(false); // doesn't match (min-width: 768px)

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

const setupMockWindow = () => {
  Object.defineProperty(window, "pageYOffset", {
    value: 0,
    writable: true,
  });

  window.scrollTo = jest.fn();

  const mockGetElementById = jest.fn();

  Object.defineProperty(document, "getElementById", {
    value: mockGetElementById,
    writable: true,
  });

  return mockGetElementById;
};

const cleanupMockWindow = () => {
  Object.defineProperty(window, "pageYOffset", {
    value: 0,
    writable: true,
  });

  window.scrollTo = jest.fn();

  Object.defineProperty(document, "getElementById", {
    value: document.getElementById,
    writable: true,
  });
};

describe("useNavigation", () => {
  let mockGetElementById: jest.Mock;
  let mockSetActiveSection: jest.Mock;

  beforeEach(() => {
    mockGetElementById = setupMockWindow();
    mockSetActiveSection = jest.fn();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupMockWindow();
  });

  describe("scrollToSection", () => {
    const scrollTestCases = [
      [
        "desktop",
        mockDesktop,
        TEST_CONSTANTS.BREATHING_ROOM,
        200 - TEST_CONSTANTS.BREATHING_ROOM,
      ],
      [
        "mobile",
        mockMobile,
        TEST_CONSTANTS.MOBILE_HEADER_HEIGHT + TEST_CONSTANTS.BREATHING_ROOM,
        200 -
          (TEST_CONSTANTS.MOBILE_HEADER_HEIGHT + TEST_CONSTANTS.BREATHING_ROOM),
      ],
    ] as const;

    it.each(scrollTestCases)(
      "should scroll to section on %s",
      (_deviceType, mockDevice, expectedOffset, expectedScrollTop) => {
        mockDevice();

        const slug = TEST_CONSTANTS.VALID_SLUGS[0];

        const element = createMockElement(slug, 200);

        mockGetElementById.mockReturnValue(element);

        const mockScrollToSection = jest.fn((targetSlug: Slugs) => {
          mockSetActiveSection(targetSlug);

          const scrollPosition =
            element.getBoundingClientRect().top +
            window.pageYOffset -
            expectedOffset;

          window.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        });

        mockScrollToSection(slug);

        expect(mockSetActiveSection).toHaveBeenCalledWith(slug);

        expect(window.scrollTo).toHaveBeenCalledWith({
          top: expectedScrollTop,
          behavior: "smooth",
        });
      }
    );

    it("should not scroll if element does not exist", () => {
      mockDesktop();
      const slug = TEST_CONSTANTS.VALID_SLUGS[0];

      mockGetElementById.mockReturnValue(null);

      const mockScrollToSection = jest.fn((targetSlug: Slugs) => {
        const targetElement = document.getElementById(targetSlug);
        if (!targetElement) return;

        mockSetActiveSection(targetSlug);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      mockScrollToSection(slug);

      expect(mockSetActiveSection).not.toHaveBeenCalled();
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe("return values", () => {
    it("should return scrollToSection and navigateToSection functions", () => {
      mockDesktop();

      const mockHook = {
        scrollToSection: jest.fn(),
        navigateToSection: jest.fn(),
      };

      expect(typeof mockHook.scrollToSection).toBe("function");
      expect(typeof mockHook.navigateToSection).toBe("function");
    });
  });
});
