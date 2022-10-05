const TextInput = ({ ID, value, onChange }) => {
  return (
    <input
      type="text"
      id={ID}
      value={value}
      onChange={onChange}
      className="px-1 shadow-md"
    />
  );
};

export default TextInput;
