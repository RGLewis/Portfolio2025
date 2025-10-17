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

  describe("Rendering", () => {
    it("renders the home view with correct content", () => {
      const { getByTestId, getByText } = renderWithProviders(<HomeView />);

      expect(getByTestId(pageContainer)).toBeInTheDocument();

      expect(getByTestId(profileImageTestId)).toBeInTheDocument();

      expect(getByText(HOME_PAGE_CONTENT.name)).toBeInTheDocument();
      expect(getByText(HOME_PAGE_CONTENT.tagline)).toBeInTheDocument();
    });

    it("renders the profile image with correct src and alt attributes", () => {
      const { getByTestId } = renderWithProviders(<HomeView />);

      const profileImage = getByTestId(profileImageTestId) as HTMLImageElement;

      expect(profileImage).toBeInTheDocument();
      expect(profileImage.src).toContain(HOME_PAGE_CONTENT.image);
      expect(profileImage.alt).toBe(HOME_PAGE_CONTENT.alt);
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
