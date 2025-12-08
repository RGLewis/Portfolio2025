import { SKELETON_LOADER_DATA_TEST_IDS } from "@/constants";
import { renderWithProviders } from "@/test-utils/test-utils";
import { screen } from "@testing-library/react";
import { SkeletonLoader } from "./skeleton-loader";

const { container, block, subheading, line } = SKELETON_LOADER_DATA_TEST_IDS;

const defaultProps = {
  blocks: 1,
  linesPerBlock: 4,
};

describe("SkeletonLoader", () => {
  it("renders with 1 block and 4 lines each", () => {
    const { container: renderedContainer } = renderWithProviders(
      <SkeletonLoader {...defaultProps} />
    );

    const loader = screen.getByTestId(container);
    expect(loader).toBeInTheDocument();

    const blocks = renderedContainer.querySelectorAll(
      '[data-testid^="skeleton-block-"]'
    );
    const lines = renderedContainer.querySelectorAll(
      '[data-testid^="skeleton-line-"]'
    );

    expect(blocks).toHaveLength(1);
    expect(lines).toHaveLength(4);
  });

  it("renders the correct number of blocks", () => {
    const { container: renderedContainer } = renderWithProviders(
      <SkeletonLoader {...defaultProps} blocks={2} />
    );

    const blocks = renderedContainer.querySelectorAll(
      '[data-testid^="skeleton-block-"]'
    );
    expect(blocks).toHaveLength(2);
  });

  it("renders the correct number of lines per block", () => {
    const { container: renderedContainer } = renderWithProviders(
      <SkeletonLoader {...defaultProps} linesPerBlock={6} />
    );

    const lines = renderedContainer.querySelectorAll(
      '[data-testid^="skeleton-line-"]'
    );
    expect(lines).toHaveLength(6);
  });

  it("renders subheading for each block", () => {
    const { container: renderedContainer } = renderWithProviders(
      <SkeletonLoader {...defaultProps} />
    );

    const subheadings = renderedContainer.querySelectorAll(
      '[data-testid^="skeleton-subheading-"]'
    );
    expect(subheadings).toHaveLength(1);
  });

  it("renders blocks with correct structure", () => {
    renderWithProviders(<SkeletonLoader {...defaultProps} blocks={2} />);

    const block0 = screen.getByTestId(block(0));
    const subheading0 = screen.getByTestId(subheading(0));
    expect(block0).toContainElement(subheading0);

    const block1 = screen.getByTestId(block(1));
    const subheading1 = screen.getByTestId(subheading(1));
    expect(block1).toContainElement(subheading1);
  });

  it("renders last line with reduced width", () => {
    renderWithProviders(<SkeletonLoader {...defaultProps} />);

    const lastLine = screen.getByTestId(line(0, 3));
    expect(lastLine).toHaveStyle({ width: "80%" });
  });

  it("does not render subheadings when shouldShowSubheadings is false", () => {
    const { container: renderedContainer } = renderWithProviders(
      <SkeletonLoader {...defaultProps} shouldShowSubheadings={false} />
    );

    const subheadings = renderedContainer.querySelectorAll(
      '[data-testid^="skeleton-subheading-"]'
    );
    expect(subheadings).toHaveLength(0);
  });
});
