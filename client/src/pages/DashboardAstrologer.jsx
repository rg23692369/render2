import React, { useEffect, useState } from "react";
import api from "../lib/api";

export default function DashboardAstrologer() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/astrologers/me"); // backend route to get logged-in astrologer
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>{profile.displayName} Dashboard</h1>
      <p>Expertise: {profile.expertise.join(", ")}</p>
      <p>Per-minute rate: ₹{profile.perMinuteRate}</p>
      <p>Status: {profile.isOnline ? "Online" : "Offline"}</p>
    </div>
  );
}
