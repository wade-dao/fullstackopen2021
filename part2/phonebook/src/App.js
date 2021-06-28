import React, { useState } from 'react'

const Person = ({name}) => {
  return (
    <p>{name}</p>
  )
}
const Persons = ({persons}) => {
  const names = persons.map((person, index) => <Person key={index} name={person.name} />)
  return (
    <div>
      {names}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    if (newName === '')
      return
    
    const names = persons.map(person => person.name)
    if (names.includes(newName))
    {
      alert(`${newName} is already added to phonebook`)
      return
    }
  
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App