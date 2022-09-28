const SkillListingRow = ({ name = "" }) => {
  return (
    <tr>
      <td className="border border-black border-collapse p-2 text-center"></td>
      <td className="border border-black border-collapse p-2 text-center">
        {name}
      </td>
      <td className="border border-black border-collapse p-2 text-center"></td>
      <td className="border border-black border-collapse p-2 text-center"></td>
    </tr>
  );
};

export default SkillListingRow;
