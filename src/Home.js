//import { useAuth0 } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import UserSkills from "./UserSkills";
import useUser from "./useUser";

const Home = () => {
  const user = useUser();

  //add margin to top of box to account for header
  return (
    <div className="px-4 py-6">
      <div className="flex flex-row content-center rounded-md bg-gray-50 px-6 py-8 shadow-lg">
        <div className="px-2">
          <img
            className="h-auto max-w-full rounded-full border-2 border-white"
            src={user.picture}
          />
        </div>
        <div className="self-center px-4">
          <h1 className="font-serif text-5xl">Hello {user.name}</h1>
        </div>
      </div>
      <UserSkills admin={user.admin} user_id={user.ID} />
    </div>
  );
};

export default Home;
