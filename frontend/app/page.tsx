import React from 'react';
import { TrendingUp, TrendingDown, Minus, Trophy, Activity } from 'lucide-react';

// Sample Data Structure - In a real app, this would come from your FastAPI/Supabase backend
const leaderboardData = [
  { id: 1, team: 'Spain', probability: 18.5, change: 'up', rank: 1, flag: '🇪🇸' },
  { id: 2, team: 'Argentina', probability: 15.2, change: 'down', rank: 2, flag: '🇦🇷' },
  { id: 3, team: 'France', probability: 14.8, change: 'none', rank: 3, flag: '🇫🇷' },
  { id: 4, team: 'England', probability: 12.1, change: 'up', rank: 4, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 5, team: 'Brazil', probability: 10.5, change: 'down', rank: 5, flag: '🇧🇷' },
];

export default function WorldCupDashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8 font-sans">
      {/* Header Section */}
      <header className="max-w-2xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20">
          <Trophy className="w-5 h-5 text-blue-400 mr-2" />
          <span className="text-xs font-bold tracking-widest uppercase text-blue-400">2026 Live Predictor</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Championship Probability
        </h1>
        <p className="text-slate-400 text-sm">Real-time AI analysis based on live match form & news.</p>
      </header>

      {/* Probability Leaderboard */}
      <section className="max-w-2xl mx-auto space-y-3">
        {leaderboardData.map((item) => (
          <div 
            key={item.id} 
            className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-4 transition-all hover:border-blue-500/50 hover:bg-slate-800/50"
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <span className="text-lg font-black italic text-slate-700 group-hover:text-blue-500/30 transition-colors">
                  #{item.rank}
                </span>
                <span className="text-2xl">{item.flag}</span>
                <div>
                  <h3 className="font-bold text-slate-100">{item.team}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Activity className="w-3 h-3 text-slate-500" />
                    <span className="text-[10px] text-slate-500 uppercase tracking-tighter font-semibold">Live Data Ingested</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-blue-400">
                  {item.probability}%
                </div>
                <div className="flex items-center justify-end gap-1">
                  {item.change === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                  {item.change === 'down' && <TrendingDown className="w-3 h-3 text-rose-400" />}
                  {item.change === 'none' && <Minus className="w-3 h-3 text-slate-500" />}
                  <span className={`text-[10px] font-bold uppercase ${
                    item.change === 'up' ? 'text-emerald-400' : 
                    item.change === 'down' ? 'text-rose-400' : 'text-slate-500'
                  }`}>
                    {item.change === 'none' ? 'Stable' : item.change}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Visual Probability Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-blue-500/20 w-full">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000"
                style={{ width: `${item.probability * 3}%` }} // Scaling for visual impact
              />
            </div>
          </div>
        ))}
      </section>

      {/* Footer / Status */}
      <footer className="max-w-2xl mx-auto mt-12 text-center border-t border-slate-900 pt-6">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">
          Last Updated: {new Date().toLocaleTimeString()} • Powered by Gemini Engine
        </p>
      </footer>
    </main>
  );
}
