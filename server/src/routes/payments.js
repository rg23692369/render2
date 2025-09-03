import express from "express";

const router = express.Router();

// POST /api/payments
router.post("/", async (req, res) => {
  const { userId, amount } = req.body;
  if (!userId || !amount) return res.status(400).json({ error: "UserId & amount required" });

  res.json({ message: `Payment of ${amount} processed (dummy)`, userId });
});

// GET /api/payments/:userId
router.get("/:userId", async (req, res) => {
  res.json({ message: "User payments history (dummy)", payments: [] });
});

export default router;
