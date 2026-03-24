import sqlite3
import os

DB_PATH = "bot.db"

def check_db():
    if not os.path.exists(DB_PATH):
        print(f"Database {DB_PATH} not found.")
        return
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    print("--- Config ---")
    cursor.execute("SELECT * FROM config")
    rows = cursor.fetchall()
    for row in rows:
        print(dict(row))
        
    print("\n--- Automations ---")
    cursor.execute("SELECT * FROM automations")
    rows = cursor.fetchall()
    for row in rows:
        print(dict(row))
        
    conn.close()

if __name__ == "__main__":
    check_db()
