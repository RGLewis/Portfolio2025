import type { DefaultTheme } from "styled-components";

export type ThemeColors = Pick<
  DefaultTheme,
  | "background"
  | "backgroundOpaque"
  | "primaryFont"
  | "secondaryFont"
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

export enum EasingTypes {
  EASE_IN_OUT = "ease-in-out",
  EASE = "ease",
}

export enum OutlineOffsetTypes {
  LARGE = "large",
  DEFAULT = "default",
}
