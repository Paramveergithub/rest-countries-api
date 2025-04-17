// import CountriesData from '../CountriesData'
import React, { useEffect, useState } from "react";
import { CountryCard } from "./CountryCard";
import { CountriesListShimmer } from "./CountriesListShimmer";

export default function CountriesList({ query }) {
  const [CountriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data);
      })
      .catch((err) =>{
        console.log("Error fetching countries data", err);
      })
  }, []);

  return (
    <>
      {!CountriesData.length ? (
        <CountriesListShimmer />
      ) : (
        <div className="countries-container">
          {CountriesData.filter(
            (country) =>
              country.name.common.toLowerCase().includes(query) ||
              country.region.toLowerCase().includes(query)
          ).map((country) => {
            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                img={country.flags.svg}
                population={country.population}
                region={country.region}
                capital={country.capital ? country.capital[0] : "N/A"}
                data={country}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
