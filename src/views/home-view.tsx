import { HOME_PAGE_CONTENT } from "@/assets/content";
import { HeadingClasses, TypographyVariants } from "@/atoms/typography/types";
import {
  StyledHeadingFirst,
  StyledHeadingSecond,
} from "@/atoms/typography/typography.styles";
import { HOME_PAGE_DATA_TEST_IDS } from "@/constants";
import { prefetchPages } from "@/loaders/page-loaders";
import { useEffect } from "react";
import { Headshot, PageContainer } from "./styles";

export const HomeView = () => {
  const { pageContainer, profileImage } = HOME_PAGE_DATA_TEST_IDS;

  useEffect(() => {
    prefetchPages();
  }, []);

  return (
    <PageContainer
      className="center-align center-justify"
      data-testid={pageContainer}
    >
      <Headshot
        src={HOME_PAGE_CONTENT.image}
        alt={HOME_PAGE_CONTENT.alt}
        data-testid={profileImage}
      />
      <StyledHeadingFirst
        variant={TypographyVariants.PRIMARY}
        className={HeadingClasses.UNDERLINED}
      >
        {HOME_PAGE_CONTENT.name}
      </StyledHeadingFirst>
      <StyledHeadingSecond variant={TypographyVariants.PRIMARY}>
        {HOME_PAGE_CONTENT.tagline}
      </StyledHeadingSecond>
    </PageContainer>
  );
};
