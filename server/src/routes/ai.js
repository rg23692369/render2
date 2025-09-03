import express from "express";

const router = express.Router();

// POST /api/ai/chat { message }
router.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.json({ reply: `You said: "${message}" (AI offline)` });
  }

  // Optional: call OpenAI API if key exists
  res.json({ reply: `AI response placeholder for: "${message}"` });
});

export default router;
