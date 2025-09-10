import React from "react";
import { StyledHashLink } from "./nav.styles";
import type { HashLinkProps } from "./types";

export const HashLink = ({
  to,
  text,
  onClick,
  isActive,
  slug,
}: HashLinkProps) => {
  const scrollTo = (e: { preventDefault: () => void }) => {
    // prevent default scroll
    e.preventDefault();

    // get offset for mobile
    const element = document.getElementById(slug);
    if (!element) return; // element not found, do nothing
    const offset = 90; // 90 px fixed header
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    const scrollPosition = offsetPosition;

    // run smooth scroll
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    scrollTo(e);
    onClick();
  };

  return (
    <StyledHashLink
      href={to}
      onClick={(e) => {
        onLinkClick(e);
      }}
      isActive={isActive}
    >
      {text}
    </StyledHashLink>
  );
};
