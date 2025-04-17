import React from 'react'
import { Link } from 'react-router-dom'

export const CountryCard = ({name, img, population, region, capital, data}) => {
  
  return (
      <Link className="country-card" to={`/${name}`} state={{data}}>
      <div className="image">
        <img src={img} alt={name} />
      </div>
      <div className="card-details">
        <h2>{name}</h2>
        <p><b>Population:</b> {population.toLocaleString("en-IN")}</p>
        <p><b>Region:</b> {region}</p>
        <p><b>Capital:</b> {capital}</p>
      </div>
    </Link>
  )
}
