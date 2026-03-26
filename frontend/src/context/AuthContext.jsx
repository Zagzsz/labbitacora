import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Checking auth status...", token ? "Token found" : "No token");
    
    if (token) {
      api
        .get("/auth/me")
        .then((res) => {
          console.log("Auth success");
          setUser(res.data);
        })
        .catch((err) => {
          console.error("Auth failed:", err.message);
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", res.data.access_token);
    // Fetch user info with the new token
    const userRes = await api.get("/auth/me");
    setUser(userRes.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (username, email, password) => {
    return await api.post("/auth/register", { username, email, password });
  };

  const verifyEmail = async (email, code, purpose) => {
    return await api.post("/auth/verify-email", { email, code, purpose });
  };

  const forgotPassword = async (email) => {
    return await api.post("/auth/forgot-password", { email });
  };

  const resetPassword = async (email, code, new_password) => {
    return await api.post("/auth/reset-password", { email, code, new_password });
  };

  return (
    <AuthContext.Provider value={{ 
      user, loading, login, logout, 
      register, verifyEmail, forgotPassword, resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
