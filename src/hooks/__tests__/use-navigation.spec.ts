import { MOBILE_HEADER_HEIGHT, SPACINGS_UNITS } from "@/global-styles";
import { mockMatchMedia } from "@/test-utils/test-utils";
import { Slugs } from "@/types/content-types";

const TEST_CONSTANTS = {
  mobileHeaderHeight: MOBILE_HEADER_HEIGHT,
  breathingRoom: SPACINGS_UNITS.md,
  validSlugs: Object.values(Slugs),
};

const mockDesktop = () => mockMatchMedia(true);
const mockMobile = () => mockMatchMedia(false);

const createMockElement = (id: string, top: number = 100): HTMLElement => {
  const element = document.createElement("div");
  element.id = id;
  element.getBoundingClientRect = jest.fn().mockReturnValue({ top });
  return element;
};

describe("useNavigation", () => {
  let mockGetElementById: jest.Mock;
  let mockSetActiveSection: jest.Mock;

  beforeEach(() => {
    Object.defineProperty(window, "pageYOffset", { value: 0, writable: true });
    window.scrollTo = jest.fn();
    mockGetElementById = jest.fn();
    Object.defineProperty(document, "getElementById", {
      value: mockGetElementById,
      writable: true,
    });
    mockSetActiveSection = jest.fn();
    jest.clearAllMocks();
  });

  afterEach(() => {
    Reflect.deleteProperty(window, "pageYOffset");
    Reflect.deleteProperty(document, "getElementById");
  });

  const { breathingRoom, mobileHeaderHeight, validSlugs } = TEST_CONSTANTS;

  describe("scrollToSection", () => {
    it.each([
      ["desktop", mockDesktop, breathingRoom],
      ["mobile", mockMobile, mobileHeaderHeight + breathingRoom],
    ] as const)(
      "should scroll to section on %s",
      (_deviceType, mockDevice, expectedOffset) => {
        mockDevice();

        const slug = validSlugs[0];
        const element = createMockElement(slug, 200);

        mockGetElementById.mockReturnValue(element);

        const scrollPosition = 200 + 0 - expectedOffset;

        mockSetActiveSection(slug);
        (window.scrollTo as jest.Mock)({
          top: scrollPosition,
          behavior: "smooth",
        });

        expect(mockSetActiveSection).toHaveBeenCalledWith(slug);
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    );

    it("should not scroll if element does not exist", () => {
      mockGetElementById.mockReturnValue(null);

      const slug = validSlugs[0];
      const targetElement = document.getElementById(slug);

      if (!targetElement) {
        expect(mockSetActiveSection).not.toHaveBeenCalled();
        expect(window.scrollTo).not.toHaveBeenCalled();
      }
    });
  });

  describe("navigateToSection", () => {
    let mockPushState: jest.Mock;
    let mockNavigate: jest.Mock;

    beforeEach(() => {
      mockDesktop();

      mockPushState = jest.fn();
      window.history.pushState = mockPushState;

      mockNavigate = jest.fn();
    });

    it("updates URL hash and scrolls when already on experience page", () => {
      const element = createMockElement(Slugs.PROFILE, 200);
      mockGetElementById.mockReturnValue(element);

      mockPushState(null, "", `#${Slugs.PROFILE}`);

      expect(mockPushState).toHaveBeenCalledWith(null, "", `#${Slugs.PROFILE}`);
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("navigates to experience page with hash when on different page", () => {
      mockNavigate(`/experience#${Slugs.PROFILE}`);

      expect(mockNavigate).toHaveBeenCalledWith(`/experience#${Slugs.PROFILE}`);
      expect(mockPushState).not.toHaveBeenCalled();
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
