import {
  device,
  EasingTypes,
  focusVisible,
  heightAnimation,
  OutlineOffsetTypes,
  pxToRem,
  SPACINGS,
  transition,
  Z_INDEX,
} from "@/global-styles";
import type { IconSizes, IconWeights } from "@/hooks/types";
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

  /* Shared peeling background effect */
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.white};
    ${transition({
      attr: "height",
    })}
    z-index: ${Z_INDEX.negative};
  }
`;

export const StyledNavLink = styled(NavLink)`
  ${navLinkBaseStyles}

  font-size: ${pxToRem(20)};
  display: flex;
  align-items: center;
  flex: 1;
  padding: ${SPACINGS.xs};
  border-radius: ${pxToRem(4)};
  letter-spacing: ${pxToRem(2)};

  &::before {
    height: 0%;
    border-radius: ${pxToRem(4)};
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

export const StyledHashLink = styled.a<{ isActive?: boolean }>`
  ${navLinkBaseStyles}

  color: ${({ theme, isActive }) =>
    isActive ? theme.menuBackground : theme.white};
  font-size: ${pxToRem(16)};
  padding: 0 ${SPACINGS.sm};
  letter-spacing: ${pxToRem(1.5)};

  &::before {
    height: ${({ isActive }) => (isActive ? "100%" : "0%")};
  }

  &:hover {
    color: ${({ theme }) => theme.menuBackground};

    &::before {
      height: 100%;
    }
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
  padding: ${pxToRem(2)};
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

export const IconButton = styled.button<{
  isExpanded: boolean;
  iconSize: IconSizes;
  iconWeight: IconWeights;
}>`
  background: none;
  border: none;
  padding: ${SPACINGS.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  border-radius: ${pxToRem(4)};
  width: ${({ iconSize }) => pxToRem(iconSize)};
  height: ${({ iconSize }) => pxToRem(iconSize)};
  position: relative;
  ${transition({
    attr: "color, transform",
  })}

  ${focusVisible({})}

  /* Subtle scale effect for button interactivity */
  &:hover {
    transform: scale(1.1);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: currentColor;
    ${transition({
      attr: "all",
      easing: EasingTypes.EASE,
    })}
  }

  /* Horizontal line (always visible) */
  &::before {
    width: ${({ iconSize }) => pxToRem(iconSize / 2)};
    height: ${({ iconWeight }) => pxToRem(iconWeight)};
    color: ${({ theme }) => theme.white};
  }

  /* Vertical line (rotates to become invisible when expanded) */
  &::after {
    width: ${({ iconWeight }) => pxToRem(iconWeight)};
    height: ${({ iconSize }) => pxToRem(iconSize / 2)};
    color: ${({ theme }) => theme.white};
    transform: ${({ isExpanded }) =>
      isExpanded ? "rotate(90deg) scale(0)" : "rotate(0deg) scale(1)"};
    opacity: ${({ isExpanded }) => (isExpanded ? 0 : 1)};
  }
`;

export const SubLinksAnimationContainer = styled.div<{ isExpanded: boolean }>`
  ${({ isExpanded }) => heightAnimation(isExpanded)}
  margin-left: ${SPACINGS.lg};
  margin-top: ${SPACINGS.lg};
`;
