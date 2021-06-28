import React from 'react'

const Search = ({search, handleSearchChange}) => {
  return (
    <div>
      find countries <input onChange={handleSearchChange} value={search} />
    </div> 
  )
}
export default Search