import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextWrapper";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TextField } from "@mui/material";
import { faCamera } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import Popup from "reactjs-popup";
function HomePageSub() {
  const { user,activities } = useContext(AuthContext);
  const data = user.user;
  const workout= user.workoutList
  console.log(user,activities);
  
  const lastWorkout=user.workoutList.length-1

  const lastActivity=workout[lastWorkout]

  return (
    <div className="border-2 w-[max-content] p-4 text-center">
      <div className="relative h-[90px] w-[90px]">
        <Popup trigger={<button  className="absolute bottom-0 right-0">
      <FontAwesomeIcon icon={faCamera} />
      </button>}>
      <TextField
            type="file"
            variant="outlined"
            label=""
            name="image"
           
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <button type="submit">Submit</button>
      </Popup>
      <img
        src={data.image}
        alt=""
        className="rounded-full w-[80px] h-[80px]"
      />
      </div>
      
      <h3>{data.name}</h3>
        <h4>Total workouts: {activities.length}</h4>
        <h4></h4>
        <h4>Following: {data.following.length}</h4>
        <h4>Followers: {data.followers.length}</h4>

    </div>
  );
}

export default HomePageSub;
