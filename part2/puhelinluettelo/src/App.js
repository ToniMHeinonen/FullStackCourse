import {useEffect, useState} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons))
  }, [])

  const addName = (event) => {
    event.preventDefault()

    if (persons.map((p) => p.name).includes(newName)) {
      modifyNumber(newName)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService.create(personObject).then((returnedPerson) => {
      showNotifaction(`Added ${returnedPerson.name}`)
      setPersons(persons.concat(returnedPerson))
    })
  }

  const modifyNumber = (name) => {
    const personToModify = persons.find((p) => p.name === name)
    if (
      window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const person = {...personToModify, number: newNumber}
      personService
        .update(personToModify.id, person)
        .then((modifiedPerson) => {
          showNotifaction(
            `Changed number for ${modifiedPerson.name} from ${personToModify.number} to ${modifiedPerson.number}`
          )
          setPersons(
            persons.map((p) =>
              p.id !== modifiedPerson.id ? p : modifiedPerson
            )
          )
        })
        .catch((error) =>
          showError(
            `Information of ${person.name} has already been removed from server`
          )
        )
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(id).then((response) => {
        showNotifaction(`Deleted person ${personToDelete.name}`)
        return setPersons(persons.filter((p) => p.id !== personToDelete.id))
      })
    }
  }

  const showNotifaction = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  const showError = (message) => {
    setError(message)
    setTimeout(() => setError(null), 5000)
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
      <Notification message={notification} />
      <Error message={error} />
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
      <Persons
        persons={persons}
        filter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
