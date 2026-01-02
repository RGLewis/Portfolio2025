import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "../scroll-to-top";

const TEST_ROUTES = {
  home: "/",
  about: "/about",
  experience: "/experience",
  experienceWithHash: "/experience#profile",
};

describe("ScrollToTop", () => {
  const originalScrollTo = window.scrollTo;
  const mockScrollTo = jest.fn();

  beforeEach(() => {
    window.scrollTo = mockScrollTo;
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    mockScrollTo.mockClear();
  });

  it("should scroll to top when pathname changes", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={[TEST_ROUTES.home]}>
        <ScrollToTop />
        <Routes>
          <Route
            path={TEST_ROUTES.home}
            element={
              <div>
                <h1>Home</h1>
                <Link to={TEST_ROUTES.about}>Go to About</Link>
              </div>
            }
          />
          <Route path={TEST_ROUTES.about} element={<h1>About</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
    expect(mockScrollTo).toHaveBeenCalledTimes(1);

    await user.click(screen.getByText("Go to About"));

    await waitFor(() => {
      expect(mockScrollTo).toHaveBeenCalledTimes(2);
      expect(mockScrollTo).toHaveBeenLastCalledWith(0, 0);
    });
  });
});
