import type { PageData } from "@/types/content-types";

export type PageLoaderResult =
  | { data: PageData; error: null }
  | { data: null; error: PageLoadErrorTypes };

export enum PageLoadErrorTypes {
  ABOUT_PAGE = "About",
  EXPERIENCE_PAGE = "Experience",
}
