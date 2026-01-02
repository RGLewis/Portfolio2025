import {
  borderRadius,
  device,
  focusVisible,
  heightAnimation,
  OutlineOffsetTypes,
  peelUpAnimation,
  pxToRem,
  SPACINGS,
  transition,
  ZIndexLevel,
} from "@/global-styles";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const navLinkBaseStyles = css`
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.2;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  ${transition({
    attr: "color",
  })}

  ${peelUpAnimation(({ theme }) => theme.white, ZIndexLevel.NEGATIVE)}
`;

export const StyledNavLink = styled(NavLink)`
  ${navLinkBaseStyles}

  font-size: ${pxToRem(20)};
  display: flex;
  align-items: center;
  flex: 1;
  padding: ${SPACINGS.xs};
  ${borderRadius(4)};
  letter-spacing: ${pxToRem(2)};

  &::before {
    height: 0%;
    ${borderRadius(4)};
  }

  ${focusVisible({ outlineOffset: OutlineOffsetTypes.LARGE })}

  @media ${device.medium} {
    font-size: ${pxToRem(30)};
    line-height: 1.1;
  }

  @media ${device.large} {
    font-size: ${pxToRem(50)};
    line-height: 1.1;
  }
`;

export const StyledHashLink = styled.a<{ $isActive?: boolean }>`
  ${navLinkBaseStyles}

  color: ${({ theme }) => theme.white};
  font-size: ${pxToRem(16)};
  padding: 0 ${SPACINGS.sm};
  letter-spacing: ${pxToRem(1.5)};
  text-decoration: ${({ $isActive }) => ($isActive ? "underline" : "none")};

  &:hover {
    color: ${({ theme }) => theme.menuBackground};
  }

  ${focusVisible({ outlineOffset: OutlineOffsetTypes.DEFAULT })}

  @media ${device.large} {
    font-size: ${pxToRem(30)};
    line-height: 1.1;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${SPACINGS.lg};
  width: fit-content;
  padding: ${pxToRem(4)} ${pxToRem(8)};
`;

export const ListItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  gap: ${SPACINGS.sm};
  position: relative;
  width: fit-content;

  &:hover a,
  &:has(a.active) a,
  &:has(a[data-active="true"]) a {
    color: ${({ theme }) => theme.menuBackground};

    &::before {
      height: 100%;
    }
  }
`;

export const SubLinksAnimationContainer = styled.div<{ $isExpanded: boolean }>`
  ${({ $isExpanded }) => heightAnimation($isExpanded)}
  margin-left: ${SPACINGS.lg};
  margin-top: ${SPACINGS.lg};
`;
