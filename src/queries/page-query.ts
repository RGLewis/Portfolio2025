export const pageQuery = `
  query getPage($id: String!) {
    page(id: $id) {
      title
      image {
        description
        url
      }
      componentsCollection {
        items {
          ... on RichTextWriteUp {
            title
            content {
              json
            }
          }
          ... on WorkAccordion {
            title
            accordionItemsCollection {
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
