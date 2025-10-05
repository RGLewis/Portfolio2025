import { BREAKPOINTS } from "@/global-styles";
import { useMediaQuery } from "@/hooks/use-media-query";
import { mockMatchMediaWithBreakpoint } from "@/test-utils/test-utils";
import { renderHook } from "@testing-library/react";

describe("useMediaQuery", () => {
  it.each([
    ["matches", true],
    ["does not match", false],
  ] as const)("returns %s when media query %s", (_label, shouldMatch) => {
    mockMatchMediaWithBreakpoint(BREAKPOINTS.medium, shouldMatch);

    const { result } = renderHook(() =>
      useMediaQuery(`(min-width: ${BREAKPOINTS.medium})`)
    );

    expect(result.current).toBe(shouldMatch);
  });

  it("returns false when window is undefined (SSR)", () => {
    const originalWindow = global.window;
    // @ts-expect-error - Intentionally setting window to undefined for SSR test
    delete global.window;

    const { result } = renderHook(() =>
      useMediaQuery(`(min-width: ${BREAKPOINTS.medium})`)
    );

    expect(result.current).toBe(false);

    global.window = originalWindow;
  });
});
