const Filter = ({ filter, handleFilterInput }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterInput} />
    </div>
  );
};

export default Filter;
