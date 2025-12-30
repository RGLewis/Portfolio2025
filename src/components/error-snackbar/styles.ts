import {
  borderRadius,
  device,
  EasingTypes,
  pxToRem,
  SPACINGS,
} from "@/global-styles";
import { keyframes, styled } from "styled-components";
import { Body, HeadingFourth } from "../typography/typography.styles";

const slideInUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const StyledHeadingFourth = styled(HeadingFourth)`
  margin: 0 0 ${SPACINGS.sm} 0;
`;

export const StyledBody = styled(Body)`
  margin: 0;
`;

export const SnackbarContainer = styled.div`
  position: fixed;
  bottom: ${SPACINGS.lg};
  right: ${SPACINGS.lg};
  background-color: ${({ theme }) => theme.alert};
  color: ${({ theme }) => theme.contrast};
  padding: ${SPACINGS.md};
  ${borderRadius(8)};
  box-shadow: 0 ${SPACINGS.xs} ${SPACINGS.md}
    ${({ theme }) => theme.blackOpaque};
  min-width: ${pxToRem(300)};
  max-width: ${pxToRem(500)};
  width: 90%;
  animation: ${slideInUp} 300ms ${EasingTypes.EASE_OUT} forwards;

  @media ${device.medium} {
    width: auto;
    min-width: ${pxToRem(400)};
  }
`;
