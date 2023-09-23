import sys
from pathlib import Path
import json
import os
from dotenv import load_dotenv
from supabase import create_client, Client

from typing import Any
from pydantic import BaseModel

sys.path.append(str(Path(__file__).parent.parent.parent))

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from common.database import SessionLocal
from src.supabase_api import get_users

app = FastAPI()

origins = [
    "http//localhost:3000",
    "http//localhost:5173",
    "http://localhost:5173/"
    "http://13.212.192.8:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()  # Loads environment variables from .env file

url = os.environ.get("VITE_SUPABASE_URL")
key = os.environ.get("VITE_SUPABASE_ANON_KEY")

supabase: Client = create_client(url, key)

@app.get("/get-all-users")
async def root():
    return get_users(supabase)


