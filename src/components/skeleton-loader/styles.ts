import { SPACINGS, borderRadius } from "@/global-styles";
import { pxToRem } from "@/global-styles/utils";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const SkeletonContainer = styled.div`
  width: 100%;
  padding-bottom: ${SPACINGS.xl};
`;

export const SkeletonLine = styled.div`
  width: 100%;
  height: ${pxToRem(16)};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.blackOpaque} 0%,
    ${({ theme }) => theme.opaqueContrast} 50%,
    ${({ theme }) => theme.blackOpaque} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  margin-bottom: ${SPACINGS.md};
  ${borderRadius(4)}

  &.last-line {
    width: 80%;
  }
`;

export const SkeletonSubheading = styled(SkeletonLine)`
  height: ${pxToRem(28)};
  width: 30%;
  margin-bottom: ${SPACINGS.md};
  margin-top: ${SPACINGS.xl};
`;

export const SkeletonBlock = styled.div`
  margin-bottom: ${SPACINGS.xl};
`;
