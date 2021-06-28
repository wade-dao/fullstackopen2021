import React, { useState } from 'react'
import Numbers from './components/Numbers'
import Search from './components/Search'
import AddNew from './components/AddNew'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ displays, setDisplays ]  = useState([
    ...persons
  ])

  const addNewPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '')
      return
    
    const names = persons.map(person => person.name)
    if (names.includes(newName))
    {
      alert(`${newName} is already added to phonebook`)
      return
    }
  
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    setSearch('')
    setDisplays(persons.concat(newPerson))
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

  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <AddNew addNewPerson={addNewPerson} handleNameChange={handleNameChange} newName={newName} 
                                          handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <Numbers persons={displays} />
    </div>
  )
}

export default App