import type { DefaultTheme } from "styled-components";

export type ThemeColors = Pick<
  DefaultTheme,
  | "background"
  | "backgroundOpaque"
  | "primaryFont"
  | "secondaryFont"
  | "headerAccent"
  | "accent"
  | "contrast"
  | "blackOpaque"
  | "menuBackground"
  | "menuBorder"
  | "white"
  | "black"
  | "opaqueContrast"
  | "alert"
>;
