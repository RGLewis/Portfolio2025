import { Slugs } from "@/types/content-types";
import { act, renderHook } from "@testing-library/react";
import { NavigationProvider, useNavigationContext } from "./navigation-context";

jest.mock("@/hooks/use-navigation", () => ({
  useNavigation: jest.fn(),
}));

import { useNavigation } from "@/hooks/use-navigation";

const mockUseNavigation = useNavigation as jest.MockedFunction<
  typeof useNavigation
>;

describe("NavigationContext", () => {
  const mockScrollToSection = jest.fn();
  const mockNavigateToSection = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNavigation.mockReturnValue({
      scrollToSection: mockScrollToSection,
      navigateToSection: mockNavigateToSection,
    });
  });

  describe("NavigationProvider", () => {
    it("should provide navigation context values", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NavigationProvider>{children}</NavigationProvider>
      );

      const { result } = renderHook(() => useNavigationContext(), { wrapper });

      expect(result.current.activeSection).toBeNull();
      expect(typeof result.current.setActiveSection).toBe("function");
      expect(typeof result.current.scrollToSection).toBe("function");
      expect(typeof result.current.navigateToSection).toBe("function");
    });

    it("should call useNavigation with setActiveSection", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NavigationProvider>{children}</NavigationProvider>
      );

      renderHook(() => useNavigationContext(), { wrapper });

      expect(mockUseNavigation).toHaveBeenCalledWith({
        setActiveSection: expect.any(Function),
      });
    });

    it("should update activeSection when setActiveSection is called", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NavigationProvider>{children}</NavigationProvider>
      );

      const { result } = renderHook(() => useNavigationContext(), { wrapper });

      expect(result.current.activeSection).toBeNull();

      act(() => {
        result.current.setActiveSection(Slugs.PROFILE);
      });

      expect(result.current.activeSection).toBe(Slugs.PROFILE);
    });

    it("should pass through scrollToSection calls", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NavigationProvider>{children}</NavigationProvider>
      );

      const { result } = renderHook(() => useNavigationContext(), { wrapper });

      act(() => {
        result.current.scrollToSection(Slugs.WORK);
      });

      expect(mockScrollToSection).toHaveBeenCalledWith(Slugs.WORK);
    });

    it("should pass through navigateToSection calls", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NavigationProvider>{children}</NavigationProvider>
      );

      const { result } = renderHook(() => useNavigationContext(), { wrapper });

      act(() => {
        result.current.navigateToSection(Slugs.SKILLS);
      });

      expect(mockNavigateToSection).toHaveBeenCalledWith(Slugs.SKILLS);
    });
  });

  describe("useNavigationContext", () => {
    it("should throw error when used outside NavigationProvider", () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        renderHook(() => useNavigationContext());
      }).toThrow("useNavigationContext must be used within NavigationProvider");

      consoleSpy.mockRestore();
    });

    it("should return context when used within NavigationProvider", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NavigationProvider>{children}</NavigationProvider>
      );

      const { result } = renderHook(() => useNavigationContext(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.activeSection).toBeNull();
      expect(typeof result.current.setActiveSection).toBe("function");
      expect(typeof result.current.scrollToSection).toBe("function");
      expect(typeof result.current.navigateToSection).toBe("function");
    });
  });

  describe("activeSection state management", () => {
    it("should handle multiple setActiveSection calls", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NavigationProvider>{children}</NavigationProvider>
      );

      const { result } = renderHook(() => useNavigationContext(), { wrapper });

      expect(result.current.activeSection).toBeNull();

      act(() => {
        result.current.setActiveSection(Slugs.PROFILE);
      });
      expect(result.current.activeSection).toBe(Slugs.PROFILE);

      act(() => {
        result.current.setActiveSection(Slugs.WORK);
      });
      expect(result.current.activeSection).toBe(Slugs.WORK);

      act(() => {
        result.current.setActiveSection(null);
      });
      expect(result.current.activeSection).toBeNull();
    });

    it("should handle all valid Slugs values", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NavigationProvider>{children}</NavigationProvider>
      );

      const { result } = renderHook(() => useNavigationContext(), { wrapper });

      expect(result.current.activeSection).toBeNull();

      Object.values(Slugs).forEach((slug) => {
        act(() => {
          result.current.setActiveSection(slug);
        });
        expect(result.current.activeSection).toBe(slug);
      });
    });
  });
});
