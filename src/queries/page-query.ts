export const pageQuery = `
  query getPage($id: String!) {
    page(id: $id) {
      title
      componentsCollection {
        items {
          __typename
          ... on RichTextWriteUp {
            title
            content {
              json
            }
          }
          ... on WorkAccordion {
            title
            accordionItemsCollection(limit: 20) {
              items {
                ... on WorkAccordionItem {
                  sys {
                    id
                  }
                  jobTitle
                  workplace
                  accordionContent {
                    json
                  }
                }
              }
            }
          }
          ... on Skills {
            title
            skillsItemCollection {
              items {
                ... on SkillsItem {
                  title
                  level
                }
              }
            }
          }
        }
      }
    }
  }
`;
