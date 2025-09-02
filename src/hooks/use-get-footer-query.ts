import { useState, useEffect } from "react";
import { contentfulClient } from "../utils/contentful-client";
import { footerQuery } from "../queries/footer-query";
import type { FooterData } from "../types/content-types";

interface UseFooterQuery {
  data: FooterData | null;
  loading: boolean;
  error: string | null;
}

export const useGetFooterQuery = (): UseFooterQuery => {
  const [data, setData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await contentfulClient.request<FooterData>(
          footerQuery
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
