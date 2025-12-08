import { act, renderHook, waitFor } from "@testing-library/react";
import { LOADER_DELAY, useDelayedLoading } from "../use-delayed-loading";

describe("useDelayedLoading", () => {
  it("returns false initially when loading", () => {
    const { result } = renderHook(() => useDelayedLoading(true));

    expect(result.current).toBe(false);
  });

  it("returns true after delay when loading", async () => {
    const { result } = renderHook(() => useDelayedLoading(true));

    expect(result.current).toBe(false);

    await waitFor(
      () => {
        expect(result.current).toBe(true);
      },
      { timeout: LOADER_DELAY + 100 }
    );
  });

  it("returns false immediately when not loading", () => {
    const { result } = renderHook(() => useDelayedLoading(false));

    expect(result.current).toBe(false);
  });

  it("hides loader immediately when isLoading changes to false", async () => {
    const { result, rerender } = renderHook(
      ({ isLoading }) => useDelayedLoading(isLoading),
      { initialProps: { isLoading: true } }
    );

    await waitFor(
      () => {
        expect(result.current).toBe(true);
      },
      { timeout: LOADER_DELAY + 100 }
    );

    act(() => {
      rerender({ isLoading: false });
    });

    expect(result.current).toBe(false);
  });

  it("does not show loader if data loads before delay (prevents flash)", async () => {
    const { result, rerender } = renderHook(
      ({ isLoading }) => useDelayedLoading(isLoading),
      { initialProps: { isLoading: true } }
    );

    // Wait less than the delay
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, LOADER_DELAY - 50));
    });

    act(() => {
      rerender({ isLoading: false });
    });

    expect(result.current).toBe(false);
  });
});
