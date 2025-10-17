import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { zIndexClass, ZIndexLevel } from "@/global-styles";
import { StyledSidebar } from "./sidebar.styles";

export const Sidebar = () => {
  const { sidebar } = NAVIGATION_DATA_TEST_IDS;

  return (
    <StyledSidebar {...zIndexClass(ZIndexLevel.SECOND)} data-testid={sidebar}>
      <Nav />
      <Footer />
    </StyledSidebar>
  );
};
