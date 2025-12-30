import { ERROR_SNACKBAR_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/components/typography/types";
import { SNACKBAR_DATA_TEST_IDS } from "@/constants";
import { getZIndexClass, ZIndexLevel } from "@/global-styles";
import { ContentfulPageTypes } from "@/loaders/types";
import React from "react";
import { SnackbarContainer, StyledBody, StyledHeadingFourth } from "./styles";

type ErrorSnackbarProps = {
  isVisible: boolean;
  errorType: ContentfulPageTypes;
};

export const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
  isVisible,
  errorType,
}) => {
  if (!isVisible) {
    return null;
  }

  const { heading, body } = ERROR_SNACKBAR_CONTENT;

  return (
    <SnackbarContainer
      role="alert"
      aria-live="assertive"
      className={getZIndexClass(ZIndexLevel.THIRD)}
      data-testid={SNACKBAR_DATA_TEST_IDS.errorSnackbarContainer(errorType)}
    >
      <StyledHeadingFourth $variant={TypographyVariants.CONTRAST}>
        {heading}
      </StyledHeadingFourth>
      <StyledBody $variant={TypographyVariants.CONTRAST}>
        {body(errorType)}
      </StyledBody>
    </SnackbarContainer>
  );
};
