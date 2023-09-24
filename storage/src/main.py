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

from src.supabase_api import get_users, get_stories_by_user, get_public_stories, get_story_by_id, save_users_story, set_story_public_status

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
async def get_all_users():
    # no particular return format settled
    return get_users(supabase)

@app.get("/{user_id}/get-all-stories")
async def get_users_stories(user_id: int):
    # no particular return format settled
    return get_stories_by_user(supabase, user_id)

@app.get("/get-public-stories")
async def get_all_public_stories():
    # no particular return format settled
    return get_public_stories(supabase)

@app.put("/{story_id}/set-to-public")
async def set_story_to_public(story_id: int):
    # Return format: {success: bool}
    response = set_story_public_status(supabase, story_id, True)
    success = response['ispublic'] == True
    return {
        "success": success
    }

@app.put("/{story_id}/set-to-private")
async def set_story_to_private(story_id: int):
    # Return format: {success: bool}
    response = set_story_public_status(supabase, story_id, False)
    success = response['ispublic'] == False
    return {
        "success": success
    }

@app.get("/{story_id}/get-story")
async def get_story(story_id: int):
    # same return format as with the genapi
    return get_story_by_id(supabase, story_id)

@app.post("/save-story") # TODO: check if story data type needs to be converted
async def save_story(user_id: int, story: dict):
    # user_id = 1
    # story = {
    #     "title": "The Adventures of Teddy",
    #     "focus": "vocabulary",
    #     "vocabulary_age": "3",
    #     "total_pages": "1",
    #     "story": [
    #         {"page": 1,
    #          "text": "Once upon a time, there was a teddy bear named Teddy. Teddy loved to go on adventures and explore the world around him.",
    #          "image_prompt": "Teddy bear playing in a colorful garden",
    #          "subject_description": "A fluffy brown teddy bear with a big smile on his face",
    #          "image_url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-PuMGCWJ1M3tJ6ExWwgZAlVT4/user-TETd6CWnI82tNSrj9rzXTm2Z/img-bAHOYMVZYaHoxhki7ijZ3wIC.png?st=2023-09-21T16%3A02%3A42Z&se=2023-09-21T18%3A02%3A42Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-20T21%3A55%3A13Z&ske=2023-09-21T21%3A55%3A13Z&sks=b&skv=2021-08-06&sig=1636ZkX6Wk18Neqpt%2BkucftDkjSc9RESrdE19MaZcvE%3D"},
    #         {"page": 2,
    #          "text": "Then, there was a teddy bear named Teddy. Teddy loved to go on adventures and explore the world around him.",
    #          "image_prompt": "Teddy bear playing in a colorful garden",
    #          "subject_description": "A fluffy brown teddy bear with a big smile on his face",
    #          "image_url": "https://placekitten.com/200/300"}
    #     ]
    # }
    
    # returns an int, which is the story id
    return save_users_story(supabase, user_id, story)

