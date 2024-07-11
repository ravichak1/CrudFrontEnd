import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContextWrapper';
import { useParams } from 'react-router';
import service from '../service/api'; // Ensure this import is correct
import FollowerButton from '../components/FollowerButton';
function SearchUserProfilePage() {
  const { name } = useParams();  // Get 'name' parameter from URL
  const [user, setUser] = useState(null);  // Initialize state to hold user data
    console.log(name)
  // Function to handle search
  const handleSearch = async () => {
    try {
      const response = await service.get(`/users/${name}`);  
      setUser(response.data.user[0]); 
      console.log(response.data.user[0]) 
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };
  
  useEffect(() => {
    handleSearch();  
  }, [name]);

  return (
    <div>
  
      {user ? (
        <div>
            <img src={user.image} alt="" />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <div>
        <FollowerButton/>
      </div>
    </div>
  );
}

export default SearchUserProfilePage;
