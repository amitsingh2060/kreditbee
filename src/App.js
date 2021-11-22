import React, {useEffect, useState} from 'react'

function App() {
  const [country, setcountry] = useState([]);
  const [state, setstate] = useState([]);
  const [filterState, setfilterState] = useState([]);
  const [city, setcity] = useState([]);
  const [filterCity, setfilterCity] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
        const res = await Promise.all([
          fetch(
            "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json"
          ),
          fetch(
            "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json"
          ),
           fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json'),
        ])
        const data = await Promise.all(res.map((e) => e.json()));
        setcountry(data[0]);
        setstate(data[1]);
        setfilterState(data[1]);
        setcity(data[2]);
        setfilterCity(data[2]);

    } catch {

    }
  }
  const countryChange = (id) => {
    const filterState = state.filter(e => e.country_id == id);
    setfilterState(filterState)

  }

  const cityChange = (id) => {
    const filterState = city.filter(e => e.state_id == id);
    setfilterCity(filterState)
  }
  return (
    <div>
      <select onChange={(e) => countryChange(e.target.value)}>
         {
           country.length > 0 && country.map( c => {
             return (
               <option value={c.id}>{c.name}</option>
             )
           })
         }
      </select>
      <select onChange={(e) => cityChange(e.target.value)}>
         {
           filterState.length > 0 && filterState.map( c => {
             return (
               <option value={c.id}>{c.name}</option>
             )
           })
         }
      </select>

      <select>
         {
          filterCity.length > 0 && filterCity.map( c => {
             return (
               <option value={c.id}>{c.name}</option>
             )
           })
         }
      </select>
    </div>
  )
}

export default App
