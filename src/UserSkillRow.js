import { useMutation } from "@apollo/client";
import { useState } from "react";
import { DELETE_RATING } from "../mutations/DELETE_RATING";
import { EDIT_RATING } from "../mutations/EDIT_RATING";

//a table row representing a row of user skill data

//rating is a String
const UserSkillRow = ({
  name = "",
  description = "",
  rating = "1",
  empty = true,
  ID,
  user_id,
}) => {
  const [userRating, setUserRating] = useState(rating);
  const [deleteRating] = useMutation(DELETE_RATING, {
    refetchQueries: ["GET_RATED", "GET_UNRATED"],
    ignoreResults: true,
  });
  const [editRating] = useMutation(EDIT_RATING, {
    refetchQueries: ["GET_RATED"],
    ignoreResults: true,
  });
  const updateRating = (curRating) => {
    setUserRating(curRating);
    editRating({
      variables: {
        where: {
          userID: user_id,
        },
        update: {
          knownSkills: [
            {
              where: {
                node: {
                  skillID: ID,
                },
              },
              update: {
                edge: {
                  rating: Number(curRating),
                },
              },
            },
          ],
        },
      },
    });
  };

  return (
    <tr>
      <td className="border-collapse border border-black p-2 text-center">
        {name}
      </td>
      <td className="border-collapse border border-black p-2 text-center">
        {description}
      </td>
      <td className="border-collapse border border-black p-2 text-center">
        {!empty && (
          <div className="flex flex-row justify-around">
            <div className="flex flex-row content-center items-center space-x-1">
              <label htmlFor={`knowledgeable-${ID}`}>Knowledgeable</label>
              <input
                id={`knowledgeable-${ID}`}
                type="radio"
                name={`rating${ID}`}
                checked={userRating === "1"}
                onChange={() => {
                  updateRating("1");
                }}
              />
            </div>
            <div className="flex flex-row content-center items-center space-x-1">
              <label htmlFor={`proficient-${ID}`}>Proficient</label>
              <input
                id={`proficient-${ID}`}
                type="radio"
                name={`rating${ID}`}
                checked={userRating === "2"}
                onChange={() => {
                  updateRating("2");
                }}
              />
            </div>
            <div className="flex flex-row content-center items-center space-x-1">
              <label htmlFor={`lead/teach-${ID}`}>Lead/Teach</label>
              <input
                id={`lead/teach-${ID}`}
                type="radio"
                name={`rating${ID}`}
                checked={userRating === "3"}
                onChange={() => {
                  updateRating("3");
                }}
              />
            </div>
          </div>
        )}
      </td>
      <td className="border-collapse border border-black p-2 text-center">
        {!empty && (
          <button
            className="rounded-md bg-red-600 p-1 text-white shadow-sm"
            onClick={() => {
              deleteRating({
                variables: {
                  where: {
                    userID: user_id,
                  },
                  disconnect: {
                    knownSkills: [
                      {
                        where: {
                          node: {
                            skillID: ID,
                          },
                        },
                      },
                    ],
                  },
                },
              });
            }}
          >
            Remove
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserSkillRow;
