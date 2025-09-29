import { pxToRem } from "./utils";

export const GLOBAL_COLOR_MAPPINGS = {
  white: "#ffffff",
  black: "#050505",
  mint: "#5cdb95",
  alertRed: "#cf1b1b",
  blackTransparent: "rgba(5,5,5, 0.2)",
};

export const LIGHT_THEME_COLOR_MAPPINGS = {
  charcoal: "#363636",
  slate: "#1f4068",
  electricBlue: "#1F6CC7",
  whiteTransparent: "rgba(255,255,255, 0.5)",
  blueTransparent: "rgba(31,108,199, 0.7)",
};

export const DARK_THEME_COLOR_MAPPINGS = {
  deepNavy: "#200C90",
  lightGray: "#D9D9D9",
  navyTransparent: "rgba(32,12,144, 0.3)",
  whiteTransparentLight: "rgba(255,255,255, 0.3)",
};

export const SPACINGS = {
  xs: pxToRem(4),
  sm: pxToRem(8),
  md: pxToRem(16),
  lg: pxToRem(24),
  xl: pxToRem(32),
};

export const FONTS = {
  roboto: "Roboto, sans-serif",
  montserrat: "Montserrat, sans-serif",
};

export const FONT_WEIGHTS = {
  extraLight: "300",
  light: "400",
  regular: "500",
  medium: "600",
  bold: "700",
  extraBold: "800",
};

export const BREAKPOINTS = {
  extraSmall: "400px",
  small: "576px",
  medium: "768px",
  large: "992px",
  extraLarge: "1200px",
};

export const SIDEBAR_WIDTHS = {
  large: 450,
  medium: 300,
};

export const Z_INDEX = {
  negative: -1,
  base: 100,
  second: 200,
  third: 300,
};

export const MOBILE_HEADER_HEIGHT = 70;
