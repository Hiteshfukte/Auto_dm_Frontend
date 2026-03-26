import sqlite3
import os

DB_PATH = "bot.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initializes the SQLite database with required tables."""
    conn = get_db()
    cursor = conn.cursor()
    
    # Automations table (linked to SaaS user)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS automations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            supabase_user_id TEXT NOT NULL,
            name TEXT,
            keyword TEXT,
            message TEXT,
            link TEXT,
            follow_gate BOOLEAN DEFAULT 0,
            active BOOLEAN DEFAULT 1,
            media_id TEXT,
            thumbnail_url TEXT,
            caption TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Gate status for follow gate tracking
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS gate_status (
            supabase_user_id TEXT,
            user_id TEXT,
            media_id TEXT,
            attempts INTEGER DEFAULT 0,
            PRIMARY KEY (supabase_user_id, user_id, media_id)
        )
    """)
    
    # Tracking sent DMs to prevent duplicates
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sent_dms (
            supabase_user_id TEXT,
            user_id TEXT,
            media_id TEXT,
            automation_id INTEGER,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (supabase_user_id, user_id, media_id, automation_id)
        )
    """)

    # Users table to map IGSIDs to usernames (for ManyChat lookup)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id TEXT PRIMARY KEY,
            username TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Persistent configuration (Tokens, IDs) - Isolate by Supabase User
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS config (
            supabase_user_id TEXT,
            key TEXT,
            value TEXT,
            PRIMARY KEY (supabase_user_id, key)
        )
    """)

    conn.commit()
    conn.close()
    print(f"Database initialized at {DB_PATH}")

if __name__ == "__main__":
    init_db()
