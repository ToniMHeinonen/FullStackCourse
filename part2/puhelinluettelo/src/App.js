import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addName = (event) => {
    event.preventDefault();

    if (persons.map((p) => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName, number: newNumber }));
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInput = (event) => {
    setNewFilter(event.target.value);
  };

  const showPersons =
    newFilter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(newFilter.toLocaleLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input value={newFilter} onChange={handleFilterInput} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <>
        {showPersons.map((p) => (
          <div key={p.name}>
            {p.name} {p.number}
          </div>
        ))}
      </>
    </div>
  );
};

export default App;
