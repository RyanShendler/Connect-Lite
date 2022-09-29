import { gql } from "@apollo/client";

//returns all skills not rated by the user
export const GET_UNRATED = gql`
  query GET_UNRATED($where: SkillWhere) {
    skills(where: $where) {
      skillID
      name
      description
    }
  }
`;
