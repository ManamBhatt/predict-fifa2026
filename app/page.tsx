"use client";

import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Trophy, Activity, RefreshCcw } from 'lucide-react';

interface TeamData {
  team: string;
  win_prob: number;
  trend: string;
  rank: number;
  flag?: string;
}

export default function WorldCupDashboard() {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/probability-leaderboard');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setTeams(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8 font-sans">
      <header className="max-w-2xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20">
          <Trophy className="w-5 h-5 text-blue-400 mr-2" />
          <span className="text-xs font-bold tracking-widest uppercase text-blue-400">2026 Live Predictor</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Championship Probability
        </h1>
        <div className="flex items-center justify-center gap-4">
          <p className="text-slate-400 text-sm">Real-time AI analysis based on live match form.</p>
          <button 
            onClick={fetchData} 
            className="p-1 hover:bg-slate-800 rounded-md transition-colors"
            title="Refresh Data"
          >
            <RefreshCcw className={`w-4 h-4 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      <section className="max-w-2xl mx-auto space-y-3">
        {loading && teams.length === 0 ? (
          <div className="text-center py-20 text-slate-600 animate-pulse uppercase tracking-widest text-sm">
            Calculating Probabilities...
          </div>
        ) : (
          teams.map((item, index) => (
            <div 
              key={item.team} 
              className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-4 transition-all hover:border-blue-500/50"
            >
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-black italic text-slate-700 group-hover:text-blue-500/30 transition-colors">
                    #{item.rank || index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-100">{item.team}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Activity className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] text-slate-500 uppercase tracking-tighter font-semibold">Live Analysis</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-blue-400">
                    {item.win_prob}%
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    {item.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                    {item.trend === 'down' && <TrendingDown className="w-3 h-3 text-rose-400" />}
                    {item.trend === 'stable' && <Minus className="w-3 h-3 text-slate-500" />}
                    <span className={`text-[10px] font-bold uppercase ${
                      item.trend === 'up' ? 'text-emerald-400' : 
                      item.trend === 'down' ? 'text-rose-400' : 'text-slate-500'
                    }`}>
                      {item.trend}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 h-1 bg-blue-500/10 w-full">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-700"
                  style={{ width: `${item.win_prob}%` }}
                />
              </div>
            </div>
          ))
        )}
      </section>

      <footer className="max-w-2xl mx-auto mt-12 text-center border-t border-slate-900 pt-6">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">
          Last Sync: {lastUpdated || 'Never'} • Powered by Gemini Engine
        </p>
      </footer>
    </main>
  );
}
