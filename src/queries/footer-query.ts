export const footerQuery = `
  query footer {
    footer(id: "${import.meta.env.VITE_CONTENTFUL_FOOTER_ID}") {
      title
      copyright
      techStack
      footerItemsCollection {
        items {
          ... on LinksList {
            linksList {
              json
            }
          }
        }
      }
    }
  }
`;
