import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import { TextDecoder, TextEncoder } from "util";

// Polyfill TextEncoder/TextDecoder for jsdom (required by react-router)
// @ts-ignore - Type mismatch between Node and DOM TextEncoder
global.TextEncoder = TextEncoder;
// @ts-ignore - Type mismatch between Node and DOM TextDecoder
global.TextDecoder = TextDecoder;

// Extend Jest matchers with jest-axe
expect.extend(toHaveNoViolations);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
