import { baseFontSize } from "./constants";

/**
 * Converts px to rem based on a base font size.
 *
 * @param {number} px - pixel value to convert
 * @param {number} base - base font size, defaults to global baseFontSize
 * @returns {string} rem value with 'rem' unit
 */
export const pxToRem = (px: number, base = baseFontSize) => `${px / base}rem`;
