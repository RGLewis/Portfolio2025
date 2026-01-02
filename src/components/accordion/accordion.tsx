import { ExpandCollapseButton } from "@/components/expand-collapse-button";
import { TypographyVariants } from "@/components/typography/types";
import { HeadingThird } from "@/components/typography/typography.styles";
import { ACCORDION_DATA_TEST_IDS } from "@/constants";
import type { WorkAccordionItem } from "@/types/content-types";
import { useState } from "react";
import { useTheme } from "styled-components";
import { RichTextWriteUp } from "../rich-text-write-up";
import {
  AccordionButtonContainer,
  AccordionContent,
  AccordionHeadingContainer,
  TopContainer,
} from "./styles";

type AccordionProps = {
  data: WorkAccordionItem;
};

export const Accordion = ({ data }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();

  const { workplace, jobTitle, sys, accordionContent } = data;

  const {
    accordionHeadingContainer,
    accordionButton,
    accordionContent: accordionContentTestId,
  } = ACCORDION_DATA_TEST_IDS;

  const jobText = workplace
    ? `${jobTitle.toUpperCase()}, ${workplace}`
    : jobTitle.toUpperCase();

  return (
    <>
      <TopContainer>
        <AccordionHeadingContainer
          data-testid={accordionHeadingContainer(sys.id)}
        >
          <HeadingThird $variant={TypographyVariants.PRIMARY}>
            {jobText}
          </HeadingThird>
        </AccordionHeadingContainer>

        <AccordionButtonContainer>
          <ExpandCollapseButton
            isExpanded={isExpanded}
            onClick={() => setIsExpanded((prev) => !prev)}
            ariaLabel={
              isExpanded
                ? "Collapse accordion content"
                : "Expand accordion content"
            }
            color={theme.accent}
            dataTestId={accordionButton(sys.id)}
            ariaControls={accordionContentTestId(sys.id)}
          />
        </AccordionButtonContainer>
      </TopContainer>

      <AccordionContent
        $isExpanded={isExpanded}
        data-testid={accordionContentTestId(sys.id)}
        id={accordionContentTestId(sys.id)}
      >
        {/* Inner div required for height animation */}
        <div>
          <RichTextWriteUp
            document={accordionContent.json}
            variant={TypographyVariants.PRIMARY}
            isLarge
          />
        </div>
      </AccordionContent>
    </>
  );
};
