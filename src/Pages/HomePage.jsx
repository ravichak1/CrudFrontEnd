// src/components/HomePage.js
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./../context/AuthContextWrapper";
import HomePageSub from "../components/HomePageSub";
import service from "../service/api";
import AllUsers from "../components/AllUsers";
import SearchUsers from "../components/SearchUsers";


function HomePage() {
  const { user, removeToken, removeUserId, disconnect ,activities} =
    useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user)
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
      <div>
        <SearchUsers/>
      </div>
      
      <div className="grid grid-cols-4">

        <div className="grid-cols-3">

        <HomePageSub />
        </div>
      
        <div className="col-start-4">
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={handleDelete}
            >
            Delete User
          </button>
        </div>
          
        <div className="col-start-2 col-end-4 row-start-1">
          <h2>Activities</h2>
          <ul>
              {activities.map((activity) => (
                <li key={activity._id}>
                    {activity.type} - {activity.duration} mins- {activity.calories} calories
                  </li>
              ))}
          </ul>
        </div>

        <div className="col-start-1 col-end-4">
          <AllUsers/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
