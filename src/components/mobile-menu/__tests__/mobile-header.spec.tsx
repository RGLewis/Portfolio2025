import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { getZIndexClass, ZIndexLevel } from "@/global-styles";
import {
  expectNoA11yViolations,
  mockMatchMedia,
  renderWithProviders,
  screen,
} from "@/test-utils/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MobileHeader } from "../mobile-header";

describe("MobileHeader", () => {
  const { mobileHeader, hamburgerButton } = NAVIGATION_DATA_TEST_IDS;
  const mockSetIsMenuOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderMobileHeader = (isMenuOpen = false) => {
    return renderWithProviders(
      <MobileHeader isMenuOpen={isMenuOpen} setIsMenuOpen={mockSetIsMenuOpen} />
    );
  };

  describe("Rendering", () => {
    it.each([true, false])(
      "should render hamburger button with correct aria-label when isMenuOpen is %s",
      (isMenuOpen) => {
        renderMobileHeader(isMenuOpen);

        const button = screen.getByTestId(hamburgerButton);
        expect(button).toHaveAttribute(
          "aria-label",
          isMenuOpen ? "Close Menu" : "Open Menu"
        );
      }
    );

    it("should render all three hamburger spans", () => {
      renderMobileHeader();

      const button = screen.getByTestId(hamburgerButton);
      const spans = button.querySelectorAll("span");

      expect(spans).toHaveLength(3);
    });

    it("should render with the correct z-index class", () => {
      renderMobileHeader();

      const header = screen.getByTestId(mobileHeader);
      expect(header).toHaveClass(getZIndexClass(ZIndexLevel.THIRD));
    });
  });

  describe("Interactions", () => {
    it.each([{ isMenuOpen: false }, { isMenuOpen: true }])(
      "should toggle menu when hamburger button is clicked and %s",
      async ({ isMenuOpen }) => {
        renderMobileHeader(isMenuOpen);

        const button = screen.getByTestId(hamburgerButton);

        const user = userEvent.setup();
        await user.click(button);

        expect(mockSetIsMenuOpen).toHaveBeenCalledTimes(1);

        const [setIsMenuOpenCall] = mockSetIsMenuOpen.mock.calls[0];
        expect(setIsMenuOpenCall(isMenuOpen)).toBe(!isMenuOpen);
      }
    );
  });

  describe("Accessibility", () => {
    it.each([{ isMenuOpen: false }, { isMenuOpen: true }])(
      "should have no accessibility violations when menu is %s",
      async ({ isMenuOpen }) => {
        mockMatchMedia(true);
        await expectNoA11yViolations(
          <MobileHeader isMenuOpen={isMenuOpen} setIsMenuOpen={jest.fn()} />
        );
      }
    );
  });
});
