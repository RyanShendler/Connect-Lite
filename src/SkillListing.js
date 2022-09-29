import SkillListingRow from "./SkillListingRow";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_LISTING } from "../queries/GET_LISTING";
import { useState } from "react";
import Modal from "./Modal";
import { CREATE_SKILL } from "../mutations/CREATE_SKILL";

const SkillListing = () => {
  const { loading, error, data } = useQuery(GET_LISTING);
  const [showModal, setShowModal] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [createSkill] = useMutation(CREATE_SKILL, {
    refetchQueries: ["GET_LISTING", "GET_UNRATED"],
    ignoreResults: true,
  });
  const createModal = () => {
    setShowModal(true);
  };
  const destroyModal = () => {
    setShowModal(false);
    setSkillName("");
    setSkillDescription("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col bg-gray-50 rounded-md shadow-lg overflow-hidden">
        <div className="flex flex-row justify-between p-2 bg-sky-600">
          <div className="self-center px-4">
            <h1 className="text-white text-xl">All Skills</h1>
          </div>
          <div className="px-4 py-2">
            <button
              onClick={createModal}
              className="border-2 border-white text-white rounded-md shadow-sm p-2"
            >
              Create Skill
            </button>
          </div>
        </div>
        <div className="p-2">
          <table className="border table-auto border-collapse border-black w-full">
            <tbody>
              <tr>
                <th className="border border-black border-collapse p-2 text-center">
                  Name
                </th>
                <th className="border border-black border-collapse p-2 text-center">
                  Description
                </th>
                <th className="border border-black border-collapse p-2 text-center"></th>
              </tr>
              {!data.skills.length ? (
                <SkillListingRow />
              ) : (
                data.skills.map((skill) => {
                  return (
                    <SkillListingRow
                      key={skill.skillID}
                      name={skill.name}
                      description={skill.description}
                      ID={skill.skillID}
                      edit={true}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal ? (
        <Modal>
          <div className="fixed flex flex-col items-center p-2 bg-gray-100 rounded-md shadow-lg overflow-hidden">
            <h2 className="text-black text-xl px-2">New Skill</h2>
            <div className="p-2">
              <form
                id="skillForm"
                className="flex flex-col items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  createSkill({
                    variables: {
                      input: [
                        {
                          name: skillName,
                          description: skillDescription,
                        },
                      ],
                    },
                  });
                  destroyModal();
                }}
              >
                <label htmlFor="name" className="py-1">
                  Name
                  <br />
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    className="shadow-md px-1"
                  />
                </label>
                <label htmlFor="description" className="pt-1 pb-2">
                  Description
                  <br />
                  <input
                    id="description"
                    type="text"
                    placeholder="Description"
                    value={skillDescription}
                    onChange={(e) => setSkillDescription(e.target.value)}
                    className="shadow-md px-1"
                  />
                </label>
              </form>
              <div className="pt-2 flex flex-row justify-around">
                <button
                  type="submit"
                  form="skillForm"
                  className="bg-green-700 text-white rounded-md shadow-sm p-1"
                >
                  Submit
                </button>
                <button
                  className="bg-red-700 text-white rounded-md shadow-sm p-1"
                  onClick={destroyModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default SkillListing;
