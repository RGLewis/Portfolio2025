import { HOME_PAGE_CONTENT } from "@/assets/content";
import {
  HeadingClasses,
  TypographyVariants,
} from "@/components/typography/types";
import {
  HeadingFirst,
  HeadingSecond,
} from "@/components/typography/typography.styles";
import { HOME_PAGE_DATA_TEST_IDS } from "@/constants";
import { prefetchPages } from "@/loaders/page-loaders";
import { useEffect } from "react";
import { Headshot, PageContainer } from "./styles";

export const HomeView = () => {
  const { pageContainer, profileImage } = HOME_PAGE_DATA_TEST_IDS;
  const { name, tagline, image } = HOME_PAGE_CONTENT;

  useEffect(() => {
    prefetchPages();
  }, []);

  return (
    <PageContainer
      className="center-align center-justify"
      data-testid={pageContainer}
    >
      <Headshot src={image.src} alt={image.alt} data-testid={profileImage} />
      <HeadingFirst
        $variant={TypographyVariants.PRIMARY}
        className={HeadingClasses.UNDERLINED}
      >
        {name}
      </HeadingFirst>
      <HeadingSecond $variant={TypographyVariants.PRIMARY}>
        {tagline}
      </HeadingSecond>
    </PageContainer>
  );
};
