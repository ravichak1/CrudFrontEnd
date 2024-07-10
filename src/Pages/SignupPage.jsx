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
    const key = event.target.id; // Change from id to name
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
      <div className="App">
            <h1>Sign</h1>
            <fieldset>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label for="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        required
                    />
                    <label for="username">Usernames</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                        required
                    />
                    <label for="email">Enter Emails </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                    <label for="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <label>Select your choice</label>
                    <select
                        name="gender"
                        id="gender"
                        value={gender}
                        onChange={handleChange
                        }
                    >
                        <option
                            value="Male"
                            disabled
                            
                        >
                        </option>
                        <option
                            value="Female"
                            disabled
                            
                        ></option>
                        <option
                            value="Other"
                            disabled
                          
                        ></option>
                      </select>
                    
                    <button
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </fieldset>
        </div>
    </>
  );
}

export default SignupPage;
