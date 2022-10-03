const TableEntry = ({ children }) => {
  return (
    <td className="border-collapse border border-black p-2 text-center">
      {children}
    </td>
  );
};

export default TableEntry;
