import { pxToRem } from "./utils";

export const borderRadius = (borderRadius: number) => `
border-radius: ${pxToRem(borderRadius)};
-webkit-border-radius: ${pxToRem(borderRadius)};
-moz-border-radius: ${pxToRem(borderRadius)};
`;
