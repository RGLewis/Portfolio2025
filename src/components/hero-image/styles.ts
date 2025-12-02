import styled from "styled-components";

export const StyledHeroImage = styled.img<{
  $isVerticalTop?: boolean;
}>`
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  height: auto;
  object-fit: cover;
  object-position: ${(props) =>
    props.$isVerticalTop ? "top center" : "center center"};
`;
