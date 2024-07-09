import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
function HomePageSub() {
  const { user } = useContext(AuthContext);
  const data = user.user;
  console.log(user);
  return (
    <div>
      <img
        src={data.image}
        alt=""
        className="rounded-full w-[100px] h-[100px]"
      />
      <h3>{data.name}</h3>
      <h4>{user.totalWorkouts}</h4>
      <h4>{user.workoutList[0]}</h4>
    </div>
  );
}

export default HomePageSub;
