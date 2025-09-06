import { pxToRem } from "@/global-styles";
import styled from "styled-components";

// TODO: Responsive
// TODO: Collapse
export const StyledSidebar = styled.div`
  position: sticky;
  top: 0;
  min-width: ${pxToRem(200)};
  width: max-content;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.menuBackground};
  border-right: ${pxToRem(1)} solid ${({ theme }) => theme.menuBorder};
  padding: ${pxToRem(40)} ${pxToRem(20)};
  justify-content: space-between;
`;
