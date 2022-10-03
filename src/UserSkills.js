import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import UserSkillRow from "./UserSkillRow";
import { GET_RATED } from "../queries/GET_RATED";
import { useState } from "react";
import { GET_UNRATED } from "../queries/GET_UNRATED";
import { CREATE_RATING } from "../mutations/CREATE_RATING";
import TableHeader from "./TableHeader";

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

  return (
    <div className="mt-4 flex flex-col overflow-hidden rounded-md bg-gray-50 shadow-lg">
      <div className="flex flex-row justify-between bg-sky-600 py-2">
        <h1 className="px-4 py-2 text-xl text-white">Skills</h1>
        <div className="flex flex-row justify-end space-x-6 px-8">
          <form
            className="flex items-center"
            onSubmit={(e) => {
              //newSkill not ""
              e.preventDefault();
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
                <input type="submit" value="Add Skill" className="btn-header" />
              </div>
            </div>
          </form>
          {admin && (
            <div className="self-center">
              <Link className="btn-header" to="/admin">
                Skill Listing
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="p-2">
        <table className="w-full table-auto border-collapse border border-black">
          <tbody>
            <tr>
              <TableHeader name="Name" />
              <TableHeader name="Description" />
              <TableHeader name="Rating" />
              <TableHeader />
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
