import React, { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Search from './components/Search'
import AddNew from './components/AddNew'
import Notification from './components/Notification'

import personService from './services/persons.js'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ displays, setDisplays ]  = useState([])
  const [ errorMessage, setErrorMessage] = useState({
    content: '',
    type: true
  })

  useEffect(() => {
    // console.log('effect')
    personService
      .getAll()
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
        setDisplays(response.data)
      })
  }, [])
  // console.log('render', displays.length, 'numbers')

  const addNewPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '')
      return
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const empMsg = {
      content: '',
      type: true
    }

    const names = persons.filter(person => {
      if (person.name === newName && person.number === newNumber) {
        return person
      }
      else return null
    })
    
    if (names.length > 0)
    {
      const err = {
        content: `This entry already exists.`,
        type: false
      }
      setNewName('')
      setNewNumber('')
      setErrorMessage(err)
      setTimeout(() => {
        setErrorMessage(empMsg)
      }, 2500)
    }
    else {
      personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setSearch('')
        setDisplays(persons.concat(response.data))
        const suc = {
          content: `Added ${response.data.name} - ${response.data.number}.`,
          type: true
        }
        setErrorMessage(suc)
        setTimeout(() => {
          setErrorMessage(empMsg)
        }, 3000)
      })
      .catch(error => {
        const err = {
          content: `Information about ${error}`,
          type: false
        }
        setErrorMessage(err)
        setTimeout(() => {
          setErrorMessage(empMsg)
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    // console.log(event.target.value)
    setSearch(event.target.value)
    if (event.target.value === '')
    {
      setDisplays(persons)
      return
    }

    const searchResult = persons.filter(person => person.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    setDisplays(searchResult)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete entry: "${person.name} - ${person.number}" ?`)) {
      personService
        .deletePerson(person.id)
        .then(response => {
          const afterDelete = persons.filter((item) => {
            return item.id !== person.id
          })
          setPersons(afterDelete)
          setNewName('')
          setNewNumber('')
          setSearch('')
          setDisplays(afterDelete)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Search search={search} handleSearchChange={handleSearchChange} />
      <AddNew addNewPerson={addNewPerson} handleNameChange={handleNameChange} newName={newName} 
                                          handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <Numbers persons={displays} handleDelete={handleDelete}/>
    </div>
  )
}

export default App