const TableHeader = ({ name = "" }) => {
  return (
    <th className="border-collapse border border-black p-2 text-center">
      {name}
    </th>
  );
};

export default TableHeader;
