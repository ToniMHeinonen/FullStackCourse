import {useState, useEffect} from 'react'
import axios from 'axios'

const DisplayCountry = ({country}) => (
  <div>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital[0]}</div>
    <div>area {country.area}</div>
    <h2>languages:</h2>
    <ul>
      {Object.keys(country.languages).map((key) => (
        <li key={key}>{country.languages[key]}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt="Country  flag" width="150" />
  </div>
)

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('getting')
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
      ) : showCountries.length == 1 ? (
        <DisplayCountry country={showCountries[0]} />
      ) : (
        showCountries.map((c) => <div>{c.name.common}</div>)
      )}
    </>
  )
}

export default App
