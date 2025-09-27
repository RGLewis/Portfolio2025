import { Sidebar } from "@/components/sidebar/sidebar";
import { pxToRem, SIDEBAR_WIDTHS } from "@/global-styles";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;

  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

const MainContent = styled.main`
  flex: 1;
  min-width: 0;
  margin-left: ${pxToRem(SIDEBAR_WIDTHS.large)};
  background: ${({ theme }) => theme.background};
`;

export const RootLayout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};
