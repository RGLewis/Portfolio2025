import { globalTheme } from "./global.styles";

export const device = {
  small: `(min-width: ${globalTheme.breakpoints.small})`,
  medium: `(min-width: ${globalTheme.breakpoints.medium})`,
  large: `(min-width: ${globalTheme.breakpoints.large})`,
  extraLarge: `(min-width: ${globalTheme.breakpoints.extraLarge})`,
};
