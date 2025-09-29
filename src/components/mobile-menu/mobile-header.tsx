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
    <StyledMobileHeader {...zIndexClass(ZIndexLevel.THIRD)}>
      <HamburgerButton
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
      >
        <HamburgerSpan isMenuOpen={isMenuOpen} />
        <HamburgerSpan isMenuOpen={isMenuOpen} />
        <HamburgerSpan isMenuOpen={isMenuOpen} />
      </HamburgerButton>
    </StyledMobileHeader>
  );
};
