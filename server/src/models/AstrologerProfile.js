import mongoose from "mongoose";

const astrologerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  displayName: String,
  bio: String,
  languages: [String],
  expertise: [String],
  perMinuteRate: Number,
  isOnline: Boolean
});

export default mongoose.model("AstrologerProfile", astrologerProfileSchema);
