import React from 'react'

const AddNew = ({ addNewPerson, handleNameChange, newName, handleNumberChange, newNumber }) => {
  return (
    <div>
      <h3>Add a new</h3>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
export default AddNew