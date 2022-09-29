import { gql } from "@apollo/client";

export const UPDATE_SKILL = gql`
  mutation UPDATE_SKILL($where: SkillWhere, $update: SkillUpdateInput) {
    updateSkills(where: $where, update: $update) {
      info {
        nodesCreated
      }
    }
  }
`;
