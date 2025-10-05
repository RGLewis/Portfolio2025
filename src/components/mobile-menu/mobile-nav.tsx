import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { zIndexClass, ZIndexLevel } from "@/global-styles";
import { Footer, Nav } from "../shared";
import { NavContainer } from "./styles";

type MobileNavProps = {
  isMenuOpen: boolean;
};

export const MobileNav: React.FC<MobileNavProps> = ({ isMenuOpen }) => {
  return (
    <NavContainer
      $isMenuOpen={isMenuOpen}
      {...zIndexClass(ZIndexLevel.SECOND)}
      data-testid={NAVIGATION_DATA_TEST_IDS.mobileNav}
    >
      <Nav />
      <Footer />
    </NavContainer>
  );
};
