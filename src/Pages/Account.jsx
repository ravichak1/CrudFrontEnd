// src/components/HomePage.js
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./../context/AuthContextWrapper";
import HomePageSub from "../components/HomePageSub";
import service from "../service/api";
import AllUsers from "../components/AllUsers";
import SearchUsers from "../components/SearchUsers";

function HomePage() {
  const { user, removeToken, removeUserId, disconnect, activities } =
    useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  const eachUser = user.user;
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
    <div className="sm:flex sm:flex-col min-h-[80vh]">
      <div>
        <SearchUsers />
      </div>

      <div className="sm:flex sm:flex-col sm:gap-4 md:grid  md:grid-cols-4 sm:mt-8">
        <div className=" md:grid-cols-3 w-[90%] mx-auto">
          <HomePageSub />
        </div>

        {/* <div className="col-start-4">
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={handleDelete}
            >
            Delete User
          </button>
        </div> */}

        <div className="w-[90%] mx-auto">
          <h2 className="">
            Activities by{" "}
            <span className="font-semibold">{eachUser.name.toUpperCase()}</span>
          </h2>
          <ul className="flex flex-col gap-4">
            {activities.map((activity) => (
              <li
                key={activity._id}
                className="border-2 p-2 bg-black bg-opacity-10 rounded-md"
              >
                <div className="flex gap-4 ">
                  {activity.type}
                  {activity.duration > 0 ? (
                    <p>{activity.duration}mins</p>
                  ) : (
                    <p>0 mins</p>
                  )}
                  {activity.calories > 0 ? (
                    <p>{activity.calories}calories</p>
                  ) : (
                    <>0 calories</>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-start-2 col-end-4 row-start-1">
          <AllUsers />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
