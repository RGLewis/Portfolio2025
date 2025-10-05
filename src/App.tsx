import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  darkTheme,
  GlobalStyle,
  globalTheme,
  lightTheme,
} from "./global-styles/global.styles";
import { router } from "./routes";

export const App = () => {
  // TODO: Will go in context
  const [isLightMode, _setIsLightMode] = useState(true);

  const currentTheme = {
    ...(isLightMode ? lightTheme : darkTheme),
    ...globalTheme,
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
