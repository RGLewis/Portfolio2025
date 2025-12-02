import { SKELETON_LOADER_DATA_TEST_IDS } from "./constants";
import {
  SkeletonBlock,
  SkeletonContainer,
  SkeletonLine,
  SkeletonSubheading,
} from "./styles";

type SkeletonLoaderProps = {
  blocks: number;
  linesPerBlock: number;
  shouldShowSubheadings?: boolean;
};

export const SkeletonLoader = ({
  blocks,
  linesPerBlock,
  shouldShowSubheadings = true,
}: SkeletonLoaderProps) => {
  const { container, block, subheading, line } = SKELETON_LOADER_DATA_TEST_IDS;

  return (
    <SkeletonContainer
      data-testid={container}
      aria-busy="true"
      aria-label="Loading content"
    >
      {Array.from({ length: blocks }).map((_, blockIndex) => (
        <SkeletonBlock key={blockIndex} data-testid={block(blockIndex)}>
          {shouldShowSubheadings && (
            <SkeletonSubheading data-testid={subheading(blockIndex)} />
          )}
          {Array.from({ length: linesPerBlock }).map((_, lineIndex) => (
            <SkeletonLine
              key={lineIndex}
              className={lineIndex === linesPerBlock - 1 ? "last-line" : ""}
              data-testid={line(blockIndex, lineIndex)}
            />
          ))}
        </SkeletonBlock>
      ))}
    </SkeletonContainer>
  );
};
