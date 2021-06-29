import React from 'react'

const Search = ({search, handleSearchChange}) => {
  return (
    <div>
      <div>
        filter shown with <input onChange={handleSearchChange} value={search} />
      </div>
    </div> 
  )
}
export default Search