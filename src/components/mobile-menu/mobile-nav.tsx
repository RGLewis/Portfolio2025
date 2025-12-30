import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { getZIndexClass, ZIndexLevel } from "@/global-styles";
import { NavContainer } from "./styles";

type MobileNavProps = {
  isMenuOpen: boolean;
  onLinkClick: () => void;
};

export const MobileNav: React.FC<MobileNavProps> = ({
  isMenuOpen,
  onLinkClick,
}) => {
  const { mobileNav } = NAVIGATION_DATA_TEST_IDS;

  return (
    <NavContainer
      $isMenuOpen={isMenuOpen}
      className={getZIndexClass(ZIndexLevel.SECOND)}
      data-testid={mobileNav}
    >
      <Nav onLinkClick={onLinkClick} />
      <Footer />
    </NavContainer>
  );
};
