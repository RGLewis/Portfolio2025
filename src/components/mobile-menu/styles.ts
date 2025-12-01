import {
  borderRadius,
  focusVisible,
  MOBILE_HEADER_HEIGHT,
  pxToRem,
  transition,
} from "@/global-styles";
import styled, { css } from "styled-components";

enum Hamburger_Timings {
  FIRST = "0ms",
  SECOND = "50ms",
  THIRD = "100ms",
}

const hoverTransition = (delay: Hamburger_Timings) => css`
  ${transition({
    attr: "transform",
    speed: "150ms",
    delay,
  })}
`;

const NAV_OFFSET = 10;

export const HamburgerSpan = styled.span<{
  $isMenuOpen: boolean;
}>`
  height: ${pxToRem(1)};
  width: ${pxToRem(30)};
  border-bottom: ${pxToRem(4)} solid ${({ theme }) => theme.white};
  margin: ${pxToRem(3)} 0;
  ${transition({
    attr: "all",
    speed: "300ms",
  })}
  transform-origin: center;
  border-radius: ${(props) => (props.$isMenuOpen ? 0 : `${borderRadius(2)}`)};

  &:nth-child(1) {
    transform: ${(props) =>
      props.$isMenuOpen
        ? `translateY(${pxToRem(10)}) rotate(45deg)`
        : "translateY(0) rotate(0deg)"};

    button:hover & {
      transform: ${(props) =>
        props.$isMenuOpen
          ? `translateY(${pxToRem(10)}) rotate(45deg) scale(1.05)`
          : "scaleY(1.3)"};
      ${hoverTransition(Hamburger_Timings.FIRST)}
    }
  }

  &:nth-child(2) {
    width: ${pxToRem(20)};
    opacity: ${(props) => (props.$isMenuOpen ? 0 : 1)};
    transform: ${(props) => (props.$isMenuOpen ? "scaleX(0)" : "scaleX(1)")};

    button:hover & {
      transform: ${(props) =>
        props.$isMenuOpen ? "scaleX(0)" : "scaleY(1.3)"};
      ${hoverTransition(Hamburger_Timings.SECOND)}
    }
  }

  &:nth-child(3) {
    transform: ${(props) =>
      props.$isMenuOpen
        ? `translateY(${pxToRem(-10)}) rotate(-45deg)`
        : "translateY(0) rotate(0deg)"};

    button:hover & {
      transform: ${(props) =>
        props.$isMenuOpen
          ? `translateY(${pxToRem(-10)}) rotate(-45deg) scale(1.05)`
          : "scaleY(1.3)"};
      ${hoverTransition(Hamburger_Timings.THIRD)}
    }
  }
`;

export const HamburgerButton = styled.button`
  width: ${pxToRem(50)};
  height: ${pxToRem(50)};
  padding: ${pxToRem(10)};
  margin: ${pxToRem(10)};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;

  ${focusVisible({})}
`;

export const StyledMobileHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${pxToRem(MOBILE_HEADER_HEIGHT)};
  background: ${({ theme }) => theme.menuBackground};
`;

export const NavContainer = styled.div<{ $isMenuOpen: boolean }>`
  position: fixed;
  top: ${pxToRem(MOBILE_HEADER_HEIGHT)};
  padding: ${pxToRem(NAV_OFFSET * 2)};
  left: ${pxToRem(-NAV_OFFSET)};
  right: ${pxToRem(-NAV_OFFSET)};
  bottom: 0;
  background: ${({ theme }) => theme.menuBackground};
  transform: ${({ $isMenuOpen }) =>
    $isMenuOpen ? "translateX(0)" : "translateX(-100%)"};
  ${transition({
    attr: "transform",
    speed: "400ms",
    easing: "cubic-bezier(0.68, -0.05, 0.265, 1.05)",
  })}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
