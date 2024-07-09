import React, { useState } from "react";
import { useNavigate } from "react-router";
import service from "./../service/api";
import {
  TextField,
  Stack,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: "",
    age: 16,
    height: 0,
    weight: 0,
    gender: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.target.value;
    const key = event.target.name; // Change from id to name
    setFormData({ ...formData, [key]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await service.post("/signup", formData);
      console.log(response);

      if (response.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const {
    name,
    username,
    email,
    password,
    image,
    age,
    height,
    weight,
    gender,
  } = formData;
  return (
    <>
      <React.Fragment>
        <h2>Register Form</h2>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              label="Name"
              name="name"
              onChange={handleChange}
              value={name}
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              label="Username"
              name="username"
              onChange={handleChange}
              value={username}
              fullWidth
              required
            />
          </Stack>
          <TextField
            type="email"
            variant="outlined"
            label="Email"
            name="email"
            onChange={handleChange}
            value={email}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            name="password"
            onChange={handleChange}
            value={password}
            required
            fullWidth
            sx={{ mb: 4 }}
          />
          <TextField
            type="text"
            variant="outlined"
            label="Profile Image"
            name="image"
            onChange={handleChange}
            value={image}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <TextField
            type="number"
            variant="outlined"
            label="Age"
            name="age"
            onChange={handleChange}
            value={age}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <TextField
            type="number"
            variant="outlined"
            label="Height in cm"
            name="height"
            onChange={handleChange}
            value={height}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <TextField
            type="number"
            variant="outlined"
            label="Weight in kg"
            name="weight"
            onChange={handleChange}
            value={weight}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <FormControl fullWidth variant="outlined" sx={{ mb: 4 }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              value={gender}
              onChange={handleChange}
              label="Gender"
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" type="submit">
            Register
          </Button>
        </form>
        <small>
          Already have an account? <Link to="/login">Login Here</Link>
        </small>
      </React.Fragment>
    </>
  );
}

export default SignupPage;
