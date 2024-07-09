import React, { useContext } from "react";
import { useNavigate } from "react-router";
import service from "../service/api";
import { AuthContext } from "../context/AuthContextWrapper";

function HomePage() {
  const { user, disconnect, removeToken, removeUserId } =
    useContext(AuthContext);
  const data = user.user;
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await service.delete(`/user/${user.user._id}`);
      console.log(response);

      if (response) {
        removeToken();
        removeUserId();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <img
        src={data.image}
        alt="User Profile"
        style={{ borderRadius: "50%", width: 100 }}
      />
      <h4>{data.age}</h4>
      <h4>{data.height}cm</h4>
      <h4>{data.weight}kg</h4>
      <h4>{data.gender}</h4>
      <h4>Total calories Burned: {user.totalCaloriesBurnt}</h4>
      <h4>Total workouts: {user.totalworkouts}</h4>
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={handleSubmit}
      >
        Delete User
      </button>
    </div>
  );
}

export default HomePage;
