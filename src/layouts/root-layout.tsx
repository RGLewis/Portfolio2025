import { Sidebar } from "@/components/sidebar";

import { MobileMenu } from "@/components/mobile-menu";
import { LAYOUT_DATA_TEST_IDS } from "@/constants";
import { NavigationProvider } from "@/contexts";
import { BREAKPOINTS, zIndexClass, ZIndexLevel } from "@/global-styles";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./scroll-to-top";
import { LayoutContainer, MainContent } from "./styles";

export const RootLayout = () => {
  const { rootLayout, mainContent } = LAYOUT_DATA_TEST_IDS;

  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.medium})`);

  const navComponent = isDesktop ? <Sidebar /> : <MobileMenu />;

  return (
    <NavigationProvider>
      <ScrollToTop />
      <LayoutContainer data-testid={rootLayout}>
        {navComponent}
        <MainContent
          {...zIndexClass(ZIndexLevel.BASE)}
          data-testid={mainContent}
        >
          <Outlet />
        </MainContent>
      </LayoutContainer>
    </NavigationProvider>
  );
};
