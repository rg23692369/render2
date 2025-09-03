// backend/src/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  astrologer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
