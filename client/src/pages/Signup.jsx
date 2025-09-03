import React, { useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, email, password });
      navigate("/login");
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Signup</button>
    </form>
  );
}
