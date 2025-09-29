export enum NodeType {
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

type NavigationRichText = {
  nodeType: NodeType.DOCUMENT;
  data: Record<string, never>;
  content: [UnorderedListNode, EmptyParagraphNode];
};

export type NavigationData = {
  navigation: {
    title: string;
    headline: string;
    subheading: string;
    ctAsCollection: {
      items: Array<{
        sys: { id: string };
        title: string;
        hasIcon: boolean;
        iconLeads: boolean;
        prompt: string;
      }>;
    };
    navigationItemsCollection: {
      items: Array<{
        sys: { id: string };
        title: string;
        text: string;
        linksList: {
          json: NavigationRichText;
        };
      }>;
    };
  };
};

export enum IconSizes {
  MEDIUM = 30,
  LARGE = 40,
}

export enum IconWeights {
  THIN = 2,
  THICK = 3,
}
