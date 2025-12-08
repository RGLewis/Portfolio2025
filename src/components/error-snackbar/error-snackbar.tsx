import { ERROR_SNACKBAR_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/atoms/typography/types";
import {
  StyledBody,
  StyledHeadingFourth,
} from "@/atoms/typography/typography.styles";
import { SNACKBAR_DATA_TEST_IDS } from "@/constants";
import { zIndexClass, ZIndexLevel } from "@/global-styles";
import { PageLoadErrorTypes } from "@/loaders/types";
import React from "react";
import { SnackbarContainer } from "./styles";

type ErrorSnackbarProps = {
  isVisible: boolean;
  errorType: PageLoadErrorTypes;
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
      {...zIndexClass(ZIndexLevel.THIRD)}
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
