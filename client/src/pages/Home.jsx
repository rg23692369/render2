import React, { useEffect, useState } from "react";
import api from "../lib/api"; // make sure this file exists

export default function Home() {
  const [astrologers, setAstrologers] = useState([]);

  useEffect(() => {
    async function fetchAstrologers() {
      try {
        const res = await api.get("/astrologers");
        setAstrologers(res.data);
      } catch (err) {
        console.error("Failed to fetch astrologers", err);
      }
    }
    fetchAstrologers();
  }, []);

  return (
    <div>
      <h1>Home Page - List of Astrologers</h1>
      <ul>
        {astrologers.map((a) => (
          <li key={a._id}>
            {a.displayName} - {a.expertise.join(", ")} - ₹{a.perMinuteRate}/min
          </li>
        ))}
      </ul>
    </div>
  );
}
