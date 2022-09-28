import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import UserSkillRow from "./UserSkillRow";
import { GET_SKILLS } from "../queries/GET_SKILLS";

const UserSkills = ({ user_id, admin }) => {
  const { loading, error, data } = useQuery(GET_SKILLS, {
    variables: {
      where: {
        userID: user_id,
      },
    },
  });

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>An Error has Ocurred: {error.message}</div>;
  }

  return (
    <div className="flex flex-col mt-4 bg-gray-50 rounded-md shadow-lg overflow-hidden">
      <div className="flex flex-row justify-between py-2 bg-sky-600">
        <h1 className="text-white text-xl px-4 py-2">Skills</h1>
        <div className="flex flex-row justify-end px-8 space-x-6">
          <div className="self-center">
            <button className="border-2 text-white border-white shadow-sm rounded-md p-2">
              Add Skill
            </button>
          </div>
          {admin && (
            <div className="self-center">
              <Link
                className="border-2 text-white border-white shadow-sm rounded-md p-2"
                to="/admin"
              >
                Link to admin skill listing
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="p-2">
        <table className="border table-auto border-black border-collapse w-full">
          <tbody>
            <tr>
              <th className="border border-black border-collapse p-2 text-center">
                Image
              </th>
              <th className="border border-black border-collapse p-2 text-center">
                Name
              </th>
              <th className="border border-black border-collapse p-2 text-center">
                Description
              </th>
              <th className="border border-black border-collapse p-2 text-center">
                Rating
              </th>
              <th className="border border-black border-collapse p-2 text-center"></th>
            </tr>
            {!data.users[0].knownSkills.length ? (
              <UserSkillRow />
            ) : (
              data.users[0].knownSkills.map((skill, index) => {
                return (
                  <UserSkillRow
                    key={index}
                    name={skill.name}
                    rating={String(skill.skillUsersConnection.edges[0].rating)}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSkills;
