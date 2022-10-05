import { gql } from "@apollo/client";

//sorted in reverse chronological order
export const GET_LISTING = gql`
  query GET_LISTING($options: SkillOptions) {
    skills(options: $options) {
      skillID
      name
      description
    }
  }
`;
