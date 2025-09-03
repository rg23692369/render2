import express from "express";

const router = express.Router();

// POST /api/bookings
router.post("/", async (req, res) => {
  // Example: create a dummy booking
  const { userId, astrologerId, minutes } = req.body;
  if (!userId || !astrologerId || !minutes) return res.status(400).json({ error: "All fields required" });

  res.json({ message: "Booking created (dummy)", booking: { userId, astrologerId, minutes } });
});

// GET /api/bookings/:userId
router.get("/:userId", async (req, res) => {
  res.json({ message: "Return user bookings (dummy)", bookings: [] });
});

export default router;
