import { Footer } from "./footer/footer";
import { Nav } from "./nav/nav";
import { StyledSidebar } from "./sidebar.styles";

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <Nav />
      <Footer />
    </StyledSidebar>
  );
};
