import { ERROR_SNACKBAR_CONTENT } from "@/assets/content";
import { SNACKBAR_DATA_TEST_IDS } from "@/constants";
import { ContentfulPageTypes } from "@/loaders/types";
import {
  expectNoA11yViolations,
  renderWithProviders,
} from "@/test-utils/test-utils";
import { screen } from "@testing-library/react";
import { ErrorSnackbar } from "./error-snackbar";

describe("ErrorSnackbar", () => {
  const { ABOUT_PAGE, EXPERIENCE_PAGE } = ContentfulPageTypes;
  const { errorSnackbarContainer } = SNACKBAR_DATA_TEST_IDS;

  it("renders nothing when isVisible is false", () => {
    const { queryByTestId } = renderWithProviders(
      <ErrorSnackbar isVisible={false} errorType={ABOUT_PAGE} />
    );

    expect(
      queryByTestId(errorSnackbarContainer(ABOUT_PAGE))
    ).not.toBeInTheDocument();
  });

  it("renders the snackbar when isVisible is true", () => {
    const { getByTestId } = renderWithProviders(
      <ErrorSnackbar isVisible={true} errorType={ABOUT_PAGE} />
    );

    const snackbar = getByTestId(errorSnackbarContainer(ABOUT_PAGE));

    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveRole("alert");
    expect(snackbar).toHaveAttribute("aria-live", "assertive");
  });

  it.each([ABOUT_PAGE, EXPERIENCE_PAGE])(
    "displays correct error message for %s error type",
    (errorType) => {
      renderWithProviders(
        <ErrorSnackbar isVisible={true} errorType={errorType} />
      );

      expect(
        screen.getByText(ERROR_SNACKBAR_CONTENT.body(errorType))
      ).toBeInTheDocument();
    }
  );

  it("renders the heading", () => {
    renderWithProviders(
      <ErrorSnackbar isVisible={true} errorType={ABOUT_PAGE} />
    );

    expect(
      screen.getByText(ERROR_SNACKBAR_CONTENT.heading)
    ).toBeInTheDocument();
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      await expectNoA11yViolations(
        <ErrorSnackbar isVisible={true} errorType={ABOUT_PAGE} />
      );
    });
  });
});
