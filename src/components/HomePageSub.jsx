import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, Button } from "@mui/material";
import service from "../service/api";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
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
    formData.append('image', image);

    try {
      const response = await service.put(`/user/image/${getUser._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        
        setImage("");
        authenticateUser()
        
      } else {
        setError("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image", error);
      setError("Error uploading image. Please try again.");
    }
  }
  
  const totalCalories = user.totalCaloriesBurnt;
  const totalWorkouts = user.totalWorkouts;

  return (
    <div className="border-2 w-[max-content] p-4 text-center">
      <div className="relative h-[90px] w-[90px]">
        <Popup trigger={<button className="absolute bottom-0 right-0">
          <FontAwesomeIcon icon={faCamera} className=""/>
        </button>} position="left center">
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
          className="rounded-full w-[80px] h-[80px]"
        />
      </div>
      
      <div>
        <h4>{getUser.name}</h4>
        <h4>{totalCalories}</h4>
        <h4>{totalWorkouts}</h4>
        <h4>{getUser.followers.length > 0 ? getUser.followers.length : null}</h4>
        <h4>{getUser.following.length > 0 ? getUser.following.length : null}</h4>
      </div>
      <div>
        <Link to={"/edit"}>Edit Profile</Link>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default HomePageSub;
