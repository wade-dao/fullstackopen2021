import React from 'react'

const Person = ({person}) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  )
}
const Persons = ({persons}) => {
  const people = persons.map((person, index) => <Person key={index} person={person} />)
  return (
    <table>
      <tbody>
        {people}
      </tbody>
    </table>
  )
}

const Numbers = ({persons}) => {
  return (
    <div>
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )
}

export default Numbers