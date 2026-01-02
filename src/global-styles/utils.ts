export const baseFontSize = 16;

/**
 * Converts px to rem based on a base font size.
 * @param px - Pixel value to convert
 * @returns Rem value with 'rem' unit
 * @example
 * ```tsx
 * pxToRem(16) // '1rem'
 * pxToRem(32) // '2rem'
 * ```
 */
export const pxToRem = (px: number) => `${px / baseFontSize}rem`;
