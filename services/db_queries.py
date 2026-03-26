import sqlite3
from database import DB_PATH

def get_automation_for_comment(keyword: str, supabase_user_id: str, media_id: str = None):
    """Matches a comment keyword and media_id to an active automation rule for a specific user."""
    keyword = keyword.lower().strip()
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # 1. Try to find a media-specific rule for this user
    if media_id:
        cursor.execute(
            "SELECT * FROM automations WHERE supabase_user_id = ? AND keyword = ? AND media_id = ? AND active = 1", 
            (supabase_user_id, keyword, media_id)
        )
        rule = cursor.fetchone()
        if rule:
            conn.close()
            return dict(rule)
            
    # 2. Fallback to generic keyword rule for this user
    cursor.execute(
        "SELECT * FROM automations WHERE supabase_user_id = ? AND keyword = ? AND active = 1 ORDER BY id DESC LIMIT 1", 
        (supabase_user_id, keyword)
    )
    rule = cursor.fetchone()
    conn.close()
    return dict(rule) if rule else None

def check_if_already_sent(supabase_user_id: str, user_id: str, media_id: str, automation_id: int):
    """Prevents double-replying to the same user on the same Reel for the same automation rule/owner."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT 1 FROM sent_dms WHERE supabase_user_id=? AND user_id=? AND media_id=? AND automation_id=?", 
        (supabase_user_id, user_id, media_id, automation_id)
    )
    exists = cursor.fetchone()
    conn.close()
    return exists is not None

def mark_dm_as_sent(supabase_user_id: str, user_id: str, media_id: str, automation_id: int):
    """Logs a sent DM in the database for a specific automation rule and owner."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT OR IGNORE INTO sent_dms (supabase_user_id, user_id, media_id, automation_id) VALUES (?, ?, ?, ?)", 
        (supabase_user_id, user_id, media_id, automation_id)
    )
    conn.commit()
    conn.close()

def get_gate_status(supabase_user_id: str, user_id: str, media_id: str):
    """Gets the number of attempts for a user on a specific media follow gate by owner."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT attempts FROM gate_status WHERE supabase_user_id=? AND user_id=? AND media_id=?", 
        (supabase_user_id, user_id, media_id)
    )
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else None

def update_gate_status(supabase_user_id: str, user_id: str, media_id: str, attempts: int):
    """Updates the follow gate attempt count for a specific owner."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "REPLACE INTO gate_status (supabase_user_id, user_id, media_id, attempts) VALUES (?, ?, ?, ?)", 
        (supabase_user_id, user_id, media_id, attempts)
    )
    conn.commit()
    conn.close()

def get_latest_pending_gate_media(supabase_user_id: str, user_id: str):
    """Finds the most recent Reel where the user is stuck in a follow gate (attempts < 2) for this owner."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        SELECT media_id 
        FROM gate_status 
        WHERE supabase_user_id=? AND user_id=? AND attempts < 2 
        ORDER BY rowid DESC LIMIT 1
    """, (supabase_user_id, user_id))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else None

def sync_user(user_id: str, username: str):
    """Saves or updates the username for an IGSID."""
    if not user_id or not username:
        return
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        REPLACE INTO users (user_id, username, updated_at) 
        VALUES (?, ?, CURRENT_TIMESTAMP)
    """, (user_id, username))
    conn.commit()
    conn.close()

def get_username(user_id: str):
    """Retrieves the last known username for an IGSID."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT username FROM users WHERE user_id=?", (user_id,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else None
