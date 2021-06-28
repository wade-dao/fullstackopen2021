import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Countries from './components/Countries'

import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ displays, setDisplays ]  = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('get', countries.length, 'countries')

  const handleSearchChange = (event) => {
    // console.log(event.target.value)
    setSearch(event.target.value)
    if (event.target.value === '')
    {
      setDisplays([])
      return
    }

    const searchResult = countries.filter(country => country.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
    setDisplays(searchResult)
  }

  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <Countries countries={displays} />
    </div>
  );
}

export default App;
