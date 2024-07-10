import { createContext, useState } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import IsLoggedOut from "./components/Routing/IsLoggedOut";
import IsLoggedIn from "./components/Routing/IsLoggedIn";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import CreateActivity from "./Pages/CreateActivity"
import Theme from "./components/Theme";
import HomePage from "./Pages/HomePage";
import LogoutHomePage from "./Pages/LogoutHomePage";
export const MyContext = createContext();
function App() {
  const [theme, setTheme] = useState("dark");

  function changeTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  const contextValues = { theme, changeTheme };
  const style = {
    color: theme === "dark" ? "white" : "black",
    backgroundColor: theme === "dark" ? "black" : "white",
  };

  return (
    <>
      <MyContext.Provider value={contextValues}>
        <div  className="h-[100dvh]">
          
          <Navbar />
          <Routes>
            <Route element={<IsLoggedOut />}>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
       
            </Route>

            <Route element={<IsLoggedIn />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateActivity/>}/>
            </Route>
          </Routes>
        </div>
      </MyContext.Provider>
    </>
  );
}

export default App;
