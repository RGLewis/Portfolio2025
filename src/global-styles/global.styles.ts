import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import { BREAKPOINTS, COLORS, FONT_WEIGHTS, FONTS, Z_INDEX } from "./constants";

import { focusVisible } from "./mixins";
import { baseFontSize } from "./utils";

export const theme = {
  background: COLORS.white,
  backgroundOpaque: COLORS.whiteTransparent,
  primaryFont: COLORS.charcoal,
  secondaryFont: COLORS.slate,
  accent: COLORS.electricBlue,
  contrast: COLORS.black,
  blackOpaque: COLORS.blackTransparent,
  menuBackground: COLORS.electricBlue,
  menuBorder: COLORS.electricBlue,
  white: COLORS.white,
  black: COLORS.black,
  opaqueContrast: COLORS.blueTransparent,
  alert: COLORS.alertRed,
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
