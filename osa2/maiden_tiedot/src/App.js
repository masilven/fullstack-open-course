import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filterValue, changeHandler }) => (
  <div>
    find countries <input value={filterValue} onChange={changeHandler} />
  </div>
)

// Helper function for handling weather API data
function weatherObjectToArray(data) {
  return [data.temperature, data.weather_descriptions[0],
          data.weather_icons[0], data.wind_speed, data.wind_dir]
}

const Weather = ({ capital }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const title = `Weather in ${capital}`
  const [weatherData, setWeatherData] = useState([])
  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current' +
           '?access_key=' + api_key +
           '&query=' + capital)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setWeatherData(weatherObjectToArray(response.data.current))
      })
    // optional parameters: 
    // & units = m
    // & language = en
    // & callback = MY_CALLBACK
  }, [])
  // Inform about missing API key
  if (api_key === null || api_key === undefined) {
    return (
      <div>
        <h3>{title}</h3>
        Weather Forecast requires API key to weatherstack.com<br/>
        Define it temporarily in Bash:<br/>
        REACT_APP_API_KEY=your_api_key npm start<br/>
        or in cmd.exe:<br/>
        set "REACT_APP_API_KEY=your_api_key" && npm start
      </div>
    )
  }
  return (
    <div>
      <h3>{title}</h3>
      <b>temperature:</b> {weatherData[0]} Celsius<br/>
      <img src={weatherData[2]} alt={weatherData[1]} /><br/>
      <b>wind:</b> {weatherData[3]} mph direction {weatherData[4]}
    </div>
  )
}

const Country = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    capital {country.capital}<br/>
    population {country.population}<br/>
    <h3>languages</h3>
    <ul>{country.languages.map((language) => (<li key={language.name}>{language.name}</li>))}</ul>
    <img width="200" src={country.flag} />
    <Weather capital={country.capital} />
  </div>
)

const Countries = ({ filterValue, countryData, selectFunc }) => {
  const filteredData = countryData.filter(
    country => country.name.toUpperCase().indexOf(
      filterValue.toUpperCase()) !== -1)
  if (filteredData.length > 10)
    return (<div>Too many matches, specify another filter</div>)
  // List country names if length is 2 to 10
  else if (filteredData.length > 1)
    return (
     <div>
     {filteredData.map((country) => (
      <div key={country.name}>
        {country.name}
        <input type="button" value="show" onClick={() => {selectFunc(country.name)}} />
      </div>
     ))}
     </div>
  )
  // Show detailed information if only one country matches filter
  else if (filteredData.length === 1)
    return (<Country country={filteredData[0]} />)
  else
    return (<div>No countries found</div>)
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [ filterString, setNewFilter ] = useState('')
  const [ selected, setNewSelection ] = useState('')

  // Load country data
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setNewSelection("")
  }

  return (
    <div>
      <Filter filterValue={filterString} changeHandler={handleFilterChange} />
      <Countries filterValue={selected || filterString} countryData={countries} selectFunc={setNewSelection} />
    </div>
  )
}

export default App