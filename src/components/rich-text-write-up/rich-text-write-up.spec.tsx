import { TypographyVariants } from "@/components/typography/types";
import { MOCK_RICH_TEXT_CONTENT } from "@/test-utils/factories";
import { renderWithProviders } from "@/test-utils/test-utils";
import { BLOCKS, INLINES, type Document } from "@contentful/rich-text-types";
import { RichTextWriteUp } from "./rich-text-write-up";

const TEST_CONTENT = {
  PARAGRAPH: "This is a paragraph",
  HEADING_1: "Main Heading",
  HEADING_2: "Section Heading",
  HEADING_3: "Subsection Heading",
  HEADING_4: "Minor Heading",
  HEADING_5: "Smallest Heading",
  LIST_ITEM: "List item text",
  LINK_TEXT: "Click here",
  LINK_URL: "https://example.com",
};

const HTML_ELEMENTS = {
  H1: "H1",
  H2: "H2",
  H3: "H3",
  H4: "H4",
  H5: "H5",
  P: "P",
  A: "A",
  UL: "UL",
  OL: "OL",
  LI: "LI",
};

const CSS_CLASSES = {
  UNDERLINED: "underlined",
  LARGE: "large",
};

const createTextNode = (value: string) => ({
  nodeType: "text" as const,
  value,
  marks: [],
  data: {},
});

const createBlockNode = (nodeType: BLOCKS, content: string) => ({
  nodeType,
  data: {},
  content: [createTextNode(content)],
});

const createDocument = (content: any[]): Document => ({
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content,
});

const createLinkNode = (url: string, text: string) => ({
  nodeType: BLOCKS.PARAGRAPH as const,
  data: {},
  content: [
    {
      nodeType: INLINES.HYPERLINK,
      data: { uri: url },
      content: [createTextNode(text)],
    },
  ],
});

const createListWithItems = (
  listType: BLOCKS.UL_LIST | BLOCKS.OL_LIST,
  items: string[]
) => ({
  nodeType: listType,
  data: {},
  content: items.map((item) => ({
    nodeType: BLOCKS.LIST_ITEM as const,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH as const,
        data: {},
        content: [createTextNode(item)],
      },
    ],
  })),
});

const expectElementWithTag = (
  container: ReturnType<typeof renderWithProviders>,
  text: string,
  expectedTag: string
) => {
  const element = container.getByText(text);
  expect(element.tagName).toBe(expectedTag);
};

const expectElementParentWithTag = (
  container: ReturnType<typeof renderWithProviders>,
  text: string,
  expectedTag: string
) => {
  const element = container.getByText(text);
  expect(element.parentElement?.tagName).toBe(expectedTag);
};

const expectElementWithClass = (
  element: HTMLElement,
  className: string,
  shouldHave = true
) => {
  if (shouldHave) {
    expect(element).toHaveClass(className);
  } else {
    expect(element).not.toHaveClass(className);
  }
};

describe("RichTextWriteUp", () => {
  const defaultProps = {
    document: createDocument([
      createBlockNode(BLOCKS.PARAGRAPH, MOCK_RICH_TEXT_CONTENT),
    ]),
    variant: TypographyVariants.PRIMARY,
  };

  describe("Basic Rendering", () => {
    it("renders the component with rich text content", () => {
      const { getByText } = renderWithProviders(
        <RichTextWriteUp {...defaultProps} />
      );

      getByText(MOCK_RICH_TEXT_CONTENT);
    });

    it("renders paragraph with correct element type", () => {
      const { getByText } = renderWithProviders(
        <RichTextWriteUp {...defaultProps} />
      );

      const paragraph = getByText(MOCK_RICH_TEXT_CONTENT);
      expect(paragraph.tagName).toBe(HTML_ELEMENTS.P);
    });
  });

  describe("Heading Elements", () => {
    it.each([
      {
        block: BLOCKS.HEADING_1,
        content: TEST_CONTENT.HEADING_1,
        expectedTag: HTML_ELEMENTS.H1,
        description: "renders H1 heading",
      },
      {
        block: BLOCKS.HEADING_2,
        content: TEST_CONTENT.HEADING_2,
        expectedTag: HTML_ELEMENTS.H2,
        description: "renders H2 heading",
      },
      {
        block: BLOCKS.HEADING_3,
        content: TEST_CONTENT.HEADING_3,
        expectedTag: HTML_ELEMENTS.H3,
        description: "renders H3 heading",
      },
      {
        block: BLOCKS.HEADING_4,
        content: TEST_CONTENT.HEADING_4,
        expectedTag: HTML_ELEMENTS.H4,
        description: "renders H4 heading",
      },
      {
        block: BLOCKS.HEADING_5,
        content: TEST_CONTENT.HEADING_5,
        expectedTag: HTML_ELEMENTS.H5,
        description: "renders H5 heading",
      },
    ])("$description with correct tag", ({ block, content, expectedTag }) => {
      const props = {
        document: createDocument([createBlockNode(block, content)]),
        variant: TypographyVariants.PRIMARY,
      };

      const container = renderWithProviders(<RichTextWriteUp {...props} />);
      expectElementWithTag(container, content, expectedTag);
    });
  });

  describe("List Elements", () => {
    it("renders unordered list with multiple items", () => {
      const items = ["First item", "Second item", "Third item"];
      const props = {
        document: createDocument([createListWithItems(BLOCKS.UL_LIST, items)]),
        variant: TypographyVariants.PRIMARY,
      };

      const container = renderWithProviders(<RichTextWriteUp {...props} />);

      const list = container.container.querySelector(
        HTML_ELEMENTS.UL.toLowerCase()
      );
      expect(list).toBeInTheDocument();

      items.forEach((item) => {
        expectElementParentWithTag(container, item, HTML_ELEMENTS.LI);
      });
    });

    it("renders ordered list with multiple items", () => {
      const items = ["Step one", "Step two", "Step three"];
      const props = {
        document: createDocument([createListWithItems(BLOCKS.OL_LIST, items)]),
        variant: TypographyVariants.PRIMARY,
      };

      const container = renderWithProviders(<RichTextWriteUp {...props} />);

      const list = container.container.querySelector(
        HTML_ELEMENTS.OL.toLowerCase()
      );
      expect(list).toBeInTheDocument();

      items.forEach((item) => {
        expectElementParentWithTag(container, item, HTML_ELEMENTS.LI);
      });
    });
  });

  describe("Hyperlinks", () => {
    it("renders hyperlinks with correct attributes", () => {
      const props = {
        document: createDocument([
          createLinkNode(TEST_CONTENT.LINK_URL, TEST_CONTENT.LINK_TEXT),
        ]),
        variant: TypographyVariants.PRIMARY,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      const link = getByText(TEST_CONTENT.LINK_TEXT) as HTMLAnchorElement;
      expect(link.tagName).toBe(HTML_ELEMENTS.A);
      expect(link).toHaveAttribute("href", TEST_CONTENT.LINK_URL);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Typography Variants", () => {
    it.each([
      {
        variant: TypographyVariants.PRIMARY,
        description: "renders with PRIMARY variant",
      },
      {
        variant: TypographyVariants.SECONDARY,
        description: "renders with SECONDARY variant",
      },
      {
        variant: TypographyVariants.CONTRAST,
        description: "renders with CONTRAST variant",
      },
      {
        variant: TypographyVariants.WHITE,
        description: "renders with WHITE variant",
      },
      {
        variant: TypographyVariants.ACCENT,
        description: "renders with ACCENT variant",
      },
    ])("$description", ({ variant }) => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.PARAGRAPH, TEST_CONTENT.PARAGRAPH),
        ]),
        variant,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      getByText(TEST_CONTENT.PARAGRAPH);
    });

    it("defaults to PRIMARY variant when variant prop is omitted", () => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.PARAGRAPH, TEST_CONTENT.PARAGRAPH),
        ]),
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      getByText(TEST_CONTENT.PARAGRAPH);
    });
  });

  describe("Optional Props", () => {
    it("applies large class to paragraph when isLarge is true", () => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.PARAGRAPH, TEST_CONTENT.PARAGRAPH),
        ]),
        variant: TypographyVariants.PRIMARY,
        isLarge: true,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      const paragraph = getByText(TEST_CONTENT.PARAGRAPH);
      expectElementWithClass(paragraph, CSS_CLASSES.LARGE, true);
    });

    it("does not apply large class when isLarge is false", () => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.PARAGRAPH, TEST_CONTENT.PARAGRAPH),
        ]),
        variant: TypographyVariants.PRIMARY,
        isLarge: false,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      const paragraph = getByText(TEST_CONTENT.PARAGRAPH);
      expectElementWithClass(paragraph, CSS_CLASSES.LARGE, false);
    });

    it("applies underlined class to H1 when isUnderlined is true", () => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.HEADING_1, TEST_CONTENT.HEADING_1),
        ]),
        variant: TypographyVariants.PRIMARY,
        isUnderlined: true,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      const heading = getByText(TEST_CONTENT.HEADING_1);
      expectElementWithClass(heading, CSS_CLASSES.UNDERLINED, true);
    });

    it("applies large class to H2 when isLarge is true", () => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.HEADING_2, TEST_CONTENT.HEADING_2),
        ]),
        variant: TypographyVariants.PRIMARY,
        isLarge: true,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      const heading = getByText(TEST_CONTENT.HEADING_2);
      expectElementWithClass(heading, CSS_CLASSES.LARGE, true);
    });

    it("applies underlined class to H2 when isUnderlined is true", () => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.HEADING_2, TEST_CONTENT.HEADING_2),
        ]),
        variant: TypographyVariants.PRIMARY,
        isUnderlined: true,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      const heading = getByText(TEST_CONTENT.HEADING_2);
      expectElementWithClass(heading, CSS_CLASSES.UNDERLINED, true);
    });

    it("applies underlined and large classes to H2 when both props are true", () => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.HEADING_2, TEST_CONTENT.HEADING_2),
        ]),
        variant: TypographyVariants.PRIMARY,
        isUnderlined: true,
        isLarge: true,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      const heading = getByText(TEST_CONTENT.HEADING_2);
      expectElementWithClass(heading, CSS_CLASSES.UNDERLINED, true);
      expectElementWithClass(heading, CSS_CLASSES.LARGE, true);
    });

    it("defaults isUnderlined to false when prop is omitted", () => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.HEADING_1, TEST_CONTENT.HEADING_1),
        ]),
        variant: TypographyVariants.PRIMARY,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      const heading = getByText(TEST_CONTENT.HEADING_1);
      expectElementWithClass(heading, CSS_CLASSES.UNDERLINED, false);
    });

    it("defaults isLarge to false when prop is omitted", () => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.PARAGRAPH, TEST_CONTENT.PARAGRAPH),
        ]),
        variant: TypographyVariants.PRIMARY,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      const paragraph = getByText(TEST_CONTENT.PARAGRAPH);
      expectElementWithClass(paragraph, CSS_CLASSES.LARGE, false);
    });
  });

  describe("Complex Documents", () => {
    it("renders mixed content with multiple block types", () => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.HEADING_1, TEST_CONTENT.HEADING_1),
          createBlockNode(BLOCKS.PARAGRAPH, TEST_CONTENT.PARAGRAPH),
          createBlockNode(BLOCKS.HEADING_2, TEST_CONTENT.HEADING_2),
          createListWithItems(BLOCKS.UL_LIST, [
            TEST_CONTENT.LIST_ITEM,
            "Another item",
          ]),
        ]),
        variant: TypographyVariants.PRIMARY,
      };

      const container = renderWithProviders(<RichTextWriteUp {...props} />);

      expectElementWithTag(container, TEST_CONTENT.HEADING_1, HTML_ELEMENTS.H1);
      expectElementWithTag(container, TEST_CONTENT.PARAGRAPH, HTML_ELEMENTS.P);
      expectElementWithTag(container, TEST_CONTENT.HEADING_2, HTML_ELEMENTS.H2);
      expectElementParentWithTag(
        container,
        TEST_CONTENT.LIST_ITEM,
        HTML_ELEMENTS.LI
      );
    });

    it("renders multiple paragraphs correctly", () => {
      const paragraphs = [
        "First paragraph content",
        "Second paragraph content",
        "Third paragraph content",
      ];
      const props = {
        document: createDocument(
          paragraphs.map((p) => createBlockNode(BLOCKS.PARAGRAPH, p))
        ),
        variant: TypographyVariants.PRIMARY,
      };

      const container = renderWithProviders(<RichTextWriteUp {...props} />);

      paragraphs.forEach((text) => {
        expectElementWithTag(container, text, HTML_ELEMENTS.P);
      });
    });

    it("renders link inside a list item", () => {
      const linkInList = {
        nodeType: BLOCKS.LIST_ITEM as const,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH as const,
            data: {},
            content: [
              {
                nodeType: INLINES.HYPERLINK,
                data: { uri: TEST_CONTENT.LINK_URL },
                content: [createTextNode(TEST_CONTENT.LINK_TEXT)],
              },
            ],
          },
        ],
      };

      const props = {
        document: createDocument([
          {
            nodeType: BLOCKS.UL_LIST,
            data: {},
            content: [linkInList],
          },
        ]),
        variant: TypographyVariants.PRIMARY,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      const link = getByText(TEST_CONTENT.LINK_TEXT) as HTMLAnchorElement;
      expect(link.tagName).toBe(HTML_ELEMENTS.A);
      expect(link).toHaveAttribute("href", TEST_CONTENT.LINK_URL);
    });

    it("renders document with all heading levels", () => {
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.HEADING_1, TEST_CONTENT.HEADING_1),
          createBlockNode(BLOCKS.HEADING_2, TEST_CONTENT.HEADING_2),
          createBlockNode(BLOCKS.HEADING_3, TEST_CONTENT.HEADING_3),
          createBlockNode(BLOCKS.HEADING_4, TEST_CONTENT.HEADING_4),
          createBlockNode(BLOCKS.HEADING_5, TEST_CONTENT.HEADING_5),
        ]),
        variant: TypographyVariants.PRIMARY,
      };

      const container = renderWithProviders(<RichTextWriteUp {...props} />);

      expectElementWithTag(container, TEST_CONTENT.HEADING_1, HTML_ELEMENTS.H1);
      expectElementWithTag(container, TEST_CONTENT.HEADING_2, HTML_ELEMENTS.H2);
      expectElementWithTag(container, TEST_CONTENT.HEADING_3, HTML_ELEMENTS.H3);
      expectElementWithTag(container, TEST_CONTENT.HEADING_4, HTML_ELEMENTS.H4);
      expectElementWithTag(container, TEST_CONTENT.HEADING_5, HTML_ELEMENTS.H5);
    });

    it("renders both ordered and unordered lists in same document", () => {
      const ulItems = ["UL item 1", "UL item 2"];
      const olItems = ["OL item 1", "OL item 2"];

      const props = {
        document: createDocument([
          createListWithItems(BLOCKS.UL_LIST, ulItems),
          createListWithItems(BLOCKS.OL_LIST, olItems),
        ]),
        variant: TypographyVariants.PRIMARY,
      };

      const container = renderWithProviders(<RichTextWriteUp {...props} />);

      const ul = container.container.querySelector(
        HTML_ELEMENTS.UL.toLowerCase()
      );
      const ol = container.container.querySelector(
        HTML_ELEMENTS.OL.toLowerCase()
      );

      expect(ul).toBeInTheDocument();
      expect(ol).toBeInTheDocument();

      [...ulItems, ...olItems].forEach((item) => {
        expectElementParentWithTag(container, item, HTML_ELEMENTS.LI);
      });
    });
  });

  describe("Edge Cases", () => {
    it("renders empty document gracefully", () => {
      const props = {
        document: createDocument([]),
        variant: TypographyVariants.PRIMARY,
      };

      const { container } = renderWithProviders(<RichTextWriteUp {...props} />);

      expect(container).toBeInTheDocument();
    });

    it("renders document with single text node", () => {
      const singleText = "Just some text";
      const props = {
        document: createDocument([
          createBlockNode(BLOCKS.PARAGRAPH, singleText),
        ]),
        variant: TypographyVariants.PRIMARY,
      };

      const { getByText } = renderWithProviders(<RichTextWriteUp {...props} />);

      getByText(singleText);
    });

    it("handles empty list gracefully", () => {
      const props = {
        document: createDocument([createListWithItems(BLOCKS.UL_LIST, [])]),
        variant: TypographyVariants.PRIMARY,
      };

      const { container } = renderWithProviders(<RichTextWriteUp {...props} />);

      const list = container.querySelector(HTML_ELEMENTS.UL.toLowerCase());
      expect(list).toBeInTheDocument();
      expect(list?.children.length).toBe(0);
    });
  });
});
