import { ABOUT_PAGE_CONTENT } from "@/assets/content";
import { ErrorSnackbar } from "@/components/error-snackbar";
import { HeroImage } from "@/components/hero-image";
import { RichTextWriteUp } from "@/components/rich-text-write-up";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { TypographyVariants } from "@/components/typography/types";
import { HeadingFirst } from "@/components/typography/typography.styles";
import { RICH_TEXT_DATA_TEST_IDS } from "@/constants";
import { useDelayedLoading } from "@/hooks/use-delayed-loading";
import { ContentfulPageTypes, type PageLoaderResult } from "@/loaders/types";
import { extractAboutData } from "@/utils/page-data-utils";
import { useLoaderData } from "react-router-dom";
import { PageContainer } from "./styles";

export const AboutView = () => {
  const { richTextSection } = RICH_TEXT_DATA_TEST_IDS;
  const { ABOUT_PAGE } = ContentfulPageTypes;
  const { image, title } = ABOUT_PAGE_CONTENT;

  const loaderResult = useLoaderData() as PageLoaderResult;
  const data = loaderResult?.data;

  const isLoading = !data;
  const showLoader = useDelayedLoading(isLoading);
  const showError = loaderResult?.error === ABOUT_PAGE;

  const { aboutRichText } = extractAboutData(data);

  return (
    <div>
      <HeroImage src={image.src} description={image.alt} isVerticalTop={true} />

      <PageContainer className="inner-page">
        <HeadingFirst
          $variant={TypographyVariants.WHITE}
          className="page-heading"
        >
          {title}
        </HeadingFirst>

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
                dataTestId={richTextSection(title)}
              />
            )}
          </>
        )}
        <ErrorSnackbar isVisible={showError} errorType={ABOUT_PAGE} />
      </PageContainer>
    </div>
  );
};
