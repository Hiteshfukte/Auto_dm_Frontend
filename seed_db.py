import sqlite3

DB_PATH = "bot.db"

def seed_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Insert a test automation
    # keyword: "SEND IT"
    # message: "Thanks for commenting! Here is your link: https://example.com"
    cursor.execute("""
        INSERT INTO automations (name, keyword, message, link, active)
        VALUES (?, ?, ?, ?, ?)
    """, ("Test Automation", "send it", "Thanks for commenting! Here is your link!", "https://example.com", 1))
    
    conn.commit()
    conn.close()
    print("Database seeded with test automation!")

if __name__ == "__main__":
    seed_db()
