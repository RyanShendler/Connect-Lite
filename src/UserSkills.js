import { Link } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import UserSkillRow from "./UserSkillRow";
import { GET_RATED } from "../queries/GET_RATED";
import { useState } from "react";
import { GET_UNRATED } from "../queries/GET_UNRATED";
import { CREATE_RATING } from "../mutations/CREATE_RATING";

const UserSkills = ({ user_id, admin }) => {
  const [newSkill, setNewSkill] = useState(""); //saves the ID of the skill to be rated (reset to "" after submission/query)
  const { loading, error, data } = useQuery(GET_RATED, {
    variables: {
      where: {
        userID: user_id,
      },
    },
  });
  const { loading: unratedLoading, data: unratedSkills } = useQuery(
    GET_UNRATED,
    {
      variables: {
        where: {
          skillUsers_NONE: {
            userID: user_id,
          },
        },
      },
    }
  );
  const [createRating] = useMutation(CREATE_RATING, {
    ignoreResults: true,
    refetchQueries: ["GET_RATED", "GET_UNRATED"],
  });

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>An Error has Ocurred: {error.message}</div>;
  }

  console.log(data);

  return (
    <div className="flex flex-col mt-4 bg-gray-50 rounded-md shadow-lg overflow-hidden">
      <div className="flex flex-row justify-between py-2 bg-sky-600">
        <h1 className="text-white text-xl px-4 py-2">Skills</h1>
        <div className="flex flex-row justify-end px-8 space-x-6">
          <form
            className="flex items-center"
            onSubmit={() => {
              //newSkill not ""
              if (newSkill) {
                createRating({
                  variables: {
                    where: {
                      userID: user_id,
                    },
                    connect: {
                      knownSkills: [
                        {
                          where: {
                            node: {
                              skillID: newSkill,
                            },
                          },
                          edge: {
                            rating: 1,
                          },
                        },
                      ],
                    },
                  },
                });
                setNewSkill("");
              }
            }}
          >
            <div className="flex flex-row justify-around">
              {unratedLoading ? (
                <div>Loading...</div>
              ) : (
                <select
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onBlur={(e) => setNewSkill(e.target.value)}
                >
                  <option value="">Choose a skill to add</option>
                  {unratedSkills.skills.map((skill) => (
                    <option key={skill.skillID} value={skill.skillID}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              )}
              <div className="pl-4">
                <input
                  type="submit"
                  value="Add Skill"
                  className="border-2 text-white border-white shadow-sm rounded-md p-1"
                />
              </div>
            </div>
          </form>
          {admin && (
            <div className="self-center">
              <Link
                className="border-2 text-white border-white shadow-sm rounded-md p-1"
                to="/admin"
              >
                Skill Listing
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
              data.users[0].knownSkills.map((skill) => {
                return (
                  <UserSkillRow
                    key={skill.skillID}
                    user_id={user_id}
                    ID={skill.skillID}
                    name={skill.name}
                    description={skill.description}
                    rating={String(skill.skillUsersConnection.edges[0].rating)}
                    empty={false}
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
