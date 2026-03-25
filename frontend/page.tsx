// frontend/app/page.tsx
"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Replace with your actual deployed backend URL later
    fetch('http://localhost:8000/probability-leaderboard')
      .then(res => res.json())
      .then(data => setTeams(data));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">WC 2026 Probability Leaderboard</h1>
      <div className="space-y-4">
        {teams.map((t) => (
          <div key={t.team} className="p-4 bg-gray-900 rounded-lg flex justify-between">
            <span>#{t.rank} {t.team}</span>
            <span className="font-mono text-blue-400">{t.win_prob}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
