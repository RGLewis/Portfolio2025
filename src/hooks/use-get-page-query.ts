import { useEffect, useState } from "react";
import { pageQuery } from "../queries/page-query";
import type { PageData } from "../types/content-types";
import { contentfulClient } from "../utils/contentful-client";

type UsePageQuery = {
  data: PageData | null;
  loading: boolean;
  error: string | null;
};

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
