import { darkTheme, globalTheme, lightTheme } from "@/global-styles";
import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

/**
 * Type for theme options in tests
 */
type ThemeMode = "light" | "dark";

/**
 * Custom render options that include theme selection
 */
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  theme?: ThemeMode;
}

/**
 * Helper function to mock window.matchMedia for specific viewport sizes
 * This allows testing of responsive behavior in jsdom environment
 *
 * @param matches - Whether the media query should match (true for mobile, false for desktop)
 *
 * @example
 * ```tsx
 * // Mock mobile viewport
 * mockMatchMedia(true);
 *
 * // Mock desktop viewport
 * mockMatchMedia(false);
 * ```
 */
export const mockMatchMedia = (matches: boolean): void => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

/**
 * Helper function to mock matchMedia for specific breakpoint
 *
 * @param breakpoint - The breakpoint string (e.g., "768px")
 * @param matches - Whether the media query should match
 *
 * @example
 * ```tsx
 * // Mock that viewport is at least 768px wide
 * mockMatchMediaWithBreakpoint("768px", true);
 * ```
 */
export const mockMatchMediaWithBreakpoint = (
  breakpoint: string,
  matches: boolean
): void => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => {
      const isMatchingQuery = query.includes(breakpoint);
      return {
        matches: isMatchingQuery ? matches : false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    }),
  });
};

/**
 * Wrapper component that provides theme context for tests
 */
const TestWrapper = ({
  children,
  theme = "light",
}: {
  children: ReactNode;
  theme?: ThemeMode;
}) => {
  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <MemoryRouter>
      <ThemeProvider theme={{ ...selectedTheme, ...globalTheme }}>
        {children}
      </ThemeProvider>
    </MemoryRouter>
  );
};

/**
 * Custom render function that wraps components with necessary providers
 * Automatically includes ThemeProvider with optional theme selection
 *
 * @param ui - The React component to render
 * @param options - Render options including theme selection
 * @returns RenderResult from @testing-library/react
 *
 * @example
 * ```tsx
 * // Render with default light theme
 * renderWithProviders(<MyComponent />);
 *
 * // Render with dark theme
 * renderWithProviders(<MyComponent />, { theme: "dark" });
 * ```
 */
export const renderWithProviders = (
  ui: ReactElement,
  { theme = "light", ...options }: CustomRenderOptions = {}
): RenderResult => {
  return render(ui, {
    wrapper: ({ children }) => (
      <TestWrapper theme={theme}>{children}</TestWrapper>
    ),
    ...options,
  });
};

/**
 * Re-export everything from @testing-library/react for convenience
 * This allows importing everything from a single file
 *
 * @example
 * ```tsx
 * import { renderWithProviders, screen, fireEvent } from "@/test-utils";
 * ```
 */
export * from "@testing-library/react";

// Override the default render with our custom one
export { renderWithProviders as render };

/**
 * Helper function to test accessibility violations using jest-axe
 * Renders a component and checks for a11y violations
 *
 * @param ui - The React component to test
 * @returns Promise that resolves when test completes
 *
 * @example
 * ```tsx
 * it("should have no accessibility violations", async () => {
 *   await expectNoA11yViolations(<MyComponent />);
 * });
 * ```
 */
export const expectNoA11yViolations = async (
  ui: ReactElement
): Promise<void> => {
  const { axe } = await import("jest-axe");
  const { container } = renderWithProviders(ui);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};
