"""
Entry point — run with: python -m uvicorn main:app --reload --port 8000
"""
from dotenv import load_dotenv
load_dotenv()

from app import app  # noqa: F401 — uvicorn needs this import
