import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { zIndexClass, ZIndexLevel } from "@/global-styles";
import { HamburgerButton, HamburgerSpan, StyledMobileHeader } from "./styles";

type MobileHeaderProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <StyledMobileHeader
      {...zIndexClass(ZIndexLevel.THIRD)}
      data-testid={NAVIGATION_DATA_TEST_IDS.mobileHeader}
    >
      <HamburgerButton
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        data-testid={NAVIGATION_DATA_TEST_IDS.hamburgerButton}
      >
        <HamburgerSpan $isMenuOpen={isMenuOpen} />
        <HamburgerSpan $isMenuOpen={isMenuOpen} />
        <HamburgerSpan $isMenuOpen={isMenuOpen} />
      </HamburgerButton>
    </StyledMobileHeader>
  );
};
