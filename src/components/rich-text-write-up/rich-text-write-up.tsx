import { TypographyVariants } from "@/components/typography/types";
import {
  Body,
  HeadingFifth,
  HeadingFirst,
  HeadingFourth,
  HeadingSecond,
  HeadingThird,
  ListItem,
  OrderedList,
  RichTextLink,
  UnorderedList,
} from "@/components/typography/typography.styles";
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
          <HeadingFirst
            $variant={variant}
            className={isUnderlined ? "underlined" : ""}
          >
            {children}
          </HeadingFirst>
        ),
        [BLOCKS.HEADING_2]: (_node: Block | Inline, children: ReactNode) => (
          <HeadingSecond
            $variant={variant}
            className={`${isUnderlined ? "underlined" : ""} ${
              isLarge ? "large" : ""
            }`.trim()}
          >
            {children}
          </HeadingSecond>
        ),
        [BLOCKS.HEADING_3]: (_node: Block | Inline, children: ReactNode) => (
          <HeadingThird $variant={variant}>{children}</HeadingThird>
        ),
        [BLOCKS.HEADING_4]: (_node: Block | Inline, children: ReactNode) => (
          <HeadingFourth $variant={variant}>{children}</HeadingFourth>
        ),
        [BLOCKS.HEADING_5]: (_node: Block | Inline, children: ReactNode) => (
          <HeadingFifth $variant={variant}>{children}</HeadingFifth>
        ),
        [BLOCKS.PARAGRAPH]: (_node: Block | Inline, children: ReactNode) => (
          <Body $variant={variant} className={isLarge ? "large" : ""}>
            {children}
          </Body>
        ),
        [BLOCKS.UL_LIST]: (_node: Block | Inline, children: ReactNode) => (
          <UnorderedList $variant={variant}>{children}</UnorderedList>
        ),
        [BLOCKS.OL_LIST]: (_node: Block | Inline, children: ReactNode) => (
          <OrderedList $variant={variant}>{children}</OrderedList>
        ),
        [BLOCKS.LIST_ITEM]: (_node: Block | Inline, children: ReactNode) => (
          <ListItem $variant={variant}>{children}</ListItem>
        ),
        [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => (
          <RichTextLink
            href={node.data.uri}
            $variant={variant}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </RichTextLink>
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
