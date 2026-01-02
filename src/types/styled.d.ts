import type {
  BREAKPOINTS,
  COLORS,
  FONTS,
  FONT_WEIGHTS,
} from "@/global-styles/constants";
import { baseFontSize } from "@/global-styles/utils";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: typeof COLORS.white;
    backgroundOpaque: typeof COLORS.whiteTransparent;
    primaryFont: typeof COLORS.charcoal;
    secondaryFont: typeof COLORS.slate;
    accent: typeof COLORS.electricBlue;
    contrast: typeof COLORS.black;
    blackOpaque: typeof COLORS.blackTransparent;
    menuBackground: typeof COLORS.electricBlue;
    white: typeof COLORS.white;
    black: typeof COLORS.black;
    opaqueContrast: typeof COLORS.blueTransparent;
    alert: typeof COLORS.alertRed;
    baseFontSize: `${typeof baseFontSize}px`;
    fonts: typeof FONTS;
    fontWeights: typeof FONT_WEIGHTS;
    breakpoints: typeof BREAKPOINTS;
  }
}
