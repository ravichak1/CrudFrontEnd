import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { useParams, useNavigate } from "react-router";
import service from "../service/api";

function EditActivity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const getUser = user.user;

  const [type, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await service.get(
          `/${getUser.username}/oneactivity/${id}`
        );
        const activity = response.data;
        setTitle(activity.type || "");
        setDuration(activity.duration || 0);
        setDistance(activity.distance || 0);
        setSets(activity.sets || 0);
        setReps(activity.reps || 0);
        setCalories(activity.calories || 0);
      } catch (error) {
        console.log(error);
      }
    }

    fetchActivity();
  }, [getUser.username, id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await service.put(`/${getUser.username}/activity/${id}`, {
        type,
        duration,
        distance,
        sets,
        reps,
        calories,
      });
      navigate("/"); // Redirect to the activities list after successful update
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto p-4 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Edit Activity</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={type}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Duration (mins)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Distance (kms)
          </label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sets
          </label>
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Reps
          </label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Calories
          </label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Activity
        </button>
      </form>
    </div>
  );
}

export default EditActivity;
