import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextWrapper";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
function HomePageSub() {
  const { user } = useContext(AuthContext);
  const data = user.user;
  console.log(user);
  const lastWorkout=user.workoutList.length-1
  console.log(lastWorkout)
  return (
    <div>
      <div className="relative h-[90px] w-[90px]">
      <Link to={"/image"}  className="absolute bottom-0 right-0">
      <FontAwesomeIcon icon={faCamera} />
      </Link>
      <img
        src={data.image}
        alt=""
        className="rounded-full w-[80px] h-[80px]"
      />
      </div>
      
      <h3>{data.name}</h3>
      <h4>{user.totalWorkouts}</h4>
      <h4>{user.workoutList[lastWorkout]}</h4>
    </div>
  );
}

export default HomePageSub;
