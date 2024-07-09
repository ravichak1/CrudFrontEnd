import React from "react";
import { useContext } from "react";
import service from "../service/api";
import { AuthContext } from "../context/AuthContextWrapper";
import axios from "axios";
import { useNavigate } from "react-router";
function HomePage() {
  const { user, removeToken, removeUserId } = useContext(AuthContext);
  const data = user.user;
  console.log(user.user._id);
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await service.delete(`/user/${user.user._id}`);
      console.log(response);

      if (response.status === 200) {
        removeToken;
        removeUserId;
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <img
        src={data.image}
        alt=""
        style={{ borderRadius: "50%", width: 100 }}
      />
      <h4>{data.age}</h4>
      <h4>{data.height}cm</h4>
      <h4>{data.weight}kg</h4>
      <h4>{data.gender}</h4>
      <h4>Total calories Burned: {user.totalCaloriesBurnt}</h4>
      <h4>Total workouts: {user.totalworkouts}</h4>
      {/* {user.workoutsList.length >= 1 ? (
        <h4>{user.workoutsList}</h4>
      ) : (
        <h4>No workouts</h4>
      )} */}
      <button
        className="bg-red-500"
        onClick={() => {
          console.log(`hello ${user.user._id}`);
          handleSubmit(user.user._id);
        }}
      >
        Delete User
      </button>
    </div>
  );
}

export default HomePage;
