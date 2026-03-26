import os
import sqlite3
from database import DB_PATH

def get_config(key: str, supabase_user_id: str = "legacy_admin"):
    """
    Retrieves a config value for a specific Supabase user.
    Falls back to environment variables for global settings.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT value FROM config WHERE supabase_user_id = ? AND key = ?", 
            (supabase_user_id, key)
        )
        row = cursor.fetchone()
        conn.close()
        if row: return row[0]
    except Exception as e:
        print(f"Config Get Error ({key} for {supabase_user_id}):", e)
    
    # Fallback to env vars for global keys (API secrets, etc)
    return os.getenv(key)

def set_config(key: str, value: str, supabase_user_id: str = "legacy_admin"):
    """Saves or updates a config value for a specific Supabase user."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT OR REPLACE INTO config (supabase_user_id, key, value) VALUES (?, ?, ?)", 
            (supabase_user_id, key, value)
        )
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Config Set Error ({key} for {supabase_user_id}):", e)

def delete_config(key: str, supabase_user_id: str = "legacy_admin"):
    """Deletes a config mapping for a specific Supabase user."""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM config WHERE supabase_user_id = ? AND key = ?", 
            (supabase_user_id, key)
        )
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Config Delete Error ({key} for {supabase_user_id}):", e)

def get_supabase_user_by_business_id(business_id: str):
    """
    Reverse lookup: Finds which Supabase user owns a specific Instagram Business ID.
    Used by the webhook listener to identify the correct tenant.
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT supabase_user_id FROM config WHERE key = 'IG_BUSINESS_ID' AND value = ?", 
            (business_id,)
        )
        row = cursor.fetchone()
        conn.close()
        if row: return row[0]
    except Exception as e:
        print(f"Reverse Config Lookup Error (BID: {business_id}):", e)
    return None
