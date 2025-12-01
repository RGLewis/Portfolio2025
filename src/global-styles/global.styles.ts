import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import {
  BREAKPOINTS,
  DARK_THEME_COLOR_MAPPINGS,
  FONT_WEIGHTS,
  FONTS,
  GLOBAL_COLOR_MAPPINGS,
  LIGHT_THEME_COLOR_MAPPINGS,
  Z_INDEX,
} from "./constants";

import { focusVisible } from "./mixins";
import { baseFontSize } from "./utils";

export const lightTheme = {
  background: GLOBAL_COLOR_MAPPINGS.white,
  backgroundOpaque: LIGHT_THEME_COLOR_MAPPINGS.whiteTransparent,
  primaryFont: LIGHT_THEME_COLOR_MAPPINGS.charcoal,
  secondaryFont: LIGHT_THEME_COLOR_MAPPINGS.slate,
  accent: LIGHT_THEME_COLOR_MAPPINGS.electricBlue,
  contrast: GLOBAL_COLOR_MAPPINGS.black,
  blackOpaque: GLOBAL_COLOR_MAPPINGS.blackTransparent,
  menuBackground: LIGHT_THEME_COLOR_MAPPINGS.electricBlue,
  menuBorder: LIGHT_THEME_COLOR_MAPPINGS.electricBlue,
  white: GLOBAL_COLOR_MAPPINGS.white,
  black: GLOBAL_COLOR_MAPPINGS.black,
  opaqueContrast: LIGHT_THEME_COLOR_MAPPINGS.blueTransparent,
  alert: GLOBAL_COLOR_MAPPINGS.alertRed,
};

export const darkTheme = {
  background: DARK_THEME_COLOR_MAPPINGS.deepNavy,
  backgroundOpaque: DARK_THEME_COLOR_MAPPINGS.navyTransparent,
  primaryFont: GLOBAL_COLOR_MAPPINGS.white,
  secondaryFont: DARK_THEME_COLOR_MAPPINGS.lightGray,
  accent: GLOBAL_COLOR_MAPPINGS.mint,
  contrast: GLOBAL_COLOR_MAPPINGS.white,
  blackOpaque: GLOBAL_COLOR_MAPPINGS.blackTransparent,
  menuBackground: DARK_THEME_COLOR_MAPPINGS.deepNavy,
  menuBorder: GLOBAL_COLOR_MAPPINGS.white,
  white: GLOBAL_COLOR_MAPPINGS.white,
  black: GLOBAL_COLOR_MAPPINGS.black,
  opaqueContrast: DARK_THEME_COLOR_MAPPINGS.whiteTransparentLight,
  alert: GLOBAL_COLOR_MAPPINGS.alertRed,
};

export const globalTheme = {
  baseFontSize: `${baseFontSize}px`,
  fonts: FONTS,
  fontWeights: FONT_WEIGHTS,
  breakpoints: BREAKPOINTS,
};

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  *, *::before, *::after { 
    box-sizing: border-box; 
  }

  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  img {
    max-width: 100%;
    width: 100%;
    display: block;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  button, input, textarea, a {
    outline: none;
    border: 1px solid transparent;

    ${focusVisible({})}
  }

  a {
    text-decoration: none;
    outline: 1px solid transparent;
  }

  html {
    font-size: ${baseFontSize}px;
    height: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) => theme.fonts?.roboto};
    font-weight: ${({ theme }) => theme.fontWeights?.regular};
    color: ${({ theme }) => theme.primaryFont};
    line-height: 1.6;
    background: ${({ theme }) => theme.background};
    overflow-x: hidden;
    height: 100%;
    min-height: 100vh;
    min-height: 100dvh;
  }

  #root {
    height: 100%;
    min-height: 100vh;
    min-height: 100dvh;
  }

  .z-index_negative {
    z-index: ${Z_INDEX.negative};
  }

  .z-index_base {
    z-index: ${Z_INDEX.base};
  }

  .z-index_second {
    z-index: ${Z_INDEX.second};
  }

  .z-index_third {
    z-index: ${Z_INDEX.third};
  }
`;
