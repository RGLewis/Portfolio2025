/**
 * Mock GraphQLClient for Contentful
 * This mock prevents import.meta.env errors in Jest tests
 */
export const contentfulClient = {
  request: jest.fn(),
  setHeader: jest.fn(),
  setHeaders: jest.fn(),
};
