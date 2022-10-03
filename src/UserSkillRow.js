import { useMutation } from "@apollo/client";
import { useState } from "react";
import { DELETE_RATING } from "../mutations/DELETE_RATING";
import { EDIT_RATING } from "../mutations/EDIT_RATING";
import RatingButton from "./RatingButton";
import TableEntry from "./TableEntry";

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
      <TableEntry>{name}</TableEntry>
      <TableEntry>{description}</TableEntry>
      <TableEntry>
        {!empty && (
          <div className="flex flex-row justify-around">
            <RatingButton
              label={"Knowledgeable"}
              buttonID={`knowledgeable-${ID}`}
              buttonGroup={`rating${ID}`}
              checked={userRating === "1"}
              onChange={() => {
                updateRating("1");
              }}
            />
            <RatingButton
              label={"Proficient"}
              buttonID={`proficient-${ID}`}
              buttonGroup={`rating${ID}`}
              checked={userRating === "2"}
              onChange={() => {
                updateRating("2");
              }}
            />
            <RatingButton
              label={"Lead/Teach"}
              buttonID={`lead/teach-${ID}`}
              buttonGroup={`rating${ID}`}
              checked={userRating === "3"}
              onChange={() => {
                updateRating("3");
              }}
            />
          </div>
        )}
      </TableEntry>
      <TableEntry>
        {!empty && (
          <button
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
            className="btn-red"
          >
            Remove
          </button>
        )}
      </TableEntry>
    </tr>
  );
};

export default UserSkillRow;
