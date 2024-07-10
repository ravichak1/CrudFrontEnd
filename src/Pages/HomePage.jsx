// src/components/HomePage.js
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./../context/AuthContextWrapper";
import HomePageSub from "../components/HomePageSub";
import service from "../service/api";
import Searchbar from "../components/Searchbar";

function HomePage() {
  const { user, removeToken, removeUserId, disconnect ,activities} =
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
      <h2>Activities</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity._id}>
                        {activity.type} - {activity.duration} mins- {activity.calories} calories
                    </li>
                ))}
            </ul>
    </div>
  );
}

export default HomePage;
