import type {
  PageComponent,
  PageData,
  PageMappings,
} from "@/types/content-types";
import { TypeNames } from "@/types/content-types";

type FindComponentByTitleParams = {
  data: PageData | undefined;
  typename: TypeNames;
  title: PageMappings;
};

/**
 * Safely extracts all components from Contentful page data.
 * @param data - The page data from Contentful loader
 * @returns Array of components or empty array if not available
 */
export const getComponents = (data: PageData | undefined): PageComponent[] => {
  return data?.page?.componentsCollection?.items ?? [];
};

/**
 * Filters components by typename to get all components of a specific type.
 * @param components - Array of page components
 * @param typename - The typename to filter by
 * @returns Array of components matching the typename
 */
export const filterComponentsByType = <T extends PageComponent>(
  components: PageComponent[],
  typename: TypeNames
): T[] => {
  return components.filter((c) => c.__typename === typename) as T[];
};

/**
 * Finds the first component matching a typename and title.
 * @param data - The page data from Contentful loader
 * @param typename - The typename to filter by
 * @param title - The title to search for
 * @returns The first matching component or undefined
 */
export const findComponentByTitle = <T extends PageComponent>({
  data,
  typename,
  title,
}: FindComponentByTitleParams): T | undefined => {
  const components = filterComponentsByType<T>(getComponents(data), typename);

  return components.find((component) => component.title === title);
};
