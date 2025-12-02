import { pageQuery } from "@/queries/page-query";
import type { PageData } from "@/types/content-types";
import { contentfulClient } from "@/utils/contentful-client";
import type { LoaderFunction } from "react-router-dom";

// TODO: Delete before production
const ENABLE_MOCK_LOADING_DELAY = false;
const MOCK_DELAY_MS = 2000;
const SHOW_LOADER_ONLY = false;
const SIMULATE_ERROR = false;

// TODO: Delete before production
const mockDelay = () =>
  new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

export const createPageLoader = (pageId: string): LoaderFunction => {
  return async () => {
    try {
      // Simulate an error to test error handling (throws error)
      if (SIMULATE_ERROR) {
        await mockDelay();
        throw new Error("Failed to fetch data from Contentful");
      }

      // TODO: Delete before production
      if (SHOW_LOADER_ONLY) {
        await mockDelay(); // Small delay to see the navigation happen
        return null;
      }

      // TODO: Delete before production
      if (ENABLE_MOCK_LOADING_DELAY) {
        await mockDelay();
      }

      const data = await contentfulClient.request<PageData>(pageQuery, {
        id: pageId,
      });

      return data;
    } catch (error) {
      // TODO: Trigger error snackbar notification
      return null;
    }
  };
};

export const aboutLoader = createPageLoader(
  import.meta.env.VITE_CONTENTFUL_ABOUT_PAGE_ID
);
export const experienceLoader = createPageLoader(
  import.meta.env.VITE_CONTENTFUL_EXPERIENCE_PAGE_ID
);

export const prefetchPages = async () => {
  const prefetchPromises = [
    contentfulClient.request<PageData>(pageQuery, {
      id: import.meta.env.VITE_CONTENTFUL_ABOUT_PAGE_ID,
    }),
    contentfulClient.request<PageData>(pageQuery, {
      id: import.meta.env.VITE_CONTENTFUL_EXPERIENCE_PAGE_ID,
    }),
  ];

  await Promise.allSettled(prefetchPromises);
};
