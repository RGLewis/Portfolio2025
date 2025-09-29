import { Sidebar } from "@/components/sidebar/sidebar";

import { MobileMenu } from "@/components/mobile-menu/mobile-menu";
import { zIndexClass, ZIndexLevel } from "@/global-styles";
import { useMobileViewport } from "@/hooks/use-mobile-viewport";
import { Outlet } from "react-router-dom";
import { LayoutContainer, MainContent } from "./styles";

export const RootLayout = () => {
  const isMobile = useMobileViewport();

  const navComponent = isMobile ? <MobileMenu /> : <Sidebar />;

  return (
    <LayoutContainer>
      {navComponent}
      <MainContent {...zIndexClass(ZIndexLevel.BASE)}>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};
