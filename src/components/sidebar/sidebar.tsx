import { zIndexClass, ZIndexLevel } from "@/global-styles";
import { Footer, Nav } from "../shared";
import { StyledSidebar } from "./sidebar.styles";

export const Sidebar = () => {
  return (
    <StyledSidebar {...zIndexClass(ZIndexLevel.SECOND)}>
      <Nav />
      <Footer />
    </StyledSidebar>
  );
};
