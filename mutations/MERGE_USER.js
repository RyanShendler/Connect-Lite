import { gql } from "@apollo/client";

export const MERGE_USER = gql`
  mutation MERGE_USER($userID: String!, $name: String!) {
    mergeUser(userID: $userID, name: $name) {
      name
      userID
    }
  }
`;
