import React from 'react'

const Person = ({person, handleDelete}) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={() => handleDelete(person.id, person.name)}>delete</button></td>
    </tr>
  )
}
const Persons = ({persons, handleDelete}) => {
  const people = persons.map((person, index) => <Person key={index} person={person} handleDelete={handleDelete}/>)
  return (
    <table>
      <tbody>
        {people}
      </tbody>
    </table>
  )
}

const Numbers = ({persons, handleDelete}) => {
  return (
    <div>
      <h3>Numbers</h3>
      <Persons persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default Numbers