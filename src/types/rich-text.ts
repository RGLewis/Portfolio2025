enum NodeType {
  TEXT = "text",
  HYPERLINK = "hyperlink",
  PARAGRAPH = "paragraph",
  LIST_ITEM = "list-item",
  UNORDERED_LIST = "unordered-list",
  DOCUMENT = "document",
}

type TextNode = {
  nodeType: NodeType.TEXT;
  value: string;
  marks: never[];
  data: Record<string, never>;
};

type HyperlinkNode = {
  nodeType: NodeType.HYPERLINK;
  data: {
    uri: string;
  };
  content: [TextNode];
};

type ParagraphContentNode = {
  nodeType: NodeType.PARAGRAPH;
  data: Record<string, never>;
  content: [TextNode, HyperlinkNode, TextNode];
};

type ListItemNode = {
  nodeType: NodeType.LIST_ITEM;
  data: Record<string, never>;
  content: [ParagraphContentNode];
};

type UnorderedListNode = {
  nodeType: NodeType.UNORDERED_LIST;
  data: Record<string, never>;
  content: ListItemNode[];
};

type EmptyParagraphNode = {
  nodeType: NodeType.PARAGRAPH;
  data: Record<string, never>;
  content: [TextNode];
};

export type RichTextDocument = {
  nodeType: NodeType.DOCUMENT;
  data: Record<string, never>;
  content: [UnorderedListNode, EmptyParagraphNode];
};
