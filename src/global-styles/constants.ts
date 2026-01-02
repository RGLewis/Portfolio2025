import { pxToRem } from "./utils";

export const COLORS = {
  white: "#ffffff",
  black: "#050505",
  charcoal: "#363636",
  slate: "#1f4068",
  electricBlue: "#1F6CC7",
  alertRed: "#D97370",
  blackTransparent: "rgba(5, 5, 5, 0.2)",
  whiteTransparent: "rgba(255,255,255, 0.5)",
  blueTransparent: "rgba(31,108,199, 0.7)",
};

export const SPACINGS_UNITS = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const SPACINGS = {
  xs: pxToRem(SPACINGS_UNITS.xs),
  sm: pxToRem(SPACINGS_UNITS.sm),
  md: pxToRem(SPACINGS_UNITS.md),
  lg: pxToRem(SPACINGS_UNITS.lg),
  xl: pxToRem(SPACINGS_UNITS.xl),
};

export const FONTS = {
  roboto: "Roboto, sans-serif",
  montserrat: "Montserrat, sans-serif",
};

export const FONT_WEIGHTS = {
  extraLight: "300",
  light: "400",
  medium: "600",
  bold: "700",
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
