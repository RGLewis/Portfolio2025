import "styled-components";

declare module "styled-components" {
  // TODO: Improve types
  export interface DefaultTheme {
    background: string;
    backgroundOpaque: string;
    primaryFont: string;
    secondaryFont: string;
    headerAccent: string;
    accent: string;
    contrast: string;
    blackOpaque: string;
    menuBackground: string;
    menuBorder: string;
    white: string;
    black: string;
    opaqueContrast: string;
    alert: string;
    fonts: {
      roboto: string;
      montserrat: string;
    };
    fontWeights: {
      extraLight: string;
      light: string;
      regular: string;
      medium: string;
      bold: string;
      extraBold: string;
    };
    breakpoints: {
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
  }
}
