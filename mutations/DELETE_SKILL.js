import { gql } from "@apollo/client";

export const DELETE_SKILL = gql`
  mutation Mutation($where: SkillWhere) {
    deleteSkills(where: $where) {
      nodesDeleted
    }
  }
`;
