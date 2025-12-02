import { ABOUT_PAGE_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/atoms/typography/types";
import { StyledHeadingFirst } from "@/atoms/typography/typography.styles";
import { HeroImage } from "@/components/hero-image";
import { RichTextWriteUp } from "@/components/rich-text-write-up";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { RICH_TEXT_DATA_TEST_IDS } from "@/constants";
import { type PageData } from "@/types/content-types";
import { extractAboutData } from "@/utils/page-data-utils";
import { useLoaderData } from "react-router-dom";
import { PageContainer } from "./styles";

export const AboutView = () => {
  const { richTextSection } = RICH_TEXT_DATA_TEST_IDS;
  const data = useLoaderData() as PageData;

  const showLoader = !data;

  const { aboutRichText } = extractAboutData(data);

  return (
    <div>
      <HeroImage
        src={ABOUT_PAGE_CONTENT.image.src}
        description={ABOUT_PAGE_CONTENT.image.alt}
        isVerticalTop={true}
      />

      <PageContainer className="inner-page">
        <StyledHeadingFirst
          $variant={TypographyVariants.WHITE}
          className="page-heading"
        >
          {ABOUT_PAGE_CONTENT.title}
        </StyledHeadingFirst>

        {showLoader ? (
          <SkeletonLoader
            blocks={2}
            linesPerBlock={5}
            shouldShowSubheadings={false}
          />
        ) : (
          <>
            {aboutRichText && (
              <RichTextWriteUp
                document={aboutRichText.content.json}
                variant={TypographyVariants.PRIMARY}
                isUnderlined
                isLarge
                dataTestId={richTextSection(ABOUT_PAGE_CONTENT.title)}
              />
            )}
          </>
        )}
        {/* TODO: Add snackbar for errors */}
      </PageContainer>
    </div>
  );
};
