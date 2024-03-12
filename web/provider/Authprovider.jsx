import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    authenticated: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("login");
    if (user) {
      setCurrentUser({
        email,
        authenticated: true,
      });
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
