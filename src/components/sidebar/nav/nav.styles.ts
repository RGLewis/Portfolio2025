import { device, focusVisible, pxToRem, SPACINGS } from "@/global-styles";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

/**
 * TODO:
 * Deal with hover and active states later
 * Deal with focus states
 */

const navLinkStyles = css`
  position: relative;
  padding: 0 ${pxToRem(10)};
  letter-spacing: ${pxToRem(2)};
  text-transform: uppercase;
  display: block;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.white} 0%,
    ${({ theme }) => theme.white} 100%
  );
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: ${pxToRem(0)} ${pxToRem(0)};
  transition: all 200ms ease-in-out;

  &:hover {
    background-size: ${pxToRem(10)} ${pxToRem(60)};
    color: ${({ theme }) => theme.menuBackground};
  }

  &.active,
  &[data-active="true"] {
    background-size: ${pxToRem(60)} ${pxToRem(60)};
    color: ${({ theme }) => theme.menuBackground};
  }
`;

export const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${pxToRem(20)};
  padding: ${SPACINGS.sm};
  display: flex;
  align-items: center;
  gap: ${SPACINGS.sm};

  ${focusVisible()} // TODO: Hover Styles
    @media ${device.large} {
    font-size: ${pxToRem(50)};
  }
`;

export const StyledHashLink = styled.a<{ isActive?: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.menuBackground : theme.white};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${pxToRem(16)};

  ${focusVisible()}

  @media ${device.large} {
    font-size: ${pxToRem(30)};
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  gap: ${SPACINGS.sm};
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

  ${focusVisible()}

  &:hover {
    background-color: ${({ theme }) => theme.blackOpaque};
  }
`;
