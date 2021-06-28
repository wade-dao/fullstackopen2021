import React, { useState } from 'react'

const Country = ({country}) => {
  const [showDetails, setShowDetails] = useState(false)
  const onClick = (event) => {
    if (showDetails === false)
    {
      setShowDetails(true)
    }
    else
      setShowDetails(false)
  }
  return (
    <tr>
      <td>
        <table>
          <tbody>
            <tr>
              <td>
                {country.name}
              </td>
              <td>
                <button id={country.name} onClick={onClick}>{showDetails? "hide" : "show"}</button>
              </td>
            </tr>
            {showDetails ? <CountryDetail country={country} /> : null}
          </tbody>  
        </table>
      </td>
    </tr>
      
  )
}

// const CountryButton = ({country}) => {
//   const [showDetails, setShowDetails] = useState(false)


//   return (
//     <>
//       <button id={country.name} onClick={onClick}>{showDetails? "show" : "hide"}</button>
//       {showDetails ? <CountryDetail country={country} /> : null}
//     </>
//   ) 
// }

const CountryDetail = ({country}) => {
  console.log('country ', country)
  const languages = country.languages.map((language, index) => <li key={index}>{language.name}</li>)
  return (
    <tr>
      <td>
        <table>
          <tbody>
            <tr>
              <td>
                <h1>{country.name}</h1>
              </td>
            </tr>
            <tr>
              <td>capital</td>
              <td>{country.capital}</td>
            </tr>
            <tr>
              <td>population</td>
              <td>{country.population}</td>
            </tr>
            <tr>
              <h2>Languages</h2>
            </tr>
            <tr>
              <ul>
                {languages}
              </ul>
            </tr>
            <tr>
              <td>
                <img width="247" height="130" src={country.flag} alt="country flag"/>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
}

const Countries = ({countries}) => {
  if (countries.length > 10)
    return (
      <p>Too many matches, specify another filter</p>
    )

  if (countries.length === 1)
    return (
      <div>
        <CountryDetail country={countries[0]} />
      </div>
    )
  
  const list = countries.map((country, index) => <Country key={index} country={country} />)
  return (
    <table>
      <tbody>
        {list}
      </tbody>
    </table>
  )  
}

export default Countries