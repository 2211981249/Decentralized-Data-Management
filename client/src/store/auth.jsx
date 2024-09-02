import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});

  const storetokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  //Logout Funcanality here

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //JWT Authentication -> to get the currently logged in user data

  const userAuthentication = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:7000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Correct the typo
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.userData);
        //   console.log(data);
        setUser(data.userData);
        console.log("user data", data);
      } else {
        console.log("Failed to fetch user   data");
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storetokenInLS,
        LogoutUser,
        userAuthentication,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
