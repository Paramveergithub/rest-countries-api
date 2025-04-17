import React, { useContext, useEffect, useState } from "react";
import "./Country.css";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { CountryDetailShimmer } from "./CountryDetailShimmer";
import { ThemeContext } from "../contexts/ThemeContext";

export const CountryDetail = () => {
  const [isDark] = useContext(ThemeContext);
  const params = useParams();
  const countryName = params.countryPage;
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { state } = useLocation();
  // console.log(isDark);
  function updateCountryData(data) {
    setCountryData({
      name: data.name.common,

      nativeName: data.name.nativeName
        ? Object.values(data.name.nativeName)
            .map((name) => name.common)
            .join(", ")
        : "N/A",

      flag: data.flags.svg,
      population: data.population.toLocaleString("en-In"),
      region: data.region,
      capital: data.capital ? data.capital[0] : "N/A",
      subRegion: data.subregion ? data.subregion : "N/A",
      topLevelDomain: data.tld ? data.tld.join(", ") : "N/A",
      currencies: data.currencies
        ? Object.values(data.currencies)
            .map((currency) => currency.name)
            .join(", ")
        : "N/A",
      languages: data.languages
        ? Object.values(data.languages).join(", ")
        : "N/A",
      borders: [],
    });
    if (!data.borders) {
      data.borders = [];
    }
    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha?codes=${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            return borderCountry.name.common;
          });
      })
    )
      .then((allBorders) => {
        setCountryData((prevState) => ({ ...prevState, borders: allBorders }));
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  }

  useEffect(() => {
    if (state) {
      // console.log(state.data);
      updateCountryData(state.data);
      return;
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true
      `)
      .then((res) => res.json())
      .then(([data]) => {
        // console.log(data)
        updateCountryData(data);
      });
  }, [countryName]);

  if (notFound) {
    return <div>Country not found</div>;
  }
  return (
    <main className={`country-page-container ${isDark ? "dark-mode" : ""}`}>
      <div className="back-btn-container">
        <span className="back-btn" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i> &nbsp; Back
        </span>
      </div>
      {countryData === null ? (
        <CountryDetailShimmer />
      ) : (
        <div className="country-container">
        <div className="country-flag">
          <img src={countryData.flag} alt="country flag" />
        </div>
        <div className="country-details">
          <h1 className="country-name">{countryData.name}</h1>
          <div className="coverCol">
            <div className="firstCol">
              <p>
                <b>Native Name: </b>{" "}
                <span className="native-name"> {countryData.nativeName}</span>
              </p>

              <p>
                <b>Population: </b>
                <span className="population"> {countryData.population}</span>
              </p>

              <p>
                <b>Region: </b>{" "}
                <span className="Region"> {countryData.region}</span>
              </p>

              <p>
                <b>Sub Region: </b>{" "}
                <span className="sub-region"> {countryData.subRegion}</span>
              </p>

              <p>
                <b>Capital: </b>{" "}
                <span className="capital">{countryData.capital}</span>
              </p>
            </div>
            <div className="secondCol">
              <p>
                <b>Top Level Domain: </b>{" "}
                <span className="top-level-domain">
                  {countryData.topLevelDomain}
                </span>
              </p>

              <p>
                <b>Currencies: </b>{" "}
                <span className="currencies">{countryData.currencies}</span>
              </p>

              <p>
                <b>Languages: </b>{" "}
                <span className="language">{countryData.languages}</span>
              </p>
            </div>
          </div>
          <div className="border-col">
            <div className="border-title">
              <p>
                <b>Border Countries: </b>
              </p>
            </div>
            <div className="border-countries">
              {countryData.borders.map((border) => (
                <Link key={border} to={`/${border}`}>
                  {border}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      )
      }
    </main>
  )
};
