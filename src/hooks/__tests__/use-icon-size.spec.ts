import { IconSize, IconWeight } from "@/hooks/types";
import { useIconSize } from "@/hooks/use-icon-size";
import { mockMatchMedia } from "@/test-utils/test-utils";
import { renderHook } from "@testing-library/react";

describe("useIconSize", () => {
  const cases = [
    ["{isLargeScreen: true}", true, IconSize.LARGE, IconWeight.THICK],
    ["{isLargeScreen: false}", false, IconSize.MEDIUM, IconWeight.THIN],
  ] as const;

  it.each(cases)(
    "returns correct icon when %s",
    (_label, match, expectedSize, expectedWeight) => {
      mockMatchMedia(match);

      const { result } = renderHook(() => useIconSize());

      expect(result.current.iconSize).toBe(expectedSize);
      expect(result.current.iconWeight).toBe(expectedWeight);
    }
  );
});
