import { pageQuery } from "@/queries/page-query";
import type { PageData } from "@/types/content-types";
import { contentfulClient } from "@/utils/contentful-client";
import type { LoaderFunction } from "react-router-dom";

export const createPageLoader = (pageId: string): LoaderFunction => {
  return async () => {
    try {
      const data = await contentfulClient.request<PageData>(pageQuery, {
        id: pageId,
      });
      return data;
      // TODO: Error handling
    } catch (error) {
      throw new Response("Page not found", { status: 404 });
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
