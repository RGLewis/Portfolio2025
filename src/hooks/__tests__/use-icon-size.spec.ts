import { IconSizes, IconWeights } from "@/hooks/types";
import { useIconSize } from "@/hooks/use-icon-size";
import { mockMatchMedia } from "@/test-utils/test-utils";
import { renderHook } from "@testing-library/react";

describe("useIconSize", () => {
  const cases = [
    ["{isLargeScreen: true}", true, IconSizes.LARGE, IconWeights.THICK],
    ["{isLargeScreen: false}", false, IconSizes.MEDIUM, IconWeights.THIN],
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
