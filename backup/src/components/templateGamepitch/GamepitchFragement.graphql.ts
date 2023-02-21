import { graphql } from "gatsby";

export const FontFragment = graphql`
  fragment FontFields on File {
    id
    name
    publicURL
  }
`;
