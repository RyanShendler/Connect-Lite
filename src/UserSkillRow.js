//a table row representing a row of user skill data

//check if rating is an Int or a String
const UserSkillRow = ({
  name = "",
  description = "",
  rating = 1,
  empty = true,
  ID,
}) => {
  return (
    <tr>
      <td className="border border-black border-collapse p-2 text-center">
        {name}
      </td>
      <td className="border border-black border-collapse p-2 text-center">
        {description}
      </td>
      <td className="border border-black border-collapse p-2 text-center">
        {!empty && String(rating)}
      </td>
      <td className="border border-black border-collapse p-2 text-center">
        {!empty && (
          <button className="text-white bg-red-600 rounded-md shadow-sm p-1">
            Remove
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserSkillRow;
