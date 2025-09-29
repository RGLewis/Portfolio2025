import { SPACINGS } from "@/global-styles";
import styled from "styled-components";

export const FooterLinksContainer = styled.ul`
  display: flex;
  flex-direction: row;
`;

export const ListItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
`;

export const FooterCopyContainer = styled.div`
  margin-top: ${SPACINGS.xs};
  display: flex;
  flex-direction: column;
  gap: ${SPACINGS.xs} 0;
`;
