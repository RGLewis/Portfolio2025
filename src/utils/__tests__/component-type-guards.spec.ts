import {
  createRichTextComponent,
  createSkillsComponent,
  createWorkAccordionItem,
} from "@/test-utils/factories";
import {
  TypeNames,
  type PageComponent,
  type RichTextComponent,
  type SkillsComponent,
  type WorkAccordionComponent,
} from "@/types/content-types";
import {
  isRichTextComponent,
  isSkillsComponent,
  isWorkAccordionComponent,
} from "../component-type-guards";

const COMPONENT_TITLES = {
  WORK: "Work Experience",
  RICH_TEXT: "Rich Text Section",
  ANOTHER_RICH_TEXT: "Another Rich Text",
};

const createWorkAccordion = (): WorkAccordionComponent => ({
  __typename: TypeNames.WORK_ACCORDION,
  title: COMPONENT_TITLES.WORK,
  accordionItemsCollection: {
    items: [createWorkAccordionItem()],
  },
});

type TypeGuardTestCase = {
  guardName: string;
  guard: (component: PageComponent | undefined) => boolean;
  validComponent: PageComponent;
  validTypename: TypeNames;
  invalidComponents: PageComponent[];
  propertyToCheck?: string;
};

describe("component-type-guards", () => {
  const richTextComponent = createRichTextComponent() as RichTextComponent;
  const skillsComponent = createSkillsComponent() as SkillsComponent;
  const workAccordionComponent = createWorkAccordion();

  const TYPE_GUARD_TEST_CASES: TypeGuardTestCase[] = [
    {
      guardName: "isRichTextComponent",
      guard: isRichTextComponent,
      validComponent: richTextComponent,
      validTypename: TypeNames.RICH_TEXT,
      invalidComponents: [skillsComponent, workAccordionComponent],
      propertyToCheck: "content",
    },
    {
      guardName: "isSkillsComponent",
      guard: isSkillsComponent,
      validComponent: skillsComponent,
      validTypename: TypeNames.SKILLS,
      invalidComponents: [richTextComponent, workAccordionComponent],
      propertyToCheck: "skillsItemCollection",
    },
    {
      guardName: "isWorkAccordionComponent",
      guard: isWorkAccordionComponent,
      validComponent: workAccordionComponent,
      validTypename: TypeNames.WORK_ACCORDION,
      invalidComponents: [richTextComponent, skillsComponent],
      propertyToCheck: "accordionItemsCollection",
    },
  ];

  describe.each(TYPE_GUARD_TEST_CASES)(
    "$guardName",
    ({
      guard,
      validComponent,
      validTypename,
      invalidComponents,
      propertyToCheck,
    }) => {
      it(`returns true for ${validTypename}`, () => {
        expect(guard(validComponent)).toBe(true);
      });

      it.each(invalidComponents.map((comp) => ({ component: comp })))(
        "returns false for $component.__typename",
        ({ component }) => {
          expect(guard(component)).toBe(false);
        }
      );

      it("returns false for undefined", () => {
        expect(guard(undefined)).toBe(false);
      });

      if (propertyToCheck) {
        it("narrows type correctly for TypeScript", () => {
          const component = validComponent as PageComponent;

          if (guard(component)) {
            expect(component.__typename).toBe(validTypename);
            expect(
              component[propertyToCheck as keyof typeof component]
            ).toBeDefined();
          }
        });
      }
    }
  );

  describe("Type narrowing with all guards", () => {
    it("can distinguish between all component types", () => {
      const components = {
        richText: richTextComponent as PageComponent,
        skills: skillsComponent as PageComponent,
        workAccordion: workAccordionComponent as PageComponent,
      };

      expect(isRichTextComponent(components.richText)).toBe(true);
      expect(isSkillsComponent(components.richText)).toBe(false);
      expect(isWorkAccordionComponent(components.richText)).toBe(false);

      expect(isRichTextComponent(components.skills)).toBe(false);
      expect(isSkillsComponent(components.skills)).toBe(true);
      expect(isWorkAccordionComponent(components.skills)).toBe(false);

      expect(isRichTextComponent(components.workAccordion)).toBe(false);
      expect(isSkillsComponent(components.workAccordion)).toBe(false);
      expect(isWorkAccordionComponent(components.workAccordion)).toBe(true);
    });

    it("works with filtering arrays of components", () => {
      const components: PageComponent[] = [
        richTextComponent,
        skillsComponent,
        workAccordionComponent,
        createRichTextComponent({
          title: COMPONENT_TITLES.ANOTHER_RICH_TEXT,
        }) as RichTextComponent,
      ];

      const richTextComponents = components.filter(isRichTextComponent);
      const skillsComponents = components.filter(isSkillsComponent);
      const workAccordionComponents = components.filter(
        isWorkAccordionComponent
      );

      expect(richTextComponents).toHaveLength(2);
      expect(skillsComponents).toHaveLength(1);
      expect(workAccordionComponents).toHaveLength(1);

      richTextComponents.forEach((component) => {
        expect(component.content).toBeDefined();
      });

      skillsComponents.forEach((component) => {
        expect(component.skillsItemCollection).toBeDefined();
      });

      workAccordionComponents.forEach((component) => {
        expect(component.accordionItemsCollection).toBeDefined();
      });
    });

    it("can be used in switch-like pattern matching", () => {
      const components: PageComponent[] = [
        richTextComponent,
        skillsComponent,
        workAccordionComponent,
      ];

      components.forEach((component) => {
        if (isRichTextComponent(component)) {
          expect(component.__typename).toBe(TypeNames.RICH_TEXT);
          expect(component.content).toBeDefined();
        } else if (isSkillsComponent(component)) {
          expect(component.__typename).toBe(TypeNames.SKILLS);
          expect(component.skillsItemCollection).toBeDefined();
        } else if (isWorkAccordionComponent(component)) {
          expect(component.__typename).toBe(TypeNames.WORK_ACCORDION);
          expect(component.accordionItemsCollection).toBeDefined();
        }
      });
    });
  });

  describe("Edge cases", () => {
    const allGuards = [
      isRichTextComponent,
      isSkillsComponent,
      isWorkAccordionComponent,
    ];

    it.each(allGuards.map((guard) => ({ guard, name: guard.name })))(
      "$name handles null values gracefully",
      ({ guard }) => {
        expect(guard(null as unknown as PageComponent)).toBe(false);
      }
    );

    it.each(allGuards.map((guard) => ({ guard, name: guard.name })))(
      "$name handles objects without __typename property",
      ({ guard }) => {
        const invalidComponent = {
          title: "Invalid",
          content: {},
        } as unknown as PageComponent;

        expect(guard(invalidComponent)).toBe(false);
      }
    );

    it.each(allGuards.map((guard) => ({ guard, name: guard.name })))(
      "$name handles objects with wrong __typename value",
      ({ guard }) => {
        const wrongTypename = {
          __typename: "WrongType",
          title: "Test",
        } as unknown as PageComponent;

        expect(guard(wrongTypename)).toBe(false);
      }
    );
  });
});
