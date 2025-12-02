export const SKELETON_LOADER_DATA_TEST_IDS = {
  container: "skeleton-loader",
  block: (index: number) => `skeleton-block-${index}`,
  subheading: (index: number) => `skeleton-subheading-${index}`,
  line: (blockIndex: number, lineIndex: number) =>
    `skeleton-line-${blockIndex}-${lineIndex}`,
};
