const Persons = ({persons, filter, deletePerson}) => {
  const showPersons =
    filter === ''
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLocaleLowerCase())
        )

  return (
    <>
      {showPersons.map((p) => (
        <div key={p.id}>
          {p.name} {p.number}
          <button onClick={() => deletePerson(p.id)}>delete</button>
        </div>
      ))}
    </>
  )
}

export default Persons
