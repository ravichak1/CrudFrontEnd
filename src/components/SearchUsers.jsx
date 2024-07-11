// src/components/SearchUsers.js
import React, { useState } from "react";
import service from "../service/api";
import { TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function SearchUsers() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await service.get(`/search?name=${query}`);
      setResults(response.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <div>
      <TextField
        label="Search for users"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button onClick={handleSearch} variant="contained">
        Search
      </Button>
      <List>
        {results.map((user) => (
          <ListItem key={user._id}>
            <ListItemText primary={user.name} />
            <Link to={`/user/${user.username}`}>View Profile</Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SearchUsers;
