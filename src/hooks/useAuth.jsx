import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  });

  async function register(email, password, name) {
    try {
      const data = await api.post("/user", {email, password, name}).then((response) => {
        return response.data;
      });
      authUser(data);
    } catch (error) {
    }
  }

  async function login(email, password) {

    try {
      const data = await api.post("/login", {email, password}).then((response) => {
        return response.data;
      });

      authUser(data);
    } catch (error) {
    }
  }

  function authUser(data) {
    localStorage.setItem("token", JSON.stringify(data.token.plainTextToken));
    api.defaults.headers.authorization = `Bearer ${data.token.plainTextToken}`;
    setAuthenticated(true);
    setUser(data.user)
    navigate("/");
  }

  function logout() {
    setAuthenticated(false);
    setUser({});
    localStorage.removeItem("token");
    api.defaults.headers.authorization = undefined;
    navigate("/login");
  }
  return { register, login, authenticated, logout, user };
}