import { gql } from "@apollo/client";

export const GET_RATED = gql`
  query GET_RATED($where: UserWhere) {
    users(where: $where) {
      knownSkills {
        skillID
        name
        description
        skillUsersConnection {
          edges {
            rating
          }
        }
      }
    }
  }
`;
