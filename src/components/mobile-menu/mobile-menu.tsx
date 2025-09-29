import { useState } from "react";
import { MobileHeader } from "./mobile-header";
import { MobileNav } from "./mobile-nav";

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuIsOpen] = useState(false);

  return (
    <>
      <MobileHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuIsOpen} />
      <MobileNav isMenuOpen={isMenuOpen} />
    </>
  );
};
