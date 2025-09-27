import {
  device,
  focusVisible,
  OutlineOffsetTypes,
  pxToRem,
  SPACINGS,
  transition,
} from "@/global-styles";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.white};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${pxToRem(20)};
  line-height: 1.2;
  display: flex;
  align-items: center;
  flex: 1;
  padding: ${SPACINGS.xs};
  border-radius: ${pxToRem(4)};
  position: relative;
  overflow: hidden;
  ${transition({
    attr: "color",
  })}
  text-transform: uppercase;
  letter-spacing: ${pxToRem(2)};

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0%;
    background-color: ${({ theme }) => theme.white};
    ${transition({
      attr: "height",
    })}
    z-index: -1;
    border-radius: ${pxToRem(4)};
  }

  ${focusVisible({ outlineOffset: OutlineOffsetTypes.LARGE })}

  @media ${device.large} {
    font-size: ${pxToRem(50)};
    line-height: 1.1;
  }
`;

export const StyledHashLink = styled.a<{ isActive?: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.menuBackground : theme.white};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${pxToRem(16)};
  line-height: 1.2;
  padding: 0 ${SPACINGS.sm};
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: ${pxToRem(1.5)};
  ${transition({
    attr: "color",
  })}

  /* Create the peeling background effect */
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${({ isActive }) => (isActive ? "100%" : "0%")};
    background-color: ${({ theme }) => theme.white};
    ${transition({
      attr: "height",
    })}
    z-index: -1;
  }

  &:hover {
    color: ${({ theme }) => theme.menuBackground};

    &::before {
      height: 100%;
    }
  }

  ${focusVisible({})}

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

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: ${SPACINGS.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  border-radius: ${pxToRem(4)};

  ${focusVisible({})}

  &:hover {
    background-color: ${({ theme }) => theme.blackOpaque};
  }
`;
