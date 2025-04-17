import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";


export const Header = () => {
  const [isDark, setIsDark] = useContext(ThemeContext);
  
  return (
    <header className={`header-container ${isDark ? "dark-mode" : ""}`}>
      <div className="container">
        <h2 className="title">
          <Link to="/">Where in the world?</Link>
        </h2>
        <p className="dark-mode-btn" onClick={() =>  {
           setIsDark(!isDark)
           localStorage.setItem('isDarkMode', !isDark)
         }}>
          <i className={`fa-regular fa-${isDark ? 'sun' : 'moon'}`}></i> &nbsp; {isDark ? 'Light' : 'Dark'} Mode
        </p>
      </div>
    </header>
  );
};
