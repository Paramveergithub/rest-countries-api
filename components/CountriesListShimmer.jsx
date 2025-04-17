import React from 'react'
import './CountriesListShimmer.css'

export const CountriesListShimmer = () => {
  return (
    <div className='countries-container'>
      {
        Array.from({length: 20}).map((el, i) => {
          return <div key={i} className='country-card shimmer-card'>
            <div className='image'></div>
            <div className='card-details'>
              <h3 className='card-title'></h3>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>;
        })  
      }
    </div>
  )
}
