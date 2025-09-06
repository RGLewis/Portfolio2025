import { StyledNavLink } from "./nav.styles";
import type { NavLinkProps } from "./types";

export const NavLink = ({ to, text, onClick }: NavLinkProps) => {
  const handleOnLinkClick = () => {
    onClick();
  };

  return (
    <StyledNavLink to={to} onClick={handleOnLinkClick}>
      {text}
    </StyledNavLink>
  );
};
