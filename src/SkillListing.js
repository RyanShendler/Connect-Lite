import SkillListingRow from "./SkillListingRow";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_LISTING } from "../queries/GET_LISTING";
import { useState } from "react";
import Modal from "./Modal";
import { CREATE_SKILL } from "../mutations/CREATE_SKILL";
import TableHeader from "./TableHeader";

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
      <div className="flex flex-col overflow-hidden rounded-md bg-gray-50 shadow-lg">
        <div className="flex flex-row justify-between bg-sky-600 p-2">
          <div className="self-center px-4">
            <h1 className="text-xl text-white">All Skills</h1>
          </div>
          <div className="px-4 py-2">
            <button onClick={createModal} className="btn-header">
              Create Skill
            </button>
          </div>
        </div>
        <div className="p-2">
          <table className="w-full table-auto border-collapse border border-black">
            <tbody>
              <tr>
                <TableHeader name="Name" />
                <TableHeader name="Description" />
                <TableHeader />
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
          <div className="fixed flex flex-col items-center overflow-hidden rounded-md bg-gray-100 p-2 shadow-lg">
            <h2 className="px-2 text-xl text-black">New Skill</h2>
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
                    className="px-1 shadow-md"
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
                    className="px-1 shadow-md"
                  />
                </label>
              </form>
              <div className="flex flex-row justify-around pt-2">
                <button type="submit" form="skillForm" className="btn-green">
                  Submit
                </button>
                <button className="btn-red" onClick={destroyModal}>
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
