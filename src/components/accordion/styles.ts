import { heightAnimation, pxToRem } from "@/global-styles";
import styled from "styled-components";

export const TopContainer = styled.div`
  border-bottom: ${pxToRem(1)} solid ${({ theme }) => theme.secondaryFont};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: ${pxToRem(10)};
`;

export const AccordionHeadingContainer = styled.div`
  flex: 1;
  margin-right: ${pxToRem(10)};
`;

export const AccordionButtonContainer = styled.div`
  flex-shrink: 0;
  margin-left: ${pxToRem(10)};
  display: flex;
  justify-content: flex-end;
`;

export const AccordionContent = styled.div<{ $isExpanded: boolean }>`
  ${({ $isExpanded }) => heightAnimation($isExpanded)}
  padding: 0 ${pxToRem(10)};

  > div {
    padding: ${pxToRem(10)} 0;
  }
`;
