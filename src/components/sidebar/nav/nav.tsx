import { NAV_CONTENT } from "@/assets/content";
import { heightAnimation, SPACINGS } from "@/global-styles";
import { PageMappings, type NavItem } from "@/types/content-types";
import { useState } from "react";
import { styled } from "styled-components";
import { ExpandCollapseButton } from "./expand-collapse-button";
import { HashLink } from "./hash-link";
import { ListItem, NavList, StyledNavLink } from "./nav.styles";

const SubLinksAnimationContainer = styled.div<{ isExpanded: boolean }>`
  ${({ isExpanded }) => heightAnimation(isExpanded)}
  margin-left: ${SPACINGS.lg};
`;

export const Nav = () => {
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);

  const toggleExperienceExpanded = () => {
    setIsExperienceExpanded((prev) => !prev);
  };

  const mainLinks: NavItem[] = [];
  const experienceLinks: NavItem[] = [];

  NAV_CONTENT.forEach((item) => {
    if (item.slug) {
      experienceLinks.push(item);
    } else {
      mainLinks.push(item);
    }
  });

  return (
    <nav>
      <NavList>
        {mainLinks.map((item) => {
          const isExperience = item.text === PageMappings.EXPERIENCE;

          return (
            <ListItem key={item.text}>
              <StyledNavLink
                to={item.link}
                aria-expanded={
                  isExperience && isExperienceExpanded ? "true" : "false"
                }
                aria-controls={isExperience ? "experience-submenu" : undefined}
                onClick={
                  isExperience
                    ? (e) => {
                        e.preventDefault();
                        toggleExperienceExpanded();
                      }
                    : undefined
                }
              >
                {item.text}
                {isExperience && (
                  <ExpandCollapseButton
                    isExpanded={isExperienceExpanded}
                    ariaLabel={
                      isExperienceExpanded
                        ? "Collapse experience menu"
                        : "Expand experience menu"
                    }
                  />
                )}
              </StyledNavLink>
            </ListItem>
          );
        })}
      </NavList>

      <SubLinksAnimationContainer isExpanded={isExperienceExpanded}>
        <NavList id="experience-submenu">
          {experienceLinks.map((item, idx) => (
            <ListItem key={item.text || idx}>
              <HashLink
                to={item.link}
                text={item.text}
                slug={item.slug as string}
                onClick={() => console.log(`clicked ${item.text}`)}
              />
            </ListItem>
          ))}
        </NavList>
      </SubLinksAnimationContainer>
    </nav>
  );
};
