import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, Button } from "@mui/material";
import service from "../service/api";
import {
  faCamera,
  faFireFlameSimple,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function HomePageSub() {
  const { user, authenticateUser } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const getUser = user.user;
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await service.put(
        `/user/image/${getUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setImage("");
        authenticateUser();
      } else {
        setError("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image", error);
      setError("Error uploading image. Please try again.");
    }
  }
  const handleDelete = () => {
    service
      .delete(`/user/${user.user._id}`)
      .then(() => {
        // Call removeToken, removeUserId, and disconnect to clear user data and session
        authenticateUser();
        disconnect();
        navigate(`/signup`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const totalCalories = user.totalCaloriesBurnt;
  const totalWorkouts = user.totalWorkouts;

  return (
    <div className="border-2 w-[100%] p-4 text-center relative rounded-md">
      <div className="relative h-[100px] w-[100px] mx-auto">
        <Popup
          trigger={
            <button className="absolute bottom-0 right-[10]">
              <FontAwesomeIcon
                icon={faCamera}
                className="text-blue-500"
                size="2x"
              />
            </button>
          }
          position="right center"
        >
          <form onSubmit={handleSubmit} className="absolute">
            <TextField
              type="file"
              variant="outlined"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Popup>
        <img
          src={getUser.image}
          alt="Profile"
          className="rounded-full w-[100%] h-[100%]"
        />
      </div>

      <div className="mt-4">
        <h4>{getUser.name.toUpperCase()}</h4>
        <h4 className="text-2xl">
          {totalCalories}
          <FontAwesomeIcon
            icon={faFireFlameSimple}
            className="px-3 text-orange-700"
          />
        </h4>
        <h4 className="text-2xl">
          {totalWorkouts}{" "}
          <FontAwesomeIcon icon={faDumbbell} className="text-blue-700" />
        </h4>
        <h4>
          {getUser.followers.length > 0 ? getUser.followers.length : null}
        </h4>
        <h4>
          {getUser.following.length > 0 ? getUser.following.length : null}
        </h4>
      </div>
      <div className="flex items-center justify-center mt-8 gap-4">
        <div className="col-start-4">
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={handleDelete}
          >
            Delete User
          </button>
        </div>
        <div className="">
          <Link
            to={"/edit"}
            className="border-2 p-2 rounded-md bg-blue-500 text-white"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default HomePageSub;
