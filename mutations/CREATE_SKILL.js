import { gql } from "@apollo/client";

export const CREATE_SKILL = gql`
  mutation CREATE_SKILL($input: [SkillCreateInput!]!) {
    createSkills(input: $input) {
      skills {
        skillID
        name
        description
      }
    }
  }
`;
