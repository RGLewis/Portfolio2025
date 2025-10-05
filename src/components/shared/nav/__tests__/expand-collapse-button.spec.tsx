import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { renderWithProviders } from "@/test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import { ExpandCollapseButton } from "../expand-collapse-button";

describe("ExpandCollapseButton", () => {
  const defaultProps = {
    isExpanded: false,
    ariaLabel: "Toggle menu",
    onClick: jest.fn(),
  };

  describe("Rendering", () => {
    it("renders the button with correct props", () => {
      const { getByTestId } = renderWithProviders(
        <ExpandCollapseButton {...defaultProps} />
      );

      expect(
        getByTestId(NAVIGATION_DATA_TEST_IDS.expandCollapseButton)
      ).toBeInTheDocument();
    });
  });
  describe("Interactions", () => {
    it("calls onClick when the button is clicked", async () => {
      const user = userEvent.setup();
      const onClickMock = jest.fn();

      const { getByTestId } = renderWithProviders(
        <ExpandCollapseButton {...defaultProps} onClick={onClickMock} />
      );

      const button = getByTestId(NAVIGATION_DATA_TEST_IDS.expandCollapseButton);
      await user.click(button);

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it("updates aria-expanded attribute based on isExpanded prop", () => {
      const { getByTestId, rerender } = renderWithProviders(
        <ExpandCollapseButton {...defaultProps} isExpanded={false} />
      );

      const button = getByTestId(NAVIGATION_DATA_TEST_IDS.expandCollapseButton);
      expect(button).toHaveAttribute("aria-expanded", "false");

      rerender(<ExpandCollapseButton {...defaultProps} isExpanded={true} />);
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("has the correct aria-label based on props", () => {
      const { getByTestId } = renderWithProviders(
        <ExpandCollapseButton {...defaultProps} />
      );

      const button = getByTestId(NAVIGATION_DATA_TEST_IDS.expandCollapseButton);
      expect(button).toHaveAttribute("aria-label", defaultProps.ariaLabel);
    });
  });
});
