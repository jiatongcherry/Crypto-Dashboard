import React, { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase/firebase";


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(initializeUser);
  }, [])

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
      setLoading(false);
    }
    else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setLoading(false);
    }
  }

  return <AuthContext.Provider value={{ currentUser, userLoggedIn, loading }}>{!loading && children}</AuthContext.Provider>;
}