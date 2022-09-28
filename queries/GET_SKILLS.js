import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
  query GET_SKILLS($where: UserWhere) {
    users(where: $where) {
      knownSkills {
        name
        skillUsersConnection {
          edges {
            rating
          }
        }
      }
    }
  }
`;
