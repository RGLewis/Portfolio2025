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
 */
export const getZIndexClass = (level: ZIndexLevel): string =>
  `z-index_${level}`;

/**
 * Returns an object with className property for easy spreading into components
 * @param level - The z-index level
 * @returns Object with className property
 *
 * @example
 * ```jsx
 * // Basic usage with spread operator (recommended)
 * <Modal {...zIndexClass(ZIndexLevel.THIRD)}>
 *   <h1>High priority modal</h1>
 * </Modal>
 *
 * // Conditional z-index
 * const level = isImportant ? ZIndexLevel.THIRD : ZIndexLevel.BASE;
 * <Sidebar {...zIndexClass(level)}>Content</Sidebar>
 *
 * // Combining with other props
 * <Header
 *   id="main-header"
 *   role="banner"
 *   {...zIndexClass(ZIndexLevel.SECOND)}
 * >
 *   Navigation
 * </Header>
 *
 * // Using class name directly
 * <div className={`my-component ${getZIndexClass(ZIndexLevel.BASE)}`}>
 *   Content with base z-index
 * </div>
 *
 * // Getting numeric value for calculations
 * const zValue = getZIndexValue(ZIndexLevel.THIRD); // Returns 300
 * console.log(`Modal z-index: ${zValue}`);
 * ```
 */
export const zIndexClass = (level: ZIndexLevel) => ({
  className: getZIndexClass(level),
});

/**
 * Returns the numeric z-index value for a given level
 * @param level - The z-index level
 * @returns Numeric z-index value
 */
export const getZIndexValue = (level: ZIndexLevel): number => {
  return Z_INDEX[level];
};
