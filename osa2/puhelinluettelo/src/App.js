import React, { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState([])

  // Get initial data from DB
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(personData => {
        // console.log('promise fulfilled')
        setPersons(personData)
      })
    }, [])

  // Existing person information is edited on confirmation
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    // Check if person exists
    const i = persons.findIndex((v) => {return v.name === newName})
    if (i !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, ` +
                         `replace the old number with a new one?`)) {
        personService.update(persons[i].id, personObject)
          .then(personData => {
            // Update information in view
            const newPersons = [...persons]
            newPersons[i] = personData
            setPersons(newPersons)
            showNotification(
              [`Updated number for ${personData.name}`, "ok"]
            )
          })
          .catch(error => {
            showNotification(
              [`Information of '${persons[i].name}' has already been ` + 
               `removed from server`, "error"]
            )
            setPersons(persons.filter(p => p.id !== persons[i].id))
      })
        
      }
    } else {
      personService.create(personObject).then(personData => {
        setPersons(persons.concat(personData))
        showNotification(
          [`Added ${personData.name}`, "ok"]
        )
      })
    }
  }

  const removePerson = (id) => {
    personService.remove(id).then(personData => {
      showNotification(
        [`Removed ${persons.find(p => p.id === id).name}`, "ok"]
      )
      const newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
    })
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification([null, null])
    }, 5000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification[0]} type={notification[1]} />
      <Filter filterValue={filterString} changeHandler={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        nameValue={newName} nameChangeHandler={handleNameChange}
        numberValue={newNumber} numberChangeHandler={handleNumberChange}
        personAdder={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={filterString} personRemover={removePerson} />
    </div>
  )

}

export default App