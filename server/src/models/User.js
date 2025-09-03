import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ["user", "astrologer", "admin"], default: "user" },
  wallet: { type: Number, default: 0 }
});

export default mongoose.model("User", userSchema);
