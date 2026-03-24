import sqlite3
import os

DB_PATH = "bot.db"

def check_results():
    if not os.path.exists(DB_PATH):
        print(f"Database {DB_PATH} not found.")
        return
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    print("--- Sent DMs ---")
    cursor.execute("SELECT * FROM sent_dms ORDER BY timestamp DESC LIMIT 5")
    rows = cursor.fetchall()
    for row in rows:
        print(dict(row))
        
    print("\n--- Gate Status (if any) ---")
    cursor.execute("SELECT * FROM gate_status ORDER BY rowid DESC LIMIT 5")
    rows = cursor.fetchall()
    for row in rows:
        print(dict(row))
        
    conn.close()

if __name__ == "__main__":
    check_results()
