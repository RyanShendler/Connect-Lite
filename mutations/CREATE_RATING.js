import { gql } from "@apollo/client";

export const CREATE_RATING = gql`
  mutation CREATE_RATING($where: UserWhere, $connect: UserConnectInput) {
    updateUsers(where: $where, connect: $connect) {
      info {
        relationshipsCreated
      }
    }
  }
`;
