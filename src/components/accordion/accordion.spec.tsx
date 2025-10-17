import { ACCORDION_DATA_TEST_IDS } from "@/constants";
import {
  createWorkAccordionItem,
  MOCK_RICH_TEXT_CONTENT,
} from "@/test-utils/factories";
import {
  expectNoA11yViolations,
  renderWithProviders,
} from "@/test-utils/test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./accordion";

const workAccordionItem1 = createWorkAccordionItem();

const defaultAnimationStyles = {
  display: "grid",
  gridTemplateRows: "0fr",
  overflow: "hidden",
};

const expandedAnimationStyles = {
  ...defaultAnimationStyles,
  gridTemplateRows: "1fr",
};

const {
  accordionHeadingContainer,
  accordionButton,
  accordionContent: accordionContentTestId,
} = ACCORDION_DATA_TEST_IDS;

const getAccordionElements = (itemId: string) => ({
  button: screen.getByTestId(accordionButton(itemId)),
  content: screen.getByTestId(accordionContentTestId(itemId)),
  heading: screen.getByTestId(accordionHeadingContainer(itemId)),
});

const expectCollapsedStyles = (content: HTMLElement) => {
  expect(content).toHaveStyle(defaultAnimationStyles);
};

const expectExpandedStyles = (content: HTMLElement) => {
  expect(content).toHaveStyle(expandedAnimationStyles);
};

describe("Accordion", () => {
  describe("Rendering", () => {
    it("should render the accordion component", () => {
      renderWithProviders(<Accordion data={workAccordionItem1} />);

      const { button, content, heading } = getAccordionElements(
        workAccordionItem1.sys.id
      );

      expect(heading).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });

    it("should display the job title and workplace in the heading", () => {
      renderWithProviders(<Accordion data={workAccordionItem1} />);

      expect(
        screen.getByText(
          `${workAccordionItem1.jobTitle.toUpperCase()}, ${
            workAccordionItem1.workplace
          }`
        )
      ).toBeInTheDocument();
    });

    it("should display only the job title if workplace is not provided", () => {
      const itemWithoutWorkplace = {
        ...workAccordionItem1,
        workplace: "",
      };
      renderWithProviders(<Accordion data={itemWithoutWorkplace} />);

      expect(
        screen.getByText(itemWithoutWorkplace.jobTitle.toUpperCase())
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          `${itemWithoutWorkplace.jobTitle.toUpperCase()}, ${
            itemWithoutWorkplace.workplace
          }`
        )
      ).not.toBeInTheDocument();
    });

    it("should have the accordion content collapsed by default", () => {
      renderWithProviders(<Accordion data={workAccordionItem1} />);

      const { content } = getAccordionElements(workAccordionItem1.sys.id);
      expectCollapsedStyles(content);
    });

    it("should render the accordion content as expected", () => {
      renderWithProviders(<Accordion data={workAccordionItem1} />);

      const { content } = getAccordionElements(workAccordionItem1.sys.id);
      expect(content).toHaveTextContent(MOCK_RICH_TEXT_CONTENT);
    });
  });

  describe("Interaction", () => {
    it("should expand the accordion content when the button is clicked", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Accordion data={workAccordionItem1} />);

      const { button, content } = getAccordionElements(
        workAccordionItem1.sys.id
      );

      expectCollapsedStyles(content);

      await user.click(button);

      await waitFor(() => {
        expectExpandedStyles(content);
      });
    });

    it("should update the isExpanded state when the button is clicked", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Accordion data={workAccordionItem1} />);

      const { button } = getAccordionElements(workAccordionItem1.sys.id);
      expect(button).toHaveAttribute("aria-label", "Expand accordion content");

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute(
          "aria-label",
          "Collapse accordion content"
        );
      });
    });

    it("should collapse the accordion content when the button is clicked again", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Accordion data={workAccordionItem1} />);

      const { button, content } = getAccordionElements(
        workAccordionItem1.sys.id
      );

      expectCollapsedStyles(content);

      await user.click(button);

      await waitFor(() => {
        expectExpandedStyles(content);
      });

      await user.click(button);

      await waitFor(() => {
        expectCollapsedStyles(content);
      });
    });

    describe("Multiple Accordions", () => {
      it("should allow multiple accordions to be expanded independently", async () => {
        const { accordionButton, accordionContent } = ACCORDION_DATA_TEST_IDS;
        const user = userEvent.setup();
        const workAccordionItem2 = createWorkAccordionItem({
          sys: { id: "work-2" },
          jobTitle: "Frontend Developer",
          workplace: "Another Company",
        });

        renderWithProviders(
          <>
            <Accordion data={workAccordionItem1} />
            <Accordion data={workAccordionItem2} />
          </>
        );

        const button1 = screen.getByTestId(
          accordionButton(workAccordionItem1.sys.id)
        );
        const button2 = screen.getByTestId(
          accordionButton(workAccordionItem2.sys.id)
        );

        const content1 = screen.getByTestId(
          accordionContent(workAccordionItem1.sys.id)
        );
        const content2 = screen.getByTestId(
          accordionContent(workAccordionItem2.sys.id)
        );

        expect(content1).toHaveStyle(defaultAnimationStyles);
        expect(content2).toHaveStyle(defaultAnimationStyles);

        await user.click(button1);

        await waitFor(() => {
          expect(content1).toHaveStyle({
            ...defaultAnimationStyles,
            gridTemplateRows: "1fr",
          });

          expect(content2).toHaveStyle(defaultAnimationStyles);
        });

        await user.click(button2);

        await waitFor(() => {
          expect(content1).toHaveStyle({
            ...defaultAnimationStyles,
            gridTemplateRows: "1fr",
          });

          expect(content2).toHaveStyle({
            ...defaultAnimationStyles,
            gridTemplateRows: "1fr",
          });
        });
      });
    });
  });

  describe("Accessibility", () => {
    it("should have no accessibility violations when collapsed", async () => {
      await expectNoA11yViolations(<Accordion data={workAccordionItem1} />);
    });

    it("should have no accessibility violations when expanded", async () => {
      const user = userEvent.setup();
      const { container } = renderWithProviders(
        <Accordion data={workAccordionItem1} />
      );

      const { button } = getAccordionElements(workAccordionItem1.sys.id);

      await user.click(button);

      await waitFor(async () => {
        const { axe } = await import("jest-axe");
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
