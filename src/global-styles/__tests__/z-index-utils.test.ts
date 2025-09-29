import { Z_INDEX } from "../constants";
import {
  getZIndexClass,
  getZIndexValue,
  zIndexClass,
  ZIndexLevel,
} from "../z-index-utils";

describe("Z-Index Utils", () => {
  const getEnumAndConstantData = () => ({
    enumValues: Object.values(ZIndexLevel),
    constantKeys: Object.keys(Z_INDEX),
  });

  const generateCSSRules = () => {
    return Object.keys(Z_INDEX)
      .map(
        (key) =>
          `.z-index_${key} { z-index: ${
            Z_INDEX[key as keyof typeof Z_INDEX]
          }; }`
      )
      .join("\n");
  };

  const setupDOMTestWithCSS = () => {
    const element = document.createElement("div");
    const style = document.createElement("style");

    style.textContent = generateCSSRules();
    document.head.appendChild(style);
    document.body.appendChild(element);

    return { element, style };
  };

  const cleanupDOMTest = (element: HTMLElement, style: HTMLStyleElement) => {
    document.body.removeChild(element);
    document.head.removeChild(style);
  };

  const validateEnumConstantConsistency = (
    enumValues: string[],
    constantKeys: string[]
  ) => {
    expect(enumValues.sort()).toEqual(constantKeys.sort());
    expect(enumValues).toHaveLength(constantKeys.length);

    enumValues.forEach((level) => {
      const typedLevel = level as keyof typeof Z_INDEX;
      expect(constantKeys).toContain(level);
      expect(Z_INDEX[typedLevel]).toBeDefined();
      expect(typeof Z_INDEX[typedLevel]).toBe("number");
    });

    constantKeys.forEach((key) => {
      expect(enumValues).toContain(key);
    });
  };
  describe("getZIndexClass", () => {
    it("should return correct class names for all z-index levels", () => {
      Object.values(ZIndexLevel).forEach((level) => {
        expect(getZIndexClass(level)).toBe(`z-index_${level}`);
      });
    });
  });

  describe("getZIndexValue", () => {
    it("should return correct numeric values from constants", () => {
      Object.values(ZIndexLevel).forEach((level) => {
        expect(getZIndexValue(level)).toBe(Z_INDEX[level]);
      });
    });

    it("should return actual numbers, not strings", () => {
      Object.values(ZIndexLevel).forEach((level) => {
        const value = getZIndexValue(level);

        expect(typeof value).toBe("number");
        expect(value).toBe(Z_INDEX[level]);
      });
    });
  });

  describe("zIndexClass", () => {
    it("should return an object with className property", () => {
      Object.values(ZIndexLevel).forEach((level) => {
        const result = zIndexClass(level);
        expect(result).toEqual({ className: `z-index_${level}` });
      });
    });

    it("should work with spread operator", () => {
      Object.values(ZIndexLevel).forEach((level) => {
        const props = { id: "test", ...zIndexClass(level) };
        expect(props).toEqual({
          id: "test",
          className: `z-index_${level}`,
        });
      });
    });
  });

  describe("ZIndexLevel enum", () => {
    it("should have all expected enum values matching Z_INDEX keys", () => {
      const { enumValues, constantKeys } = getEnumAndConstantData();

      expect(enumValues.sort()).toEqual(constantKeys.sort());

      enumValues.forEach((level) => {
        expect(constantKeys).toContain(level);
        expect(Z_INDEX[level]).toBeDefined();
      });
    });

    it("should have exactly the same number of values as Z_INDEX constants", () => {
      const { enumValues, constantKeys } = getEnumAndConstantData();

      expect(enumValues).toHaveLength(constantKeys.length);
    });
  });

  describe("CSS Integration", () => {
    it("should work with DOM elements for all levels", () => {
      Object.values(ZIndexLevel).forEach((level) => {
        const mockElement = document.createElement("div");
        const { className } = zIndexClass(level);
        mockElement.className = className;

        expect(mockElement.className).toBe(`z-index_${level}`);
        expect(mockElement.classList.contains(`z-index_${level}`)).toBe(true);
      });
    });

    it("should generate different classes for different levels", () => {
      const { enumValues } = getEnumAndConstantData();
      const classNames = enumValues.map(getZIndexClass);
      const uniqueClassNames = [...new Set(classNames)];

      expect(classNames).toHaveLength(uniqueClassNames.length);

      classNames.forEach((className, index) => {
        expect(className).toBe(`z-index_${enumValues[index]}`);
      });
    });

    describe("Dynamic validation for all enum values", () => {
      const expectedZIndexValues = Object.keys(Z_INDEX).reduce((acc, key) => {
        acc[key] = Z_INDEX[key as keyof typeof Z_INDEX].toString();
        return acc;
      }, {} as Record<string, string>);

      Object.values(ZIndexLevel).forEach((level) => {
        it(`should handle ${level} level correctly`, () => {
          const className = getZIndexClass(level);
          expect(className).toBe(`z-index_${level}`);

          const classObj = zIndexClass(level);
          expect(classObj).toEqual({ className: `z-index_${level}` });

          const element = document.createElement("div");
          element.className = className;
          expect(element.classList.contains(`z-index_${level}`)).toBe(true);
        });

        it(`should apply correct z-index CSS value for ${level}`, () => {
          const { element, style } = setupDOMTestWithCSS();
          const { className } = zIndexClass(level);
          element.className = className;

          const computedStyle = window.getComputedStyle(element);
          const zIndexValue = computedStyle.zIndex;

          expect(zIndexValue).toBe(
            expectedZIndexValues[level as keyof typeof expectedZIndexValues]
          );

          cleanupDOMTest(element, style);
        });
      });

      it("should have unique class names for all enum values", () => {
        const { enumValues } = getEnumAndConstantData();
        const classNames = enumValues.map(getZIndexClass);
        const uniqueClassNames = [...new Set(classNames)];

        expect(classNames).toHaveLength(uniqueClassNames.length);

        classNames.forEach((className, index) => {
          expect(className).toBe(`z-index_${enumValues[index]}`);
        });
      });

      it("should have correct z-index hierarchy", () => {
        const { enumValues } = getEnumAndConstantData();
        const zIndexValues = enumValues.map((level) => Z_INDEX[level]);

        const sortedValues = [...zIndexValues].sort((a, b) => a - b);

        expect(new Set(zIndexValues).size).toBeGreaterThan(1);

        expect(Math.min(...zIndexValues)).toBeLessThan(
          Math.max(...zIndexValues)
        );

        expect(sortedValues).toEqual(zIndexValues.sort((a, b) => a - b));
      });
    });

    it("should use the actual Z_INDEX constants dynamically", () => {
      Object.keys(Z_INDEX).forEach((key) => {
        const typedKey = key as keyof typeof Z_INDEX;
        expect(Z_INDEX[typedKey]).toBeDefined();
        expect(typeof Z_INDEX[typedKey]).toBe("number");
      });

      expect(Object.keys(Z_INDEX).length).toBeGreaterThan(0);
    });

    it("should maintain perfect consistency between enum and constants", () => {
      const { enumValues, constantKeys } = getEnumAndConstantData();
      validateEnumConstantConsistency(enumValues, constantKeys);
    });

    it("should work with any future Z_INDEX additions", () => {
      const currentConstantCount = Object.keys(Z_INDEX).length;
      const currentEnumCount = Object.values(ZIndexLevel).length;

      expect(currentConstantCount).toBe(currentEnumCount);

      Object.keys(Z_INDEX).forEach((key) => {
        expect(Object.values(ZIndexLevel)).toContain(key);
      });
    });
  });
});
