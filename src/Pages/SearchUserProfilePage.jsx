import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { useParams } from "react-router";
import service from "../service/api"; // Ensure this import is correct
import FollowerButton from "../components/FollowerButton";
function SearchUserProfilePage() {
  const { user } = useContext(AuthContext);
  const { name } = useParams(); // Get 'name' parameter from URL
  const [getuser, setUser] = useState(null); // Initialize state to hold user data
  console.log(name);
  // Function to handle search
  const handleSearch = async () => {
    try {
      const response = await service.get(`/users/${name}`);
      setUser(response.data.user[0]);
      console.log(response);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };
  console.log(getuser);
  console.log(user);
  useEffect(() => {
    handleSearch();
  }, [name]);

  return (
    <div className="relative min-h-[80vh]">
      {getuser ? (
        <div>
          <div className="w-[100%]">
            <img src={getuser.image} alt="" className="w-[80%] mx-auto" />
            <div className="w-[80%] mx-auto">
              <p>
                <strong>Name:</strong> {getuser.name}
              </p>
              <p>
                <strong>Email:</strong> {getuser.email}
              </p>
            </div>
          </div>
          <div classNamew="w-[100%] mx-auto">
            <h3 className="w-[max-content] mx-auto p-4 m-4 border-2">
              Activities done today
            </h3>
            <div className="w-[80%] mx-auto">
              {user.workoutList.map((e) => (
                <div className="p-4 border-2 m-2">
                  <h4>{e}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <div className="absolute top-0 hidden">
        <FollowerButton />
      </div>
    </div>
  );
}

export default SearchUserProfilePage;
