import { pxToRem } from "../utils";

describe("utils", () => {
  describe("pxToRem", () => {
    it("converts pixels to rem correctly with default base", () => {
      expect(pxToRem(16)).toBe("1rem");
      expect(pxToRem(32)).toBe("2rem");
    });
    it("converts pixels to rem correctly with custom base", () => {
      expect(pxToRem(16, 8)).toBe("2rem");
      expect(pxToRem(24, 12)).toBe("2rem");
    });
    it("handles zero and negative values", () => {
      expect(pxToRem(0)).toBe("0rem");
      expect(pxToRem(-16)).toBe("-1rem");
    });
    it("returns rem string with 'rem' unit", () => {
      const result = pxToRem(20);
      expect(typeof result).toBe("string");
      expect(result.endsWith("rem")).toBe(true);
    });
    it("handles non-integer pixel values", () => {
      expect(pxToRem(15.5)).toBe("0.96875rem");
      expect(pxToRem(7.2, 10)).toBe("0.72rem");
    });
  });
});
