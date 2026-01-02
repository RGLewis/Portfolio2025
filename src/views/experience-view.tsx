import { EXPERIENCE_PAGE_CONTENT } from "@/assets/content";
import { Accordion } from "@/components/accordion";
import { ErrorSnackbar } from "@/components/error-snackbar";
import { HeroImage } from "@/components/hero-image";
import { RichTextWriteUp } from "@/components/rich-text-write-up";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { SkillsItem } from "@/components/skills-item";
import { TypographyVariants } from "@/components/typography/types";
import {
  HeadingFirst,
  HeadingSecond,
} from "@/components/typography/typography.styles";
import { useDelayedLoading } from "@/hooks/use-delayed-loading";
import { ContentfulPageTypes, type PageLoaderResult } from "@/loaders/types";
import {
  PageMappings,
  Slugs,
  type SkillsItem as SkillsItemType,
} from "@/types/content-types";
import { extractExperienceData } from "@/utils/page-data-utils";
import { useLoaderData } from "react-router-dom";
import { PageContainer } from "./styles";

export const ExperienceView = () => {
  const { EXPERIENCE_PAGE } = ContentfulPageTypes;
  const { image, title } = EXPERIENCE_PAGE_CONTENT;

  const loaderResult = useLoaderData() as PageLoaderResult;
  const data = loaderResult?.data;

  const isLoading = !data;
  const showLoader = useDelayedLoading(isLoading);
  const showError = loaderResult?.error === EXPERIENCE_PAGE;

  const {
    profileRichText,
    accordionItems,
    skillsItemCollection,
    educationRichText,
  } = extractExperienceData(data);

  const headingsSecondProps = {
    className: "underlined large",
    $variant: TypographyVariants.PRIMARY,
  };

  const RichTextWriteUpProps = {
    variant: TypographyVariants.PRIMARY,
    isUnderlined: true,
    isLarge: true,
  };

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
          <SkeletonLoader blocks={4} linesPerBlock={4} />
        ) : (
          <>
            <HeadingSecond id={Slugs.PROFILE} {...headingsSecondProps}>
              {PageMappings.PROFILE}
            </HeadingSecond>
            {profileRichText && (
              <RichTextWriteUp
                document={profileRichText.content.json}
                {...RichTextWriteUpProps}
              />
            )}

            <HeadingSecond id={Slugs.WORK} {...headingsSecondProps}>
              {PageMappings.WORK}
            </HeadingSecond>
            {accordionItems.map((item) => (
              <div key={item.sys.id}>
                <Accordion data={item} />
              </div>
            ))}

            <HeadingSecond id={Slugs.SKILLS} {...headingsSecondProps}>
              {PageMappings.SKILLS}
            </HeadingSecond>
            {skillsItemCollection.items.map((item: SkillsItemType) => (
              <SkillsItem key={item.title} data={item} />
            ))}

            <HeadingSecond id={Slugs.EDUCATION} {...headingsSecondProps}>
              {PageMappings.EDUCATION}
            </HeadingSecond>
            {educationRichText && (
              <RichTextWriteUp
                document={educationRichText.content.json}
                {...RichTextWriteUpProps}
              />
            )}
          </>
        )}
        <ErrorSnackbar isVisible={showError} errorType={EXPERIENCE_PAGE} />
      </PageContainer>
    </div>
  );
};
