import { gql } from "@apollo/client";

export const MERGE_SKILL = gql`
  mutation MERGE_SKILL($name: String!, $description: String!) {
    mergeSkill(name: $name, description: $description) {
      name
      description
    }
  }
`;
