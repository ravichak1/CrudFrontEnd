// Updated AuthContextWrapper.jsx

import { createContext, useState, useEffect, useCallback } from "react";
import service from "./../service/api";
export const AuthContext = createContext();

function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activities,setActivities] = useState([])

  const storeToken = (token) => localStorage.setItem("authtoken", token);
  const storeUserId = (userId) => localStorage.setItem("userid", userId);
  const removeToken = () => localStorage.removeItem("authtoken");
  const removeUserId = () => localStorage.removeItem("userid");
  
  const authenticateUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("authtoken");
      const userId = localStorage.getItem("userid");
      if (!token) {
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
        return;
      }

      console.log(userId);

      const response = await service.get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
      setIsLoading(false);
      setIsLoggedIn(true);
      console.log(response.data)
      
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
      console.error("Failed to authenticate user:", error);
    }
  }, []);

  const fetchActivities = useCallback(async () => {
    try {
        const userId = localStorage.getItem("userid");
        const response = await service.get(`/${userId}/activity`);
        setActivities(response.data); // Assuming the response contains activities
        console.log(response.data)
    } catch (error) {
        console.error("Failed to fetch activities:", error);
    }
}, [user]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  useEffect(() => {
    if (isLoggedIn) {
        fetchActivities();
    }
}, [isLoggedIn, fetchActivities]);

  function disconnect() {
    removeToken();
    removeUserId();
    authenticateUser();
  }

  const contextValues = {
    user,
    activities, // Provide activities state
    storeToken,
    storeUserId, // Provide function to store user ID
    removeToken,
    removeUserId, // Provide function to remove user ID
    authenticateUser,
    fetchActivities, // Provide function to fetch activities
    isLoading,
    isLoggedIn,
    disconnect,
};

return (
    <AuthContext.Provider value={contextValues}>
        {!isLoading && children}
    </AuthContext.Provider>
);
}

export default AuthContextWrapper;