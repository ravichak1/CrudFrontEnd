// src/components/HomePage.js
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./../context/AuthContextWrapper";
import HomePageSub from "../components/HomePageSub";
import service from "../service/api";

function HomePage() {
  const { user, removeToken, removeUserId, disconnect } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    service
      .delete(`/user/${user.user._id}`)
      .then(() => {
        // Call removeToken, removeUserId, and disconnect to clear user data and session

        disconnect();
        navigate(`/signup`);
      })
      .catch((error) => {
        console.log(error);
        // Optionally, show an error message to the user
        alert("Failed to delete the user. Please try again.");
      });
  };

  return (
    <div>
      <HomePageSub />
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={handleDelete}
      >
        Delete User
      </button>
    </div>
  );
}

export default HomePage;
