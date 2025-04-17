import React from 'react'

export const FilterMenu = ( {setQuery} ) => {
  return (
    <select name="filter" id="" className="filter" onChange={(e) => setQuery(e.target.value.toLowerCase())}>
        <option hidden="">Filter by Region</option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
    </select>
  )
}
