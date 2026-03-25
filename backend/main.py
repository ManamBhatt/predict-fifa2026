# backend/main.py
from fastapi import FastAPI
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configuration
API_KEY = os.getenv("FOOTBALL_API_KEY")
BASE_URL = "https://v3.football.api-sports.io" # Using API-Football as an example
WORLD_CUP_ID = 1  # FIFA World Cup ID

headers = {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'v3.football.api-sports.io'
}

@app.get("/probability-leaderboard")
async def get_leaderboard():
    # In a real app, you'd fetch live standings here
    # For now, we return a mock-up of the "Brain's" logic
    return [
        {"team": "Spain", "win_prob": 18.5, "trend": "up", "rank": 1},
        {"team": "Argentina", "win_prob": 15.2, "trend": "down", "rank": 2},
        {"team": "France", "win_prob": 14.8, "trend": "stable", "rank": 3},
    ]

@app.get("/live-match/{match_id}")
async def get_live_stats(match_id: int):
    # This fetches real-time match data
    url = f"{BASE_URL}/fixtures?id={match_id}"
    response = requests.get(url, headers=headers)
    return response.json()
