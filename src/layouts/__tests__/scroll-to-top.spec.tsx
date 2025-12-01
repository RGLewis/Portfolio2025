import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "../scroll-to-top";

describe("ScrollToTop", () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

  it("should scroll to top when pathname changes", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Home</h1>
                <Link to="/about">Go to About</Link>
              </div>
            }
          />
          <Route path="/about" element={<h1>About</h1>} />
        </Routes>
      </MemoryRouter>
    );

    // Initial render should scroll to top
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // Click link to navigate
    await user.click(screen.getByText("Go to About"));

    // Should scroll to top again
    await waitFor(() => {
      expect(window.scrollTo).toHaveBeenCalledTimes(2);
      expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
    });
  });

  it("should not scroll to top when navigating with a hash", () => {
    render(
      <MemoryRouter initialEntries={["/experience#profile"]}>
        <ScrollToTop />
        <Routes>
          <Route path="/experience" element={<h1>Experience</h1>} />
        </Routes>
      </MemoryRouter>
    );

    // Should not call scrollTo when there's a hash
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("should scroll to top when hash is removed", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/experience#profile"]}>
        <ScrollToTop />
        <Routes>
          <Route
            path="/experience"
            element={
              <div>
                <h1>Experience</h1>
                <Link to="/experience">Remove hash</Link>
              </div>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Should not scroll with hash present
    expect(window.scrollTo).not.toHaveBeenCalled();

    // Click link to navigate to same path without hash
    await user.click(screen.getByText("Remove hash"));

    // Should scroll to top when hash is removed
    await waitFor(() => {
      expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });
  });
});
