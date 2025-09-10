import { useEffect } from "react";
import styled from "styled-components";
import { HOME_PAGE_CONTENT } from "../assets/content";
import { HeadingClasses, TypographyVariants } from "../atoms/typography/types";
import {
  StyledHeadingFirst,
  StyledHeadingThird,
} from "../atoms/typography/typography.styles";
import { pxToRem } from "../global-styles";
import { prefetchPages } from "../loaders/page-loaders";
import { PageContainer } from "./styles";

const Headshot = styled.img`
  width: ${pxToRem(300)};
  height: ${pxToRem(300)};
  border-radius: 50%;
  box-shadow: 0 ${pxToRem(3)} ${pxToRem(15)} ${({ theme }) => theme.blackOpaque};
  border: ${pxToRem(2)} solid ${({ theme }) => theme.accent};
  margin-bottom: ${pxToRem(20)};
`;

export const HomeView = () => {
  useEffect(() => {
    // Prefetch other pages when home loads
    prefetchPages();
  }, []);

  return (
    <PageContainer className="center-align center-justify">
      <Headshot src={HOME_PAGE_CONTENT.image} alt={HOME_PAGE_CONTENT.alt} />
      <StyledHeadingFirst
        variant={TypographyVariants.PRIMARY}
        className={HeadingClasses.UNDERLINED}
      >
        {HOME_PAGE_CONTENT.name}
      </StyledHeadingFirst>
      <StyledHeadingThird variant={TypographyVariants.PRIMARY}>
        {HOME_PAGE_CONTENT.tagline}
      </StyledHeadingThird>
    </PageContainer>
  );
};
