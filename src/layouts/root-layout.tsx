import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Sidebar } from "../components/sidebar/sidebar";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;

  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

const MainContent = styled.main`
  flex: 1;
  min-width: 0; /* Prevent flex child from overflowing */
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
