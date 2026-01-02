import { Z_INDEX } from "../constants";
import { getZIndexClass, getZIndexValue, ZIndexLevel } from "../z-index-utils";

const zIndexClassName = "z-index_";

describe("Z-Index Utils", () => {
  describe("getZIndexClass", () => {
    it("should return correct class names for all z-index levels", () => {
      Object.values(ZIndexLevel).forEach((level) => {
        expect(getZIndexClass(level)).toBe(`${zIndexClassName}${level}`);
      });
    });
  });

  describe("getZIndexValue", () => {
    it("should return correct numeric values from constants", () => {
      Object.values(ZIndexLevel).forEach((level) => {
        const value = getZIndexValue(level);
        expect(value).toBe(Z_INDEX[level]);
        expect(typeof value).toBe("number");
      });
    });
  });

  describe("Enum and constant consistency", () => {
    it("should have matching enum values and Z_INDEX keys", () => {
      const enumValues = Object.values(ZIndexLevel);
      const constantKeys = Object.keys(Z_INDEX);

      expect(enumValues.sort()).toEqual(constantKeys.sort());
    });

    it("should generate unique class names for all levels", () => {
      const classNames = Object.values(ZIndexLevel).map(getZIndexClass);
      const uniqueClassNames = new Set(classNames);

      expect(classNames.length).toBe(uniqueClassNames.size);
    });
  });
});
