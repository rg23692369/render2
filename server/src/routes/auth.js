import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email & password required" });

  const user = await User.findOne({ email });
  if (!user || user.password !== password) return res.status(401).json({ error: "Invalid credentials" });

  // Dummy JWT token
  const token = "dummy-jwt-token"; 
  res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: "All fields required" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Email already exists" });

  const user = await User.create({ username, email, password, role: "user", wallet: 0 });
  res.json({ user });
});

export default router;
