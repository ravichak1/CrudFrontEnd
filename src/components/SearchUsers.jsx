// src/components/SearchUsers.js
import React, { useState } from "react";
import service from "../service/api";
import { TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
function SearchUsers() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (query === "") {
      return setQuery("");
    }
    try {
      const response = await service.get(`/search?name=${query}`);
      setResults(response.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Box className="flex items-center gap-4 rounded-full bg-white py-[2%] px-[3%] md:w-[50%] h-[4rem] justify-center sm:w-[100%] ">
          <TextField
            label="Search User"
            variant="standard"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-red-600 font-bold"
          />
          <button onClick={handleSearch} className="">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </Box>
      </div>
      <List>
        {results.map((user) => (
          <div key={user._id} className="flex gap-8 justify-center my-8 ">
            <img
              src={user.image}
              alt=""
              className="w-[50px] rounded-full h-[50px]"
            />
            <h4>{user.name}</h4>
            <Link to={`/user/${user.username}`}>View Profile</Link>
          </div>
        ))}
      </List>
    </>
  );
}

export default SearchUsers;
