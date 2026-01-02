import { HOME_PAGE_CONTENT } from "@/assets/content";
import { HOME_PAGE_DATA_TEST_IDS } from "@/constants";
import {
  expectNoA11yViolations,
  mockMatchMedia,
  renderWithProviders,
} from "@/test-utils/test-utils";
import { HomeView } from "../home-view";

jest.mock("@/loaders/page-loaders");

describe("HomeView", () => {
  const { pageContainer, profileImage: profileImageTestId } =
    HOME_PAGE_DATA_TEST_IDS;
  const { name, tagline, image } = HOME_PAGE_CONTENT;

  describe("Rendering", () => {
    it("renders the correct content", () => {
      const { getByTestId, getByText } = renderWithProviders(<HomeView />);

      expect(getByTestId(pageContainer)).toBeInTheDocument();

      expect(getByTestId(profileImageTestId)).toBeInTheDocument();

      const profileImage = getByTestId(profileImageTestId) as HTMLImageElement;

      expect(profileImage.src).toContain(image.src);
      expect(profileImage.alt).toBe(image.alt);

      getByText(name);
      getByText(tagline);
    });
  });

  describe("Functionality", () => {
    it("calls prefetchPages on mount", () => {
      const { prefetchPages } = require("@/loaders/page-loaders");
      renderWithProviders(<HomeView />);
      expect(prefetchPages).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      mockMatchMedia(false);
      await expectNoA11yViolations(<HomeView />);
    });
  });
});
