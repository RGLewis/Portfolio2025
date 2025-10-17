import { NAV_CONTENT } from "@/assets/content";
import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { PageMappings, type NavItem } from "@/types/content-types";
import { useState } from "react";
import { ExpandCollapseButton } from "../expand-collapse-button/expand-collapse-button";
import { HashLink } from "./hash-link";
import {
  ListItem,
  NavList,
  StyledNavLink,
  SubLinksAnimationContainer,
} from "./styles";

type NavProps = {
  onLinkClick?: () => void;
};

export const Nav: React.FC<NavProps> = ({ onLinkClick }) => {
  const { nav, navLink, expandCollapseButton, subLinksContainer } =
    NAVIGATION_DATA_TEST_IDS;

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
    <nav data-testid={nav}>
      <NavList>
        {mainLinks.map((item) => {
          const { text, link } = item;
          const isExperience = text === PageMappings.EXPERIENCE;

          return (
            <ListItem key={text}>
              <StyledNavLink
                to={link}
                onClick={onLinkClick}
                aria-expanded={
                  isExperience && isExperienceExpanded ? "true" : "false"
                }
                aria-controls={isExperience ? "experience-submenu" : undefined}
                data-testid={navLink(text)}
              >
                {text}
              </StyledNavLink>
              {isExperience && (
                <ExpandCollapseButton
                  isExpanded={isExperienceExpanded}
                  ariaLabel={
                    isExperienceExpanded
                      ? "Collapse experience menu"
                      : "Expand experience menu"
                  }
                  onClick={toggleExperienceExpanded}
                  dataTestId={expandCollapseButton}
                />
              )}
            </ListItem>
          );
        })}
      </NavList>

      <SubLinksAnimationContainer
        $isExpanded={isExperienceExpanded}
        data-testid={subLinksContainer}
        role="region"
        aria-label={`Experience submenu ${
          isExperienceExpanded ? "expanded" : "collapsed"
        }`}
      >
        <NavList id="experience-submenu">
          {experienceLinks.map((item, idx) => {
            const { text, link, slug } = item;

            return (
              <ListItem key={text || idx}>
                <HashLink
                  to={link}
                  text={text}
                  slug={slug as string}
                  onClick={() => {
                    console.log(`clicked ${text}`);
                    onLinkClick?.();
                  }}
                  tabIndex={isExperienceExpanded ? 0 : -1}
                />
              </ListItem>
            );
          })}
        </NavList>
      </SubLinksAnimationContainer>
    </nav>
  );
};
