import { borderRadius, device, pxToRem, SPACINGS } from "@/global-styles";
import { keyframes, styled } from "styled-components";

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

export const SnackbarContainer = styled.div`
  position: fixed;
  bottom: ${SPACINGS.lg};
  right: ${SPACINGS.lg};
  background-color: ${({ theme }) => theme.alert};
  color: ${({ theme }) => theme.contrast};
  padding: ${SPACINGS.md};
  ${borderRadius(8)};
  box-shadow: 0 ${pxToRem(4)} ${pxToRem(12)} rgba(0, 0, 0, 0.15);
  min-width: ${pxToRem(300)};
  max-width: ${pxToRem(500)};
  width: 90%;
  animation: ${slideInUp} 300ms ease-out forwards;

  @media ${device.medium} {
    width: auto;
    min-width: ${pxToRem(400)};
  }

  h4 {
    margin: 0 0 ${SPACINGS.sm} 0;
  }

  p {
    margin: 0;
  }
`;
