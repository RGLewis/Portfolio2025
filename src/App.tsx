import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  darkTheme,
  GlobalStyle,
  globalTheme,
  lightTheme,
} from "./global-styles/global.styles";
import { useGetPageQuery } from "./hooks/use-get-page-query";
import { router } from "./routes";

export const App = () => {
  // TODO: Will go in context
  const [isLightMode, _setIsLightMode] = useState(true);

  // Test
  const { data: pageData, error: pageError } = useGetPageQuery(
    import.meta.env.VITE_CONTENTFUL_ABOUT_PAGE_ID
  );

  useEffect(() => {
    if (pageData) {
      console.log("Page Data:", pageData);
    }
    if (pageError) {
      console.error("Page Error:", pageError);
    }
  }, [pageData, pageError]);

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
