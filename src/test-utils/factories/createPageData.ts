import { ComponentType, type PageData } from "@/types/content-types";
import { NodeType, type RichTextDocument } from "@/types/rich-text";

/**
 * Default mock rich text document
 */
const defaultRichTextDocument: RichTextDocument = {
  nodeType: NodeType.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: NodeType.PARAGRAPH,
      content: [
        {
          nodeType: NodeType.TEXT,
          value: "This is mock content",
          marks: [],
        },
      ],
    },
  ],
};

/**
 * Factory function to create mock PageData with optional overrides
 *
 * @param overrides - Partial PageData to override defaults
 * @returns Complete PageData object with mock data
 *
 * @example
 * ```tsx
 * // Create with defaults
 * const pageData = createPageData();
 *
 * // Override specific fields
 * const pageData = createPageData({
 *   page: {
 *     title: "Custom Title",
 *   }
 * });
 *
 * // Add custom components
 * const pageData = createPageData({
 *   page: {
 *     componentsCollection: {
 *       items: [
 *         {
 *           type: ComponentType.RICH_TEXT,
 *           title: "Custom Section",
 *           content: { json: customRichText }
 *         }
 *       ]
 *     }
 *   }
 * });
 * ```
 */
export const createPageData = (overrides?: Partial<PageData>): PageData => {
  const defaults: PageData = {
    page: {
      title: "Test Page",
      image: {
        description: "Test image description",
        url: "https://example.com/test-image.jpg",
      },
      componentsCollection: {
        items: [
          {
            type: ComponentType.RICH_TEXT,
            title: "Test Rich Text Section",
            content: {
              json: defaultRichTextDocument,
            },
          },
          {
            type: ComponentType.WORK_ACCORDION,
            title: "Test Work Experience",
            accordionItemsCollection: {
              items: [
                {
                  sys: { id: "work-1" },
                  jobTitle: "Software Engineer",
                  workplace: "Tech Company",
                  accordionContent: {
                    json: defaultRichTextDocument,
                  },
                },
                {
                  sys: { id: "work-2" },
                  jobTitle: "Senior Developer",
                  workplace: "Another Company",
                  accordionContent: {
                    json: defaultRichTextDocument,
                  },
                },
              ],
            },
          },
          {
            type: ComponentType.SKILLS,
            title: "Test Skills",
            skillsItemCollection: {
              items: [
                {
                  title: "JavaScript",
                  level: "Expert",
                },
                {
                  title: "TypeScript",
                  level: "Advanced",
                },
                {
                  title: "React",
                  level: "Expert",
                },
              ],
            },
          },
        ],
      },
    },
  };

  // Deep merge overrides with defaults
  return {
    page: {
      ...defaults.page,
      ...overrides?.page,
      image: {
        ...defaults.page.image,
        ...overrides?.page?.image,
      },
      componentsCollection: {
        ...defaults.page.componentsCollection,
        ...overrides?.page?.componentsCollection,
        items:
          overrides?.page?.componentsCollection?.items ??
          defaults.page.componentsCollection.items,
      },
    },
  };
};

/**
 * Create a mock rich text component
 */
export const createRichTextComponent = (
  overrides?: Partial<PageData["page"]["componentsCollection"]["items"][0]>
) => ({
  type: ComponentType.RICH_TEXT,
  title: "Rich Text Section",
  content: {
    json: defaultRichTextDocument,
  },
  ...overrides,
});

/**
 * Create a mock work accordion component
 */
export const createWorkAccordionComponent = (
  overrides?: Partial<PageData["page"]["componentsCollection"]["items"][1]>
) => ({
  type: ComponentType.WORK_ACCORDION,
  title: "Work Experience",
  accordionItemsCollection: {
    items: [
      {
        sys: { id: "work-1" },
        jobTitle: "Software Engineer",
        workplace: "Tech Company",
        accordionContent: {
          json: defaultRichTextDocument,
        },
      },
    ],
  },
  ...overrides,
});

/**
 * Create a mock skills component
 */
export const createSkillsComponent = (
  overrides?: Partial<PageData["page"]["componentsCollection"]["items"][2]>
) => ({
  type: ComponentType.SKILLS,
  title: "Skills",
  skillsItemCollection: {
    items: [
      {
        title: "JavaScript",
        level: "Expert",
      },
    ],
  },
  ...overrides,
});
