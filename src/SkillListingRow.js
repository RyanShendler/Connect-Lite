import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_SKILL } from "../mutations/UPDATE_SKILL";
import { DELETE_SKILL } from "../mutations/DELETE_SKILL";
import TableEntry from "./TableEntry";

//edit is true if edit button should be rendered, editing is true when we are currently editing content
const SkillListingRow = ({ name = "", description = "", edit = false, ID }) => {
  const [skillName, setSkillName] = useState(name);
  const [skillDescription, setSkillDescription] = useState(description);
  const [editing, setEditing] = useState(false);
  const [updateSkill] = useMutation(UPDATE_SKILL, {
    refetchQueries: ["GET_LISTING", "GET_RATED", "GET_UNRATED"],
    ignoreResults: true,
  });
  const [deleteSkill] = useMutation(DELETE_SKILL, {
    refetchQueries: ["GET_LISTING", "GET_RATED", "GET_UNRATED"],
    ignoreResults: true,
  });

  if (!editing) {
    return (
      <tr>
        <TableEntry>{skillName}</TableEntry>
        <TableEntry>{skillDescription}</TableEntry>
        <TableEntry>
          {edit && (
            <div className="flex flex-col items-center justify-around space-y-2">
              <button onClick={() => setEditing(true)} className="btn-green">
                Edit
              </button>
              <button
                onClick={() => {
                  deleteSkill({
                    variables: {
                      where: {
                        skillID: ID,
                      },
                    },
                  });
                }}
                className="btn-red"
              >
                Delete
              </button>
            </div>
          )}
        </TableEntry>
      </tr>
    );
  } else {
    return (
      <tr>
        <TableEntry>
          <input
            id="editName"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="px-1 shadow-md"
          />
        </TableEntry>
        <TableEntry>
          <input
            id="editDescription"
            value={skillDescription}
            onChange={(e) => setSkillDescription(e.target.value)}
            className="px-1 shadow-md"
          />
        </TableEntry>
        <TableEntry>
          {edit && (
            <div className="flex flex-col items-center justify-around space-y-2">
              <button
                onClick={() => {
                  updateSkill({
                    variables: {
                      where: {
                        skillID: ID,
                      },
                      update: {
                        name: skillName,
                        description: skillDescription,
                      },
                    },
                  });
                  setEditing(false);
                }}
                className="btn-green"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setSkillName(name);
                  setSkillDescription(description);
                  setEditing(false);
                }}
                className="btn-red"
              >
                Cancel
              </button>
            </div>
          )}
        </TableEntry>
      </tr>
    );
  }
};

export default SkillListingRow;
