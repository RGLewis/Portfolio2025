import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { useState } from "react";
import { MobileHeader } from "./mobile-header";
import { MobileNav } from "./mobile-nav";

export const MobileMenu = () => {
  const { mobileMenu } = NAVIGATION_DATA_TEST_IDS;
  const [isMenuOpen, setIsMenuIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuIsOpen(false);
  };

  return (
    <div data-testid={mobileMenu}>
      <MobileHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuIsOpen} />
      <MobileNav isMenuOpen={isMenuOpen} onLinkClick={handleLinkClick} />
    </div>
  );
};
