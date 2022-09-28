import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@apollo/client";
import { MERGE_USER } from "../mutations/MERGE_USER";

export default function useUser() {
  const { user } = useAuth0();
  const [mergeUser] = useMutation(MERGE_USER, {
    variables: {
      userID: String(user.sub),
      name: String(user.name),
    },
    ignoreResults: true,
  });
  mergeUser();
  return { name: user.name, picture: user.picture, ID: user.sub };
}
