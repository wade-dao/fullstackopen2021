import React, { useState } from 'react'
import axios from 'axios'

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
              <td>
                <h2>Languages</h2>
              </td>
            </tr>
            <tr>
              <td>
                <ul>
                  {languages}
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <img width="247" height="130" src={country.flag} alt="country flag"/>
              </td>
            </tr>
            <tr>
              <td>
                <h2>Weather in {country.capital}</h2>
              </td>
            </tr>
            <tr>
              <td>
                <p><strong>temperature:</strong> {country.weather.current.temperature} Celsius</p>
              </td>
            </tr>
            <tr>
              <td>
                <img src={country.weather.current.weather_icons[0]} alt="weather icon"/>
              </td>
            </tr>
            <tr>
              <td>
                <p><strong>wind:</strong> {country.weather.current.wind_speed} {country.weather.request.unit}ph direction {country.weather.current.wind_dir}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
}

const Countries = ({countries}) => {
  const api_key = process.env.REACT_APP_WEATHER_STACK_API_KEY
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
  
  const list = countries.map((country, index) => {
    axios
      .get('http://api.weatherstack.com/current', {
        params: {
          access_key: api_key,
          query: country.capital
        }
      })
      .then(response => {
        console.log('weather retrieved', response.data)
        country.weather = response.data
      })

    return <Country key={index} country={country} />
  })
  return (
    <table>
      <tbody>
        {list}
      </tbody>
    </table>
  )  
}

export default Countries