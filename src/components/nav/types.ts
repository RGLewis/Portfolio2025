import type { Slugs } from "@/types/content-types";

export type NavLinkProps = {
  to: string;
  text: string;
  onClick: () => void;
};

export type HashLinkProps = NavLinkProps & {
  isActive?: boolean;
  slug: Slugs;
  isExperienceExpanded?: boolean;
};
