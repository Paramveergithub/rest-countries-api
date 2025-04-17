import { useContext, useState } from "react";
import "../App.css";
import SearchBar from "./SearchBar";
import { FilterMenu } from "./FilterMenu";
import CountriesList from "./CountriesList";
import {ThemeContext} from "../contexts/ThemeContext";
import { useWindowSize } from "../hooks/useWindowSize";

export const Home = () => {
  const [query, setQuery] = useState("");
  const [isDark] = useContext(ThemeContext);
  const windowSize = useWindowSize();

  return (
    <main className={`container ${isDark ? "dark-mode" : ""}`}>
        <div className="search-section">
          <SearchBar setQuery={setQuery}/>
          <FilterMenu setQuery={setQuery}/>
        </div>
        <h1 style={{textAlign: "center"}}> {windowSize.width} x {windowSize.height}</h1>
        <CountriesList query={query} />
    </main>
  )
}
