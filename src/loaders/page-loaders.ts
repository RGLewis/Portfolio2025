import { pageQuery } from "@/queries/page-query";
import type { PageData } from "@/types/content-types";
import { contentfulClient } from "@/utils/contentful-client";
import type { LoaderFunction } from "react-router-dom";
import { PageLoadErrorTypes, type PageLoaderResult } from "./types";

export const createPageLoader = (
  pageId: string,
  pageType: PageLoadErrorTypes
): LoaderFunction => {
  return async (): Promise<PageLoaderResult> => {
    try {
      const data = await contentfulClient.request<PageData>(pageQuery, {
        id: pageId,
      });

      return { data, error: null };
    } catch (error) {
      console.error(`Error loading ${pageType}:`, error);
      return { data: null, error: pageType };
    }
  };
};

export const aboutLoader = createPageLoader(
  import.meta.env.VITE_CONTENTFUL_ABOUT_PAGE_ID,
  PageLoadErrorTypes.ABOUT_PAGE
);
export const experienceLoader = createPageLoader(
  import.meta.env.VITE_CONTENTFUL_EXPERIENCE_PAGE_ID,
  PageLoadErrorTypes.EXPERIENCE_PAGE
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
