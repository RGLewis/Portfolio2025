import { EXPERIENCE_PAGE_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/atoms/typography/types";
import {
  StyledHeadingFirst,
  StyledHeadingSecond,
} from "@/atoms/typography/typography.styles";
import { Accordion } from "@/components/accordion";
import { ErrorSnackbar } from "@/components/error-snackbar";
import { HeroImage } from "@/components/hero-image";
import { RichTextWriteUp } from "@/components/rich-text-write-up";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { SkillsItem } from "@/components/skills-item";
import { useDelayedLoading } from "@/hooks/use-delayed-loading";
import { PageLoadErrorTypes, type PageLoaderResult } from "@/loaders/types";
import {
  PageMappings,
  Slugs,
  type SkillsItem as SkillsItemType,
} from "@/types/content-types";
import { extractExperienceData } from "@/utils/page-data-utils";
import { useLoaderData } from "react-router-dom";
import { PageContainer } from "./styles";

export const ExperienceView = () => {
  const loaderResult = useLoaderData() as PageLoaderResult;

  const isLoading = !loaderResult?.data;
  const showLoader = useDelayedLoading(isLoading);
  const showError = loaderResult?.error === PageLoadErrorTypes.EXPERIENCE_PAGE;

  const {
    profileRichText,
    accordionItems,
    skillsItemCollection,
    educationRichText,
  } = extractExperienceData(loaderResult?.data);

  return (
    <div>
      <HeroImage
        src={EXPERIENCE_PAGE_CONTENT.image.src}
        description={EXPERIENCE_PAGE_CONTENT.image.alt}
        isVerticalTop={true}
      />

      <PageContainer className="inner-page">
        <StyledHeadingFirst
          $variant={TypographyVariants.WHITE}
          className="page-heading"
        >
          {EXPERIENCE_PAGE_CONTENT.title}
        </StyledHeadingFirst>

        {showLoader ? (
          <SkeletonLoader blocks={4} linesPerBlock={4} />
        ) : (
          <>
            <StyledHeadingSecond
              id={Slugs.PROFILE}
              className="underlined large"
              $variant={TypographyVariants.PRIMARY}
            >
              {PageMappings.PROFILE}
            </StyledHeadingSecond>
            {profileRichText && (
              <RichTextWriteUp
                document={profileRichText.content.json}
                variant={TypographyVariants.PRIMARY}
                isUnderlined
                isLarge
              />
            )}

            <StyledHeadingSecond
              id={Slugs.WORK}
              className="underlined large"
              $variant={TypographyVariants.PRIMARY}
            >
              {PageMappings.WORK}
            </StyledHeadingSecond>
            {accordionItems.map((item) => (
              <div key={item.sys.id}>
                <Accordion data={item} />
              </div>
            ))}

            <StyledHeadingSecond
              id={Slugs.SKILLS}
              className="underlined large"
              $variant={TypographyVariants.PRIMARY}
            >
              {PageMappings.SKILLS}
            </StyledHeadingSecond>
            {skillsItemCollection.items.map((item: SkillsItemType) => (
              <SkillsItem key={item.title} data={item} />
            ))}

            <StyledHeadingSecond
              id={Slugs.EDUCATION}
              className="underlined large"
              $variant={TypographyVariants.PRIMARY}
            >
              {PageMappings.EDUCATION}
            </StyledHeadingSecond>
            {educationRichText && (
              <RichTextWriteUp
                document={educationRichText.content.json}
                variant={TypographyVariants.PRIMARY}
                isUnderlined
                isLarge
              />
            )}
          </>
        )}
        <ErrorSnackbar
          isVisible={showError}
          errorType={PageLoadErrorTypes.EXPERIENCE_PAGE}
        />
      </PageContainer>
    </div>
  );
};
