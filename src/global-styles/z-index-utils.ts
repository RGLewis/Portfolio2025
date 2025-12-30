/**
 * Utility functions for managing z-index values consistently across the application
 */

import { Z_INDEX } from "./constants";

export enum ZIndexLevel {
  NEGATIVE = "negative",
  BASE = "base",
  SECOND = "second",
  THIRD = "third",
}

/**
 * Returns the CSS class name for a given z-index level
 * @param level - The z-index level
 * @returns CSS class name string
 * @example
 * ```tsx
 * <Modal className={getZIndexClass(ZIndexLevel.THIRD)}>
 *   <h1>High priority modal</h1>
 * </Modal>
 * ```
 */
export const getZIndexClass = (level: ZIndexLevel): string =>
  `z-index_${level}`;

/**
 * Returns the numeric z-index value for a given level
 * @param level - The z-index level
 * @returns Numeric z-index value
 */
export const getZIndexValue = (level: ZIndexLevel): number => {
  return Z_INDEX[level];
};
