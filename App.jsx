import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";


export const App = () => {
  
  return (
    <ThemeProvider>
      <Header/>
      <Outlet/>
    </ThemeProvider>
  );
};
