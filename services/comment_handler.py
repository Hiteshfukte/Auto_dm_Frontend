from services.db_queries import (
    get_automation_for_comment, check_if_already_sent, 
    mark_dm_as_sent, update_gate_status, sync_user
)
from services.messenger import send_private_reply, send_comment_reply
from config import get_config

async def handle_comment_event(value: dict, supabase_user_id: str = "legacy_admin"):
    """Logic for processing a single comment event for a specific SaaS owner."""
    if not value or "text" not in value or "from" not in value:
        return

    text = value.get("text", "")
    from_obj = value.get("from", {})
    user_id = from_obj.get("id")
    username = from_obj.get("username")
    media_id = value.get("media", {}).get("id")
    comment_id = value.get("id")
    ig_business_id = get_config("IG_BUSINESS_ID", supabase_user_id)

    # Sync user ID and username for future lookups
    sync_user(user_id, username)

    # Skip self-comments (our own bot replying)
    if user_id == ig_business_id:
        return

    # 1. Find matching automation rule for THIS user
    rule = get_automation_for_comment(text, supabase_user_id, media_id)
    if not rule:
        return

    # 2. Duplicate Check (Skip for our test Admin account)
    ADMIN_TEST_ID = "1382909329391520"
    if user_id != ADMIN_TEST_ID and check_if_already_sent(supabase_user_id, user_id, media_id, rule["id"]):
        return

    # 3. Trigger Automation
    
    # Strategy A: Private Reply (DM widget/banner via Meta API)
    # This sends the user a DM notification with the message
    dm_text = rule["message"]
    if rule.get("link"):
        dm_text += f"\n\n🔗 {rule['link']}"
    
    success = send_private_reply(comment_id, dm_text, supabase_user_id)
    
    if success:
        print(f"✅ Private reply sent to @{username} for comment {comment_id}")
        mark_dm_as_sent(supabase_user_id, user_id, media_id, rule["id"])
    else:
        # Fallback: Send a public comment reply encouraging DM
        print(f"⚠️ Private reply failed, sending public reply instead")
        public_msg = "Follow us and DM 'YES' to get the link instantly! 🚀"
        send_comment_reply(comment_id, public_msg, supabase_user_id)
        
        if rule["follow_gate"]:
            update_gate_status(supabase_user_id, user_id, media_id, 0)
