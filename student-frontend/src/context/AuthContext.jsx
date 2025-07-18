import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // Fetch profile when token changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${BACKEND_URL}/api/students/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) setStudent(data);
        else {
          setToken("");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };
    fetchProfile();
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken("");
    setStudent(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ student, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
