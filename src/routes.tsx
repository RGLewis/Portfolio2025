import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts/root-layout";
import { aboutLoader, experienceLoader } from "./loaders/page-loaders";
import { AboutView } from "./views/about-view";
import { ExperienceView } from "./views/experience-view";
import { HomeView } from "./views/home-view";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
        // No loader needed for static home page
      },
      {
        path: "/about",
        element: <AboutView />,
        loader: aboutLoader, // Data loads before route renders
      },
      {
        path: "/experience",
        element: <ExperienceView />,
        loader: experienceLoader, // Data loads before route renders
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
