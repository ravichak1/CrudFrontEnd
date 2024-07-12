import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { TextField, Stack, Button } from "@mui/material";
import service from "./../service/api";
import { useNavigate } from "react-router";

function EditProfilePage() {
  const { user, authenticateUser } = useContext(AuthContext);
  const getUser = user.user;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (getUser) {
      setName(getUser.name || "");
      setUsername(getUser.username || "");
      setAge(getUser.age || "");
      setHeight(getUser.height || "");
      setWeight(getUser.weight || "");
    }
  }, [getUser]);
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("age", age);
    formData.append("height", height);
    formData.append("weight", weight);

    try {
      console.log("hello");
      const response = await service.put(`/user/${getUser._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      authenticateUser();
      navigate("/");
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <div className="min-h-[80vh]">
      <h2 className="text-2xl w-[max-content] mx-auto">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="number"
            variant="outlined"
            label="Age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="number"
            variant="outlined"
            label="Height in cm"
            name="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            fullWidth
            required
          />
          <TextField
            type="number"
            variant="outlined"
            label="Weight in kg"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            required
          />
        </Stack>
        <Button variant="outlined" type="submit">
          Edit
        </Button>
      </form>
    </div>
  );
}

export default EditProfilePage;
