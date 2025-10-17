import { ABOUT_PAGE_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/atoms/typography/types";
import { StyledHeadingFirst } from "@/atoms/typography/typography.styles";
import { HeroImage } from "@/components/hero-image";
import { RichTextWriteUp } from "@/components/rich-text-write-up";
import { RICH_TEXT_DATA_TEST_IDS } from "@/constants";
import {
  PageMappings,
  TypeNames,
  type PageData,
  type RichTextComponent,
} from "@/types/content-types";
import { findComponentByTitle } from "@/utils/contentful-utils";
import { useLoaderData } from "react-router-dom";
import { PageContainer } from "./styles";

export const AboutView = () => {
  const { richTextSection } = RICH_TEXT_DATA_TEST_IDS;
  const data = useLoaderData() as PageData;

  const aboutRichText = findComponentByTitle<RichTextComponent>({
    data,
    typename: TypeNames.RICH_TEXT,
    title: PageMappings.ABOUT,
  });

  return (
    <div>
      <HeroImage
        src={ABOUT_PAGE_CONTENT.image.src}
        description={ABOUT_PAGE_CONTENT.image.alt}
        isVerticalTop={true}
      />

      <PageContainer className="inner-page">
        <StyledHeadingFirst
          variant={TypographyVariants.WHITE}
          className="page-heading"
        >
          {ABOUT_PAGE_CONTENT.title}
        </StyledHeadingFirst>

        {aboutRichText && (
          <RichTextWriteUp
            document={aboutRichText.content.json}
            variant={TypographyVariants.PRIMARY}
            isUnderlined
            isLarge
            dataTestId={richTextSection(ABOUT_PAGE_CONTENT.title)}
          />
        )}
        {/* TODO: Add loader */}
        {/* TODO: Add snackbar for errors */}
      </PageContainer>
    </div>
  );
};
