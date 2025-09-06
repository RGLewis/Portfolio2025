export enum NodeType {
  TEXT = "text",
  HYPERLINK = "hyperlink",
  PARAGRAPH = "paragraph",
  LIST_ITEM = "list-item",
  UNORDERED_LIST = "unordered-list",
  ORDERED_LIST = "ordered-list",
  DOCUMENT = "document",
}

export type Mark = {
  type: string;
};

// Node specific content types
type TextContent = {
  nodeType: NodeType.TEXT;
  value: string;
  marks: Mark[];
};

type HyperlinkContent = {
  nodeType: NodeType.HYPERLINK;
  data: {
    uri: string;
  };
  content: RichTextNode[];
};

type ParagraphContent = {
  nodeType: NodeType.PARAGRAPH;
  content: RichTextNode[];
};

type ListItemContent = {
  nodeType: NodeType.LIST_ITEM;
  content: RichTextNode[];
};

type ListContent = {
  nodeType: NodeType.UNORDERED_LIST | NodeType.ORDERED_LIST;
  content: ListItemContent[];
};

/**
 * Represents any node that can appear within a rich text document.
 * Note: Document nodes are handled separately as they are always root nodes.
 */
export type RichTextNode =
  | TextContent
  | HyperlinkContent
  | ParagraphContent
  | ListItemContent
  | ListContent;

/**
 * Represents the root document node that contains all other rich text nodes.
 */
export type RichTextDocument = {
  nodeType: NodeType.DOCUMENT;
  data: Record<string, never>;
  content: RichTextNode[];
};
