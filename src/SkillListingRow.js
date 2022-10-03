import { useState } from "react";
import Modal from "./Modal";
import { useMutation } from "@apollo/client";
import { UPDATE_SKILL } from "../mutations/UPDATE_SKILL";
import { DELETE_SKILL } from "../mutations/DELETE_SKILL";

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
        <td className="border-collapse border border-black p-2 text-center">
          {skillName}
        </td>
        <td className="border-collapse border border-black p-2 text-center">
          {skillDescription}
        </td>
        <td className="border-collapse border border-black p-2 text-center">
          {edit && (
            <div className="flex flex-col items-center justify-around space-y-2">
              <button
                onClick={() => setEditing(true)}
                className="rounded-md bg-green-700 p-1 text-white shadow-sm"
              >
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
                className="rounded-md bg-red-600 p-1 text-white shadow-sm"
              >
                Delete
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td className="border-collapse border border-black p-2 text-center">
          <input
            id="editName"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="px-1 shadow-md"
          />
        </td>
        <td className="border-collapse border border-black p-2 text-center">
          <input
            id="editDescription"
            value={skillDescription}
            onChange={(e) => setSkillDescription(e.target.value)}
            className="px-1 shadow-md"
          />
        </td>
        <td className="border-collapse border border-black p-2 text-center">
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
                className="rounded-md bg-green-700 p-1 text-white shadow-sm"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setSkillName(name);
                  setSkillDescription(description);
                  setEditing(false);
                }}
                className="rounded-md bg-red-600 p-1 text-white shadow-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  }
};

export default SkillListingRow;
