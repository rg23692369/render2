import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import AstrologerProfile from "./models/AstrologerProfile.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    // Clear existing data
    await User.deleteMany({});
    await AstrologerProfile.deleteMany({});

    // Users
    const admin = await User.create({
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      wallet: 0
    });

    const user = await User.create({
      username: "user1",
      email: "user1@example.com",
      password: "user123",
      role: "user",
      wallet: 100000
    });

    const astro1 = await User.create({
      username: "astro_free",
      email: "astrofree@example.com",
      password: "password123",
      role: "astrologer"
    });

    const astro2 = await User.create({
      username: "astro_paid",
      email: "astropaid@example.com",
      password: "password123",
      role: "astrologer"
    });

    // Astrologer Profiles
    await AstrologerProfile.create([
      {
        user: astro1._id,
        displayName: "Astro Free",
        bio: "Free astrologer for testing",
        languages: ["English"],
        expertise: ["Horoscope"],
        perMinuteRate: 0,
        isOnline: true,
      },
      {
        user: astro2._id,
        displayName: "Astro Paid",
        bio: "Paid astrologer, 1 rupee/min",
        languages: ["English"],
        expertise: ["Tarot"],
        perMinuteRate: 1,
        isOnline: true,
      },
    ]);

    console.log("🌟 Seed data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
