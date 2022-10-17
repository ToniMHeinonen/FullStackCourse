import {useState, useEffect} from 'react'
import axios from 'axios'

const DisplayCountry = ({country}) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      {showInfo ? (
        <CountryInfo country={country} setShowInfo={setShowInfo} />
      ) : (
        <div>
          {country.name.common}
          <button onClick={() => setShowInfo(true)}>show</button>
        </div>
      )}
    </>
  )
}

const CountryInfo = ({country, setShowInfo}) => {
  const [weather, setWeather] = useState({})

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`
      )
      .then((response) => setWeather(response.data))
  }, [])

  const capital = country.capital[0]

  return (
    <div>
      <h1>{country.name.common}</h1>
      <button onClick={() => setShowInfo(false)}>Hide</button>
      <div>capital {capital}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Country  flag" width="150" />
      <h2>Weather in {capital}</h2>
      <WeatherInfo weather={weather} />
    </div>
  )
}

const WeatherInfo = ({weather}) => {
  const kelvinToCelcius = -273.15
  const weatherLoaded = Object.keys(weather).length !== 0

  return (
    <>
      {weatherLoaded ? (
        <div>
          <div>
            temperature {(weather.main.temp + kelvinToCelcius).toFixed(2)}{' '}
            celsius
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`Weather icon, ${weather.weather.description}`}
          />
          <div>wind {weather.wind?.speed} m/s</div>{' '}
        </div>
      ) : (
        <div>Loading weather info</div>
      )}
    </>
  )
}

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
  }, [])

  const handleFilterInput = (event) => {
    setFilter(event.target.value)
  }

  const showCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <>
      <div>
        find countries <input value={filter} onChange={handleFilterInput} />
      </div>
      {showCountries.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        showCountries.map((c) => (
          <DisplayCountry key={c.name.common} country={c} />
        ))
      )}
    </>
  )
}

export default App
