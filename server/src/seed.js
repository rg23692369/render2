import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import AstrologerProfile from "./models/AstrologerProfile.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await User.deleteMany({});
    await AstrologerProfile.deleteMany({});

    // Users
    const admin = await User.create({
      username: "admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("admin123", 10),
      role: "admin",
      wallet: 0
    });

    const user = await User.create({
      username: "user1",
      email: "user1@example.com",
      password: bcrypt.hashSync("user123", 10),
      role: "user",
      wallet: 100000
    });

    // Astrologers
    const astro1 = await User.create({
      username: "astro0",
      email: "astro0@example.com",
      password: bcrypt.hashSync("astro123", 10),
      role: "astrologer"
    });

    const astro2 = await User.create({
      username: "astro1",
      email: "astro1@example.com",
      password: bcrypt.hashSync("astro123", 10),
      role: "astrologer"
    });

    await AstrologerProfile.create([
      {
        user: astro1._id,
        displayName: "Astro Free",
        bio: "Free astrologer for testing.",
        languages: ["English"],
        expertise: ["Horoscope"],
        perMinuteRate: 0,
        isOnline: true
      },
      {
        user: astro2._id,
        displayName: "Astro Paid",
        bio: "Paid astrologer for testing.",
        languages: ["English"],
        expertise: ["Tarot"],
        perMinuteRate: 1,
        isOnline: true
      }
    ]);

    console.log("🌟 Seed data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
