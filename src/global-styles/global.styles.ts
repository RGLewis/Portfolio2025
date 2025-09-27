import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import {
  BREAKPOINTS,
  DARK_THEME_COLOR_MAPPINGS,
  FONT_WEIGHTS,
  FONTS,
  GLOBAL_COLOR_MAPPINGS,
  LIGHT_THEME_COLOR_MAPPINGS,
} from "./constants";

import { baseFontSize } from "./utils";

export const lightTheme = {
  background: GLOBAL_COLOR_MAPPINGS.white,
  backgroundOpaque: LIGHT_THEME_COLOR_MAPPINGS.whiteTransparent,
  primaryFont: LIGHT_THEME_COLOR_MAPPINGS.charcoal,
  secondaryFont: LIGHT_THEME_COLOR_MAPPINGS.slate,
  headerAccent: GLOBAL_COLOR_MAPPINGS.mint,
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
  headerAccent: GLOBAL_COLOR_MAPPINGS.mint,
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

  * { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }

  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  img {
    max-width:100%;
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

    //TODO: Focus States
    // &:focus-visible {
    //   outline: 2px solid ${({ theme }) => theme.white};
    //   outline-offset: 2px;
    // }

    // &:active {
    //   border-color: ${({ theme }) => theme.accent};
    // }
  }

  /* override default */
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.white} inset;
    -moz-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.white} inset;
    box-shadow: 0 0 0px 1000px ${({ theme }) => theme.white} inset;
  }

  a {
    text-decoration: none;
    outline: 1px solid transparent;

    // TODO: FOCUS STATES
    // &:focus, &:active {
    //   outline-color: ${({ theme }) => theme.secondaryFont};
    // }
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

    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
  }

  #root {
    height: 100%;
    min-height: 100vh;

    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
  }
`;
