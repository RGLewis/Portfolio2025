import { createPageData } from "@/test-utils/factories";
import { contentfulClient } from "@/utils/contentful-client";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetPageQuery } from "../use-get-page-query";

jest.mock("@/utils/contentful-client");

const mockContentfulClient = contentfulClient as jest.Mocked<
  typeof contentfulClient
>;

describe("useGetPageQuery", () => {
  const mockId = "mock-page-id";
  const mockData = createPageData();

  beforeEach(() => {
    jest.clearAllMocks();
    mockContentfulClient.request.mockResolvedValue(mockData);
  });

  it("should return loading state initially", async () => {
    const { result } = renderHook(() => useGetPageQuery(mockId));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("should fetch and return data successfully", async () => {
    const { result } = renderHook(() => useGetPageQuery(mockId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(mockContentfulClient.request).toHaveBeenCalledWith(
      expect.any(String),
      { id: mockId }
    );
  });

  it("should handle errors", async () => {
    const errorMessage = "Failed to fetch data";
    mockContentfulClient.request.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useGetPageQuery(mockId));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(errorMessage);
  });
});
