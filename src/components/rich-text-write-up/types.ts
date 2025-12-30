import type { TypographyVariants } from "@/components/typography/types";
import type { Document } from "@contentful/rich-text-types";

export type RichTextWriteUpProps = {
  /** The Contentful rich text document to render */
  document: Document;
  /** Typography variant for text elements */
  variant?: TypographyVariants;
  /** Whether headings should have underline styling */
  isUnderlined?: boolean;
  /** Whether body text should use large font size */
  isLarge?: boolean;
  /** Data test ID for testing purposes */
  dataTestId?: string;
};
