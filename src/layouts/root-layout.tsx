import { Sidebar } from "@/components/sidebar/sidebar";

import { MobileMenu } from "@/components/mobile-menu/mobile-menu";
import { LAYOUT_DATA_TEST_IDS } from "@/constants";
import { BREAKPOINTS, zIndexClass, ZIndexLevel } from "@/global-styles";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Outlet } from "react-router-dom";
import { LayoutContainer, MainContent } from "./styles";

export const RootLayout = () => {
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.medium})`);

  const navComponent = isDesktop ? <Sidebar /> : <MobileMenu />;

  return (
    <LayoutContainer data-testid={LAYOUT_DATA_TEST_IDS.rootLayout}>
      {navComponent}
      <MainContent
        {...zIndexClass(ZIndexLevel.BASE)}
        data-testid={LAYOUT_DATA_TEST_IDS.mainContent}
      >
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};
