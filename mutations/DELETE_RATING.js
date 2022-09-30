import { gql } from "@apollo/client";

export const DELETE_RATING = gql`
  mutation DELETE_RATING($where: UserWhere, $disconnect: UserDisconnectInput) {
    updateUsers(where: $where, disconnect: $disconnect) {
      info {
        relationshipsDeleted
      }
    }
  }
`;
