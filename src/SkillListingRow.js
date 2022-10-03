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
        <td className="border border-black border-collapse p-2 text-center">
          {skillName}
        </td>
        <td className="border border-black border-collapse p-2 text-center">
          {skillDescription}
        </td>
        <td className="border border-black border-collapse p-2 text-center">
          {edit && (
            <div className="flex flex-col items-center justify-around space-y-2">
              <button
                onClick={() => setEditing(true)}
                className="text-white bg-green-700 rounded-md shadow-sm p-1"
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
                className="text-white bg-red-600 rounded-md shadow-sm p-1"
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
        <td className="border border-black border-collapse p-2 text-center">
          <input
            id="editName"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            className="shadow-md px-1"
          />
        </td>
        <td className="border border-black border-collapse p-2 text-center">
          <input
            id="editDescription"
            value={skillDescription}
            onChange={(e) => setSkillDescription(e.target.value)}
            className="shadow-md px-1"
          />
        </td>
        <td className="border border-black border-collapse p-2 text-center">
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
                className="text-white bg-green-700 rounded-md shadow-sm p-1"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setSkillName(name);
                  setSkillDescription(description);
                  setEditing(false);
                }}
                className="text-white bg-red-600 rounded-md shadow-sm p-1"
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
