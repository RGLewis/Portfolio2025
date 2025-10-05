import { GraphQLClient } from "graphql-request";

if (
  !import.meta.env.VITE_CONTENTFUL_SPACE_ID ||
  !import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
) {
  // TODO: Error handling
  throw new Error("Missing Contentful environment variables");
}

const CONTENTFUL_SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

export const contentfulClient = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
  {
    headers: {
      authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
    },
  }
);
