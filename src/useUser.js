import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@apollo/client";
import { MERGE_USER } from "../mutations/MERGE_USER";
import { useEffect, useState } from "react";

export default function useUser() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userRoles, setUserRoles] = useState(null);

  //get user roles from Auth0
  useEffect(() => {
    const getUserRoles = async () => {
      const domain = "dev-0aljb7b7.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { app_metadata } = await metadataResponse.json();
        setUserRoles(app_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserRoles();
  }, [getAccessTokenSilently, user?.sub]);

  //get user info from DB
  const [mergeUser] = useMutation(MERGE_USER, {
    variables: {
      userID: String(user.sub),
      name: String(user.name),
    },
    ignoreResults: true,
  });
  mergeUser();
  return {
    name: user.name,
    picture: user.picture,
    ID: user.sub,
    admin: userRoles?.admin,
  };
}
