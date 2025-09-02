export const navigationQuery = `
  query navigation {
    navigation(id: "${import.meta.env.VITE_CONTENTFUL_NAVIGATION_ID}") {
      title
      headline
      subheading
      ctAsCollection {
        items {
          ... on Cta {
            sys {
              id
            }
            title
            hasIcon
            iconLeads
            prompt
          }
        }
      }
      navigationItemsCollection {
        items {
          ... on LinksList {
            sys {
              id
            }
            title
            linksList {
              json
            }
          }
        }
      }
    }
  }
`;
