import React from 'react'

const Search = ({search, handleSearchChange}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleSearchChange} value={search} />
      </div>
    </div> 
  )
}
export default Search