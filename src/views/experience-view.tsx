import { EXPERIENCE_PAGE_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/atoms/typography/types";
import {
  StyledHeadingFirst,
  StyledHeadingSecond,
} from "@/atoms/typography/typography.styles";
import { Accordion } from "@/components/accordion";
import { HeroImage } from "@/components/hero-image";
import { RichTextWriteUp } from "@/components/rich-text-write-up";
import { SkillsItem } from "@/components/skills-item";
import {
  PageMappings,
  TypeNames,
  type PageData,
  type RichTextComponent,
  type SkillsComponent,
  type SkillsItem as SkillsItemType,
  type WorkAccordionComponent,
} from "@/types/content-types";
import { findComponentByTitle } from "@/utils/contentful-utils";
import { useLoaderData } from "react-router-dom";
import { PageContainer } from "./styles";

export const ExperienceView = () => {
  const data = useLoaderData() as PageData;

  const workAccordion = findComponentByTitle<WorkAccordionComponent>({
    data,
    typename: TypeNames.WORK_ACCORDION,
    title: PageMappings.WORK,
  });

  const skillsComponent = findComponentByTitle<SkillsComponent>({
    data,
    typename: TypeNames.SKILLS,
    title: PageMappings.SKILLS,
  });

  const profileRichText = findComponentByTitle<RichTextComponent>({
    data,
    typename: TypeNames.RICH_TEXT,
    title: PageMappings.PROFILE,
  });

  const educationRichText = findComponentByTitle<RichTextComponent>({
    data,
    typename: TypeNames.RICH_TEXT,
    title: PageMappings.EDUCATION,
  });

  const accordionItems = workAccordion?.accordionItemsCollection.items || [];
  const { skillsItemCollection } = skillsComponent || {
    skillsItemCollection: { items: [] },
  };

  return (
    <div>
      <HeroImage
        src={EXPERIENCE_PAGE_CONTENT.image.src}
        description={EXPERIENCE_PAGE_CONTENT.image.alt}
        isVerticalTop={true}
      />

      <PageContainer className="inner-page">
        <StyledHeadingFirst
          variant={TypographyVariants.WHITE}
          className="page-heading"
        >
          {EXPERIENCE_PAGE_CONTENT.title}
        </StyledHeadingFirst>

        <StyledHeadingSecond
          className="underlined large"
          variant={TypographyVariants.PRIMARY}
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
          className="underlined large"
          variant={TypographyVariants.PRIMARY}
        >
          {PageMappings.WORK}
        </StyledHeadingSecond>
        {accordionItems.map((item) => (
          <div key={item.sys.id}>
            <Accordion data={item} />
          </div>
        ))}

        <StyledHeadingSecond
          className="underlined large"
          variant={TypographyVariants.PRIMARY}
        >
          {PageMappings.SKILLS}
        </StyledHeadingSecond>
        {skillsItemCollection.items.map((item: SkillsItemType) => (
          <SkillsItem key={item.title} data={item} />
        ))}

        <StyledHeadingSecond
          className="underlined large"
          variant={TypographyVariants.PRIMARY}
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
        {/* TODO: Add loader */}
        {/* TODO: Add snackbar for errors */}
      </PageContainer>
    </div>
  );
};
