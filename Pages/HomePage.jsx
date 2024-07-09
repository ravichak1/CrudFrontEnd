import React from "react";
import { useContext } from "react";
import service from "../service/api";
import { AuthContext } from "../context/AuthContextWrapper";
function HomePage() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const data = user.user;

  async function deleteUser(userId) {
    await service.delete(`/${userId}`);
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
    </div>
  );
}

export default HomePage;
