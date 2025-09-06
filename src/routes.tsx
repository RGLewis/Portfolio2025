import { createBrowserRouter } from "react-router-dom";
import { HomeView } from "./views/home-view";

const AboutView = () => <div>About Page</div>;
const ExperienceView = () => <div>Experience Page</div>;

import { RootLayout } from "./layouts/root-layout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "/about",
        element: <AboutView />,
      },
      {
        path: "/experience",
        element: <ExperienceView />,
        children: [
          {
            path: "#profile",
            element: <div>Profile Section</div>,
          },
          {
            path: "#work",
            element: <div>Work Section</div>,
          },
          {
            path: "#skills",
            element: <div>Skills Section</div>,
          },
          {
            path: "#education",
            element: <div>Education Section</div>,
          },
        ],
      },
    ],
  },
]);
