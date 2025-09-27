import { HOME_PAGE_CONTENT } from "@/assets/content";
import { HeadingClasses, TypographyVariants } from "@/atoms/typography/types";
import {
  StyledHeadingFirst,
  StyledHeadingThird,
} from "@/atoms/typography/typography.styles";
import { prefetchPages } from "@/loaders/page-loaders";
import { useEffect } from "react";
import { Headshot, PageContainer } from "./styles";

export const HomeView = () => {
  useEffect(() => {
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
