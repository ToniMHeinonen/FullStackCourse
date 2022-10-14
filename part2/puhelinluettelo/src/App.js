import {useEffect, useState} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data))
  }, [])

  const addName = (event) => {
    event.preventDefault()

    if (persons.map((p) => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({name: newName, number: newNumber}))
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilterInput={handleFilterInput} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addName={addName}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} />
    </div>
  )
}

export default App
