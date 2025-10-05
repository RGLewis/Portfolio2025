import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { useState } from "react";
import { MobileHeader } from "./mobile-header";
import { MobileNav } from "./mobile-nav";

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuIsOpen] = useState(false);

  return (
    <div data-testid={NAVIGATION_DATA_TEST_IDS.mobileMenu}>
      <MobileHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuIsOpen} />
      <MobileNav isMenuOpen={isMenuOpen} />
    </div>
  );
};
