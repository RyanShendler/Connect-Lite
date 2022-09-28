//a table row representing a row of user skill data

const UserSkillRow = ({ name = "", description = "", rating = "" }) => {
  return (
    <tr>
      <td className="border border-black border-collapse p-2 text-center"></td>
      <td className="border border-black border-collapse p-2 text-center">
        {name}
      </td>
      <td className="border border-black border-collapse p-2 text-center">
        {description}
      </td>
      <td className="border border-black border-collapse p-2 text-center">
        {rating}
      </td>
      <td className="border border-black border-collapse p-2 text-center"></td>
    </tr>
  );
};

export default UserSkillRow;
