import { borderRadius, device, pxToRem, SPACINGS } from "@/global-styles";
import { styled } from "styled-components";
import { SkillLevelPercentages } from "./types";

export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${SPACINGS.md};
`;

export const SkillsTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${pxToRem(14)};
  color: ${({ theme }) => theme.primaryFont};
  margin-bottom: ${SPACINGS.xs};
  text-transform: capitalize;

  @media ${device.large} {
    font-size: ${pxToRem(16)};
  }
`;

export const SkillsBar = styled.div`
  width: 100%;
  height: ${pxToRem(30)};
  background-color: ${({ theme }) => theme.white};
  border: ${pxToRem(2)} solid ${({ theme }) => theme.accent};
  ${borderRadius(4)}
  position: relative;
  overflow: hidden;
`;

export const LevelContainer = styled.div<{ $level: SkillLevelPercentages }>`
  height: 100%;
  background-color: ${({ theme }) => theme.accent};
  width: ${(props) => `${props.$level}%`};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: ${SPACINGS.sm};
`;

export const SkillsLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${pxToRem(12)};
  color: ${({ theme }) => theme.white};

  @media ${device.large} {
    font-size: ${pxToRem(14)};
  }
`;
