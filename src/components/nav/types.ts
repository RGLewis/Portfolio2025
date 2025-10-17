export type NavLinkProps = {
  to: string;
  text: string;
  onClick: () => void;
};

export type HashLinkProps = NavLinkProps & {
  isActive?: boolean;
  slug: string;
  tabIndex?: number;
};
