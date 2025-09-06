import { NAV_CONTENT } from "@/assets/content";
import { PageMappings, type NavItem } from "@/types/content-types";
import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { styled } from "styled-components";
import { HashLink } from "./hash-link";
import { NavLink } from "./nav-link";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.white};
    outline-offset: 2px;
  }
`;

// TODO: Add animation to the expanding/collapsing of the experience sub-links
const SubLinksAnimationContainer = styled.div``;

export const Nav = () => {
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);

  const toggleExperienceExpanded = () => {
    setIsExperienceExpanded((prev) => !prev);
  };

  const mainLinks: NavItem[] = [];
  const experienceLinks: NavItem[] = [];

  Object.entries(NAV_CONTENT).forEach(([_, item]) => {
    if (item.slug) {
      experienceLinks.push(item);
    } else {
      mainLinks.push(item);
    }
  });

  return (
    <nav>
      <NavList>
        {mainLinks.map((item, idx) => {
          const isExperience = item.text === PageMappings.EXPERIENCE;
          const onClick = () => console.log(`clicked ${item.text}`);

          return (
            <ListItem key={item.text || idx}>
              <NavLink to={item.link} text={item.text} onClick={onClick} />
              {isExperience && (
                <IconButton
                  onClick={toggleExperienceExpanded}
                  aria-label="Show experience sections"
                  type="button"
                >
                  <PlusIcon weight="light" size={32} />
                </IconButton>
              )}
            </ListItem>
          );
        })}
      </NavList>

      {isExperienceExpanded && (
        <SubLinksAnimationContainer>
          <NavList>
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
      )}
    </nav>
  );
};
