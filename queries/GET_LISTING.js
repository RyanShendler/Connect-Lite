import { gql } from "@apollo/client";

export const GET_LISTING = gql`
  query GET_LISTING {
    skills {
      skillID
      name
      description
    }
  }
`;
