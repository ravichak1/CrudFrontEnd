// Updated AuthContextWrapper.jsx

import { createContext, useState, useEffect, useCallback } from "react";
import service from "./../service/api";
export const AuthContext = createContext();

function AuthContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
      console.error("Failed to authenticate user:", error);
    }
  }, []);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  function disconnect() {
    removeToken();
    removeUserId();
    authenticateUser();
  }

  const contextValues = {
    user,
    storeToken,
    storeUserId,
    removeToken,
    removeUserId,
    authenticateUser,
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
