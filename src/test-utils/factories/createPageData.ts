import { SkillLevels, TypeNames, type PageData } from "@/types/content-types";
import type { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";

/**
 * Mock rich text content string for validation in tests
 */
export const MOCK_RICH_TEXT_CONTENT = "This is mock content";

/**
 * Default mock rich text document
 * Used internally by factory functions
 */
const defaultRichTextDocument: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: MOCK_RICH_TEXT_CONTENT,
          marks: [],
          data: {},
        },
      ],
    },
  ],
};

/**
 * Default mock work accordion items
 */
const defaultWorkItems = [
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
];

/**
 * Default mock skills items
 */
const defaultSkillsItems = [
  {
    title: "JavaScript",
    level: SkillLevels.EXPERT,
  },
  {
    title: "TypeScript",
    level: SkillLevels.ADVANCED,
  },
  {
    title: "React",
    level: SkillLevels.EXPERT,
  },
];

/**
 * Factory function to create mock PageData with optional overrides
 * @param overrides - Partial PageData to override defaults
 * @returns Complete PageData object with mock data
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
 * ```
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
      componentsCollection: {
        items: [
          {
            __typename: TypeNames.RICH_TEXT,
            title: "Test Rich Text Section",
            content: {
              json: defaultRichTextDocument,
            },
          },
          {
            __typename: TypeNames.WORK_ACCORDION,
            title: "Test Work Experience",
            accordionItemsCollection: {
              items: defaultWorkItems,
            },
          },
          {
            __typename: TypeNames.SKILLS,
            title: "Test Skills",
            skillsItemCollection: {
              items: defaultSkillsItems,
            },
          },
        ],
      },
    },
  };

  return {
    page: {
      ...defaults.page,
      ...overrides?.page,
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
 * Create a mock rich text component.
 * @param overrides - Partial component data to override defaults
 * @returns Mock RichTextComponent
 */
export const createRichTextComponent = (
  overrides?: Partial<PageData["page"]["componentsCollection"]["items"][0]>
) => ({
  __typename: TypeNames.RICH_TEXT,
  title: "Rich Text Section",
  content: {
    json: defaultRichTextDocument,
  },
  ...overrides,
});

/**
 * Create a mock skills component.
 * @param overrides - Partial component data to override defaults
 * @returns Mock SkillsComponent
 */
export const createSkillsComponent = (
  overrides?: Partial<PageData["page"]["componentsCollection"]["items"][2]>
) => ({
  __typename: TypeNames.SKILLS,
  title: "Skills",
  skillsItemCollection: {
    items: [defaultSkillsItems[0]],
  },
  ...overrides,
});

/**
 * Create a mock work accordion item (single item, not the full component)
 * This is useful for testing individual Accordion components
 * @param overrides - Partial WorkAccordionItem to override defaults
 *  - sys: System metadata with ID
 *  - jobTitle: Job title string
 *  - workplace: Workplace name string
 *  - accordionContent: Rich text content document
 * @returns A single WorkAccordionItem
 * @example
 * ```tsx
 * // Create with defaults
 * const item = createWorkAccordionItem();
 *
 * // Override specific fields
 * const item = createWorkAccordionItem({
 *   jobTitle: "Frontend Developer",
 *   workplace: "Another Company"
 * });
 * ```
 */
export const createWorkAccordionItem = (overrides?: {
  sys?: { id: string };
  jobTitle?: string;
  workplace?: string;
  accordionContent?: { json: Document };
}) => ({
  ...defaultWorkItems[0],
  ...overrides,
});
