import { useState, useEffect } from "react";
import { contentfulClient } from "../utils/contentful-client";
import { navigationQuery } from "../queries/navigation-query";
import type { NavigationData } from "../types/content-types";

type UseNavigationQuery = {
  data: NavigationData | null;
  loading: boolean;
  error: string | null;
};

export const useGetNavigationQuery = (): UseNavigationQuery => {
  const [data, setData] = useState<NavigationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await contentfulClient.request<NavigationData>(
          navigationQuery
        );
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
