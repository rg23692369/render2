import React, { useState } from "react";
import api from "../lib/api";
import { setToken } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
