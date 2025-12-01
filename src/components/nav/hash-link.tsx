import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { useNavigationContext } from "@/contexts/navigation-context";
import React from "react";
import { StyledHashLink } from "./styles";
import type { HashLinkProps } from "./types";

// TODO: Add tests when functionality is complete
export const HashLink = ({
  to,
  text,
  onClick,
  slug,
  isExperienceExpanded,
}: HashLinkProps) => {
  const { experienceLink } = NAVIGATION_DATA_TEST_IDS;
  const { navigateToSection, activeSection } = useNavigationContext();

  const isActive = activeSection === slug;

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigateToSection(slug);
    onClick();
  };

  return (
    <StyledHashLink
      href={to}
      onClick={(e) => {
        onLinkClick(e);
      }}
      $isActive={isActive}
      tabIndex={isExperienceExpanded ? 0 : -1}
      data-testid={experienceLink(text)}
      data-slug={slug}
    >
      {text}
    </StyledHashLink>
  );
};
