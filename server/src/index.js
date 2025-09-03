import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/auth.js";
import astrologerRoutes from "./routes/astrologers.js";
import bookingRoutes from "./routes/bookings.js";
import paymentRoutes from "./routes/payments.js";
import aiRoutes from "./routes/ai.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

// ✅ Middleware
app.use(express.json());

// ✅ CORS setup (for local + deployed frontend)
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy error: ${origin} not allowed.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// ✅ Health check route (Render uses this for uptime checks too)
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "Astrotalk API" });
});

// ✅ Register API routes
app.use("/api/auth", authRoutes);
app.use("/api/astrologers", astrologerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/ai", aiRoutes);

// ✅ Config checks
if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI/MONGODB_URI in environment variables");
  process.exit(1);
}

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn("⚠️ Razorpay keys missing → Payments will run in dummy mode.");
}

// ✅ Connect to MongoDB & start server
mongoose
  .connect(MONGO_URI, {
    autoIndex: process.env.NODE_ENV !== "production",
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, "0.0.0.0", () => {
      // 👆 important for Render: ensures external network binding
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err?.message || err);
    process.exit(1);
  });

// ✅ Global error handler (last middleware)
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ error: "Something went wrong!" });
});
