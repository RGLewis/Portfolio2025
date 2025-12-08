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
      },
      {
        path: "/about",
        element: <AboutView />,
        loader: aboutLoader,
      },
      {
        path: "/experience",
        element: <ExperienceView />,
        loader: experienceLoader,
      },
    ],
  },
]);
