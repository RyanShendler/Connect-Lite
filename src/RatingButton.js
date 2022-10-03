const RatingButton = ({ label, buttonID, buttonGroup, checked, onChange }) => {
  return (
    <div className="flex flex-row content-center items-center space-x-1">
      <label htmlFor={buttonID}>{label}</label>
      <input
        id={buttonID}
        type="radio"
        name={buttonGroup}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default RatingButton;
