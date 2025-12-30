import { BREAKPOINTS } from "@/global-styles";
import { useIsDesktop, useMediaQuery } from "@/hooks/use-media-query";
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
});

describe("useIsDesktop", () => {
  it("returns true when viewport is at or above medium breakpoint", () => {
    mockMatchMediaWithBreakpoint(BREAKPOINTS.medium, true);

    const { result } = renderHook(() => useIsDesktop());

    expect(result.current).toBe(true);
  });

  it("returns false when viewport is below medium breakpoint", () => {
    mockMatchMediaWithBreakpoint(BREAKPOINTS.medium, false);

    const { result } = renderHook(() => useIsDesktop());

    expect(result.current).toBe(false);
  });
});
