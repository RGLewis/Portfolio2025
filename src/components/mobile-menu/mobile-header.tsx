import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { getZIndexClass, ZIndexLevel } from "@/global-styles";
import { HamburgerButton, HamburgerSpan, StyledMobileHeader } from "./styles";

type MobileHeaderProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { mobileHeader, hamburgerButton } = NAVIGATION_DATA_TEST_IDS;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <StyledMobileHeader
      className={getZIndexClass(ZIndexLevel.THIRD)}
      data-testid={mobileHeader}
    >
      <HamburgerButton
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        data-testid={hamburgerButton}
      >
        <HamburgerSpan $isMenuOpen={isMenuOpen} />
        <HamburgerSpan $isMenuOpen={isMenuOpen} />
        <HamburgerSpan $isMenuOpen={isMenuOpen} />
      </HamburgerButton>
    </StyledMobileHeader>
  );
};
