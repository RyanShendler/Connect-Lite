import SkillListingRow from "./SkillListingRow";
import { gql, useQuery } from "@apollo/client";

const SkillListing = () => {
  const GET_LISTING = gql`
    query Query {
      skills {
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_LISTING, {
    pollInterval: 500,
  });
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
            <button className="border-2 border-white text-white rounded-md shadow-sm p-2">
              Create Skill
            </button>
          </div>
        </div>
        <div className="p-2">
          <table className="border table-auto border-collapse border-black w-full">
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
                <th className="border border-black border-collapse p-2 text-center"></th>
              </tr>
              {!data.skills.length ? (
                <SkillListingRow />
              ) : (
                data.skills.map((skill, index) => {
                  return <SkillListingRow key={index} name={skill.name} />;
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkillListing;
