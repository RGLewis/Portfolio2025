import { theme } from "./global.styles";

export const device = {
  small: `(min-width: ${theme.breakpoints.small})`,
  medium: `(min-width: ${theme.breakpoints.medium})`,
  large: `(min-width: ${theme.breakpoints.large})`,
  extraLarge: `(min-width: ${theme.breakpoints.extraLarge})`,
};
