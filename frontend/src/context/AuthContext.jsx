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
    console.log("Attempting login for:", username);
    const res = await api.post("/auth/login", { username, password });
    console.log("Login POST success");
    localStorage.setItem("token", res.data.access_token);
    console.log("Token stored, fetching /me...");
    const me = await api.get("/auth/me");
    console.log("/me fetch success");
    setUser(me.data);
    return me.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
