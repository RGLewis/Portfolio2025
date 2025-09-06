import { device, pxToRem } from "@/global-styles";
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

  &.active {
    // font-weight: ${({ theme }) => theme.fontWeights.medium};
    // color: ${({ theme }) => theme.menuBackground};
  }

  &:hover:not(.active) {
    // color: ${({ theme }) => theme.menuBackground};
  }

  @media ${device.large} {
    font-size: ${pxToRem(50)};
  }
`;

export const StyledHashLink = styled.a<{ isActive?: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive ? theme.menuBackground : theme.white};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${pxToRem(16)};

  &[data-active="true"] {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  &:hover:not([data-active="true"]) {
    // color: ${({ theme }) => theme.menuBackground};
  }

  @media ${device.large} {
    font-size: ${pxToRem(30)};
  }
`;
