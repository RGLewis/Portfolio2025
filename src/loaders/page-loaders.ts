/// <reference types="../vite-env.d.ts" />
import { pageQuery } from "@/queries/page-query";
import type { PageData } from "@/types/content-types";
import { contentfulClient } from "@/utils/contentful-client";
import type { LoaderFunction } from "react-router-dom";
import { ContentfulPageTypes, type PageLoaderResult } from "./types";

/**
 * Creates a React Router loader function for fetching page data from Contentful.
 * @param pageId - The Contentful page ID to fetch
 * @param pageType - The page type for error reporting
 * @returns A loader function that fetches page data and handles errors
 */
export const createPageLoader = (
  pageId: string,
  pageType: ContentfulPageTypes
): LoaderFunction => {
  return async (): Promise<PageLoaderResult> => {
    try {
      const data = await contentfulClient.request<PageData>(pageQuery, {
        id: pageId,
      });

      return { data, error: null };
    } catch {
      return { data: null, error: pageType };
    }
  };
};

/**
 * React Router loader for the About page.
 */
export const aboutLoader = createPageLoader(
  import.meta.env.VITE_CONTENTFUL_ABOUT_PAGE_ID,
  ContentfulPageTypes.ABOUT_PAGE
);

/**
 * React Router loader for the Experience page.
 */
export const experienceLoader = createPageLoader(
  import.meta.env.VITE_CONTENTFUL_EXPERIENCE_PAGE_ID,
  ContentfulPageTypes.EXPERIENCE_PAGE
);

/**
 * Prefetches all page data from Contentful for faster subsequent navigation.
 * Uses Promise.allSettled to ensure all requests complete regardless of individual failures.
 */
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
