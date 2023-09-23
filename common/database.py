import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from supabase import create_client, Client

# Use os.environ.get() with a default value if the env var is not present
# SQLALCHEMY_DATABASE_URL = ""

load_dotenv()  # Loads environment variables from .env file

url = os.environ.get("VITE_SUPABASE_URL")
key = os.environ.get("VITE_SUPABASE_ANON_KEY")

# SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://postgres@localhost:5432/etf")

supabase = create_client(url, key)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=supabase)

Base = declarative_base()
