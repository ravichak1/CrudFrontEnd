import { createContext, useState } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IsLoggedOut from "./components/Routing/IsLoggedOut";
import IsLoggedIn from "./components/Routing/IsLoggedIn";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import CreateActivity from "./Pages/CreateActivity";
import Theme from "./components/Theme";
import HomePage from "./Pages/HomePage";
import LogoutHomePage from "./Pages/LogoutHomePage";
import SearchUserProfilePage from "./Pages/SearchUserProfilePage";
import EditProfilePage from "./Pages/EditProfilePage";
import EditActivity from "./Pages/EditActivity";

export const MyContext = createContext();
function App() {
  return (
    <>
      <MyContext.Provider>
        <div className="h-[100vh]">
          <Navbar />
          <Routes>
            <Route element={<IsLoggedOut />}>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<IsLoggedIn />}>
              <Route path="/" element={<HomePage />} />
              <Route path={`/user/:name`} element={<SearchUserProfilePage />} />
              <Route path="/create" element={<CreateActivity />} />
              <Route path="/edit" element={<EditProfilePage />} />
              <Route path="/update/:id" element={<EditActivity />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </MyContext.Provider>
    </>
  );
}

export default App;
