import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { zIndexClass, ZIndexLevel } from "@/global-styles";
import { Footer, Nav } from "../shared";
import { StyledSidebar } from "./sidebar.styles";

export const Sidebar = () => {
  return (
    <StyledSidebar
      {...zIndexClass(ZIndexLevel.SECOND)}
      data-testid={NAVIGATION_DATA_TEST_IDS.sidebar}
    >
      <Nav />
      <Footer />
    </StyledSidebar>
  );
};
