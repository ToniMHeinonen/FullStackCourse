const Persons = ({ persons, filter }) => {
  const showPersons =
    filter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLocaleLowerCase())
        );

  return (
    <>
      {showPersons.map((p) => (
        <div key={p.name}>
          {p.name} {p.number}
        </div>
      ))}
    </>
  );
};

export default Persons;
