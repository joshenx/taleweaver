import sys
from pathlib import Path
import json

from typing import Any
from pydantic import BaseModel

sys.path.append(str(Path(__file__).parent.parent.parent))

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from common.database import SessionLocal
from src.anthropic_api import get_anthropic_response
from src.openai_api import generate_response, generate_response_debugger

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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}

class QuestionRequest(BaseModel):
    prompt: str
    context: Any

@app.post("/test")
async def test(request_data: QuestionRequest):
    return generate_response_debugger(request_data.prompt)

@app.post("/actual")
async def get_story(request_data: QuestionRequest):
    prompt = request_data.prompt
    response = generate_response(prompt)
    return response



# @app.post("/ask-question")
# async def ask_anthropic_question(request_data: QuestionRequest):
#     try:
#         response = get_anthropic_response(
#             json.dumps(request_data.context), request_data.question
#         )
#         return {"response": response}
#     except Exception as e:
#         error_message = (
#             "Unexpected Error Occurred! Please contact an administrator :("
#             if "message" not in e
#             else e["message"]
#         )
#         code = 500 if "code" not in e else e["code"]
#         raise HTTPException(status_code=code, detail=error_message)
