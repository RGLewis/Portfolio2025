import { pageQuery } from "@/queries/page-query";
import type { PageData } from "@/types/content-types";
import { contentfulClient } from "@/utils/contentful-client";
import { useEffect, useState } from "react";

type UsePageQuery = {
  data: PageData | null;
  loading: boolean;
  error: string | null;
};

/**
 * Custom hook to fetch page data from Contentful using the provided page ID.
 * @param id - The ID of the page to fetch
 * @returns Object containing:
 *  - data: The page data, loading state, and error message (if any)
 *  - loading: Whether data is currently loading
 *  - error: Error message if fetch failed
 * @example
 * ```tsx
 * const { data, loading, error } = useGetPageQuery("page-id");
 * ```
 */

export const useGetPageQuery = (id: string): UsePageQuery => {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await contentfulClient.request<PageData>(pageQuery, {
          id,
        });

        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};
