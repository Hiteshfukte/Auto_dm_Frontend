import os
import sqlite3
from database import DB_PATH

def get_config(key: str):
    """Retrieves a config value from DB or Environment."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT value FROM config WHERE key = ?", (key,))
        row = cursor.fetchone()
        conn.close()
        if row: return row[0]
    except Exception as e:
        print(f"Config Get Error ({key}):", e)
    
    # Fallback to env vars for specific keys
    return os.getenv(key)

def set_config(key: str, value: str):
    """Saves or updates a config value in the database."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("REPLACE INTO config (key, value) VALUES (?, ?)", (key, value))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Config Set Error ({key}):", e)

def delete_config(key: str):
    """Deletes a config mapping from the database."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM config WHERE key = ?", (key,))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Config Delete Error ({key}):", e)
