import type { PageData } from "@/types/content-types";

export enum ContentfulPageTypes {
  ABOUT_PAGE = "About",
  EXPERIENCE_PAGE = "Experience",
}

type DataResult = { data: PageData; error: null };
type ErrorResult = { data: null; error: ContentfulPageTypes };

export type PageLoaderResult = DataResult | ErrorResult;
