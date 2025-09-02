import type { RichTextDocument } from "./rich-text";

export type NavigationData = {
  navigation: {
    title: string;
    headline: string;
    subheading: string;
    ctAsCollection: {
      items: Array<{
        sys: {
          id: string;
        };
        title: string;
        hasIcon: boolean;
        iconLeads: boolean;
        prompt: string;
      }>;
    };
    navigationItemsCollection: {
      items: Array<{
        sys: {
          id: string;
        };
        title: string;
        linksList: {
          json: RichTextDocument;
        };
      }>;
    };
  };
};

export type FooterData = {
  title: string;
  copyright: string;
  techStack: string;
  footerItemsCollection: {
    items: Array<{
      linksList: {
        json: RichTextDocument;
      };
    }>;
  };
};
