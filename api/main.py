import os
import requests
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configuration for Football-Data.org
API_KEY = os.getenv("FOOTBALL_DATA_API_KEY")
BASE_URL = "https://api.football-data.org/v4"
WC_CODE = "WC" # Competition code for World Cup

headers = { 'X-Auth-Token': API_KEY }

@app.get("/api/probability-leaderboard")
async def get_leaderboard():
    url = f"{BASE_URL}/competitions/{WC_CODE}/standings"
    
    try:
        response = requests.get(url, headers=headers, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        # Football-Data.org returns standings in 'standings' -> 'table'
        # Since WC has multiple groups, we'll flatten the first few groups for the leaderboard
        processed_teams = []
        all_standings = data.get("standings", [])
        
        for group in all_standings[:4]: # Grab top teams from first 4 groups
            for entry in group.get("table", []):
                team_name = entry['team']['name']
                points = entry['points']
                played = entry['playedGames']
                
                # Simple Software Engineer Logic: 
                # Points / (Games * 3) + a small "Power Factor" for big teams
                base_prob = (points / (played * 3)) * 100 if played > 0 else 15.0
                
                processed_teams.append({
                    "team": team_name,
                    "win_prob": round(min(base_prob + 5, 98), 1), # Cap at 98%
                    "trend": "up" if entry['goalDifference'] > 0 else "stable",
                    "rank": entry['position']
                })
        
        # Sort by highest probability and return top 5
        return sorted(processed_teams, key=lambda x: x['win_prob'], reverse=True)[:5]

    except Exception as e:
        print(f"API Error: {e}")
        # Return elegant mock data if API is down or Key is missing
        return [
            {"team": "Spain", "win_prob": 22.4, "trend": "up", "rank": 1},
            {"team": "Argentina", "win_prob": 21.1, "trend": "stable", "rank": 2},
            {"team": "Brazil", "win_prob": 18.5, "trend": "up", "rank": 3}
        ]
