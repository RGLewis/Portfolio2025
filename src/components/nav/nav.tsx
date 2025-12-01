import { NAV_CONTENT } from "@/assets/content";
import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { useNavigationContext } from "@/contexts/navigation-context";
import { useIsDesktop } from "@/hooks/use-media-query";
import {
  PageMappings,
  type HashNavItem,
  type RouteNavItem,
} from "@/types/content-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

  const isDesktop = useIsDesktop();
  const location = useLocation();
  const { setActiveSection } = useNavigationContext();
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);

  const toggleExperienceExpanded = () => {
    setIsExperienceExpanded((prev) => !prev);
  };

  // Reset experience expanded state and active section when navigating away from Experience page
  useEffect(() => {
    if (location.pathname !== "/experience") {
      setIsExperienceExpanded(false);
      setActiveSection(null);
    }
  }, [location.pathname, setActiveSection]);

  const mainLinks: RouteNavItem[] = NAV_CONTENT.filter(
    (item): item is RouteNavItem => !("slug" in item)
  );

  const experienceLinks: HashNavItem[] = NAV_CONTENT.filter(
    (item): item is HashNavItem => "slug" in item
  );

  const handleOnLinkClick = () => {
    if (!isDesktop && isExperienceExpanded) {
      setIsExperienceExpanded(false);
    }
    onLinkClick?.();
  };

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
                onClick={handleOnLinkClick}
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
                  slug={slug}
                  onClick={handleOnLinkClick}
                  isExperienceExpanded={isExperienceExpanded}
                />
              </ListItem>
            );
          })}
        </NavList>
      </SubLinksAnimationContainer>
    </nav>
  );
};
