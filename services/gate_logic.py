"""
Gate Logic — Handles DM-based follow gate flow.
When a user DMs 'YES', we respond via Meta's messages endpoint (24h window).
"""
from services.db_queries import (
    get_latest_pending_gate_media, get_gate_status, 
    update_gate_status, mark_dm_as_sent
)
import sqlite3
from services.messenger import send_dm


async def handle_message_event(event: dict, supabase_user_id: str = "legacy_admin"):
    """Processes incoming Direct Messages (e.g., 'YES' for follow gate) for a specific owner."""
    sender_id = event.get("sender", {}).get("id")
    msg_data = event.get("message", {})
    
    # Skip deleted messages
    if msg_data.get("is_deleted"):
        return
    
    text = msg_data.get("text", "").lower().strip()
    
    keywords = ["yes", "info", "start"]
    if text in keywords:
        # Find the most recent Reel this user is trying to get a resource for (per owner)
        media_id = get_latest_pending_gate_media(supabase_user_id, sender_id)
        if not media_id:
            return
            
        await process_follow_check(sender_id, media_id, supabase_user_id)


async def process_follow_check(sender_id: str, media_id: str, supabase_user_id: str = "legacy_admin"):
    """Handles the follow gate logic for a specific SaaS owner."""
    attempts = get_gate_status(supabase_user_id, sender_id, media_id) or 0
    
    # Get the automation rule for this owner
    conn = sqlite3.connect("bot.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    if media_id == "generic":
        cursor.execute("SELECT * FROM automations WHERE supabase_user_id=? AND (media_id IS NULL OR media_id = '') AND active=1 ORDER BY id DESC LIMIT 1", (supabase_user_id,))
    else:
        cursor.execute("SELECT * FROM automations WHERE supabase_user_id=? AND media_id=? AND active=1", (supabase_user_id, media_id))
    rule = cursor.fetchone()
    conn.close()
    
    if not rule:
        return

    if attempts < 1:
        # First "YES" — Ask to confirm follow
        profile_url = "https://www.instagram.com/star__media_/" # TODO: Make dynamic from owner config
        oops_msg = f"😅 Oops! Please make sure you are following our page, then reply YES again to get the link!"
        send_dm(sender_id, oops_msg, supabase_user_id)
        update_gate_status(supabase_user_id, sender_id, media_id, 1)
    else:
        # Second "YES" — Send the goods!
        msg = rule["message"]
        if rule["link"]:
            msg += f"\n\n🔗 {rule['link']}"
            
        success = send_dm(sender_id, msg, supabase_user_id)
        if success:
            update_gate_status(supabase_user_id, sender_id, media_id, 2)  # 2 = Completed
            mark_dm_as_sent(supabase_user_id, sender_id, media_id, rule["id"])
