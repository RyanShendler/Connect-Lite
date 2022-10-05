import { gql } from "@apollo/client";

//no sorting order
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
