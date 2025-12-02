import { TypographyVariants } from "@/atoms/typography/types";
import {
  StyledBody,
  StyledHeadingFifth,
  StyledHeadingFirst,
  StyledHeadingFourth,
  StyledHeadingSecond,
  StyledHeadingThird,
  StyledListItem,
  StyledOrderedList,
  StyledRichTextLink,
  StyledUnorderedList,
} from "@/atoms/typography/typography.styles";
import {
  documentToReactComponents,
  type Options,
  type RenderNode,
} from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  type Block,
  type Inline,
} from "@contentful/rich-text-types";
import type { ReactNode } from "react";
import { useMemo } from "react";
import type { RichTextWriteUpProps } from "./types";

/**
 * Renders Contentful rich text content with proper typography components.
 * Uses memoization for performance optimization.
 *
 * @example
 * ```tsx
 * <RichTextWriteUp
 *   document={pageData.content}
 *   variant={TypographyVariants.PRIMARY}
 *   isLarge
 * />
 * ```
 */
export const RichTextWriteUp: React.FC<RichTextWriteUpProps> = ({
  document,
  variant = TypographyVariants.PRIMARY,
  isUnderlined = false,
  isLarge = false,
  dataTestId,
}) => {
  const options: Options = useMemo(
    () => ({
      renderNode: {
        [BLOCKS.HEADING_1]: (_node: Block | Inline, children: ReactNode) => (
          <StyledHeadingFirst
            $variant={variant}
            className={isUnderlined ? "underlined" : ""}
          >
            {children}
          </StyledHeadingFirst>
        ),
        [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
          <StyledHeadingSecond
            $variant={variant}
            className={`${isUnderlined ? "underlined" : ""} ${
              isLarge ? "large" : ""
            }`.trim()}
          >
            {children}
          </StyledHeadingSecond>
        ),
        [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
          <StyledHeadingThird $variant={variant}>{children}</StyledHeadingThird>
        ),
        [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
          <StyledHeadingFourth $variant={variant}>
            {children}
          </StyledHeadingFourth>
        ),
        [BLOCKS.HEADING_5]: (_node: Block | Inline, children: ReactNode) => (
          <StyledHeadingFifth $variant={variant}>{children}</StyledHeadingFifth>
        ),
        [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
          <StyledBody $variant={variant} className={isLarge ? "large" : ""}>
            {children}
          </StyledBody>
        ),
        [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
          <StyledUnorderedList $variant={variant}>
            {children}
          </StyledUnorderedList>
        ),
        [BLOCKS.OL_LIST]: (_node: Block | Inline, children: ReactNode) => (
          <StyledOrderedList $variant={variant}>{children}</StyledOrderedList>
        ),
        [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => (
          <StyledListItem $variant={variant}>{children}</StyledListItem>
        ),
        [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => (
          <StyledRichTextLink
            href={node.data.uri}
            $variant={variant}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </StyledRichTextLink>
        ),
      } as RenderNode,
    }),
    [variant, isUnderlined, isLarge]
  );

  const content = useMemo(
    () => documentToReactComponents(document, options),
    [document, options]
  );

  return <div data-testid={dataTestId}>{content}</div>;
};
