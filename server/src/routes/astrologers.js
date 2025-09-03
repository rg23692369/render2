import express from "express";
import AstrologerProfile from "../models/AstrologerProfile.js";

const router = express.Router();

// GET /api/astrologers
router.get("/", async (req, res) => {
  const astrologers = await AstrologerProfile.find().populate("user", "username email");
  res.json(astrologers);
});

// GET /api/astrologers/:id
router.get("/:id", async (req, res) => {
  const profile = await AstrologerProfile.findById(req.params.id).populate("user", "username email");
  if (!profile) return res.status(404).json({ error: "Astrologer not found" });
  res.json(profile);
});

export default router;
