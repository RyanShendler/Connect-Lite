import { gql } from "@apollo/client";

export const EDIT_RATING = gql`
  mutation EDIT_RATING($where: UserWhere, $update: UserUpdateInput) {
    updateUsers(where: $where, update: $update) {
      users {
        knownSkillsConnection {
          edges {
            rating
          }
        }
      }
    }
  }
`;
