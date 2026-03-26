"""
Messenger Service — Meta Official API (graph.instagram.com)
Handles:
  1. Private Reply (Comment → DM widget with buttons)
  2. Direct DM (Respond to user who messaged us)
  3. Public Comment Reply
"""
import requests
from config import get_config

INSTAGRAM_BASE_URL = "https://graph.instagram.com/v21.0"

def send_private_reply(comment_id: str, text: str, supabase_user_id: str = "legacy_admin") -> bool:
    """
    Sends a PRIVATE REPLY to a comment (DM widget).
    """
    token = get_config("IG_ACCESS_TOKEN", supabase_user_id)
    ig_id = get_config("IG_BUSINESS_ID", supabase_user_id)
    
    if not token or not ig_id:
        print("META DM ERROR: Missing IG_ACCESS_TOKEN or IG_BUSINESS_ID")
        return False
    
    url = f"{INSTAGRAM_BASE_URL}/{ig_id}/messages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    payload = {
        "recipient": {
            "comment_id": comment_id
        },
        "message": {
            "text": text
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        res_data = response.json()
        print(f"META PRIVATE REPLY: {response.status_code} | {res_data}")
        
        if response.status_code == 200:
            return True
        else:
            # Log the specific error for debugging
            error_msg = res_data.get("error", {}).get("message", "Unknown")
            error_code = res_data.get("error", {}).get("code", "?")
            print(f"META PRIVATE REPLY FAILED: Code {error_code} | {error_msg}")
            return False
            
    except Exception as e:
        print(f"META PRIVATE REPLY ERROR: {e}")
        return False


def send_dm(recipient_id: str, text: str, supabase_user_id: str = "legacy_admin") -> bool:
    """
    Sends a direct message to a user who has ALREADY messaged us (24h window).
    """
    token = get_config("IG_ACCESS_TOKEN", supabase_user_id)
    ig_id = get_config("IG_BUSINESS_ID", supabase_user_id)
    
    if not token or not ig_id:
        print("META DM ERROR: Missing IG_ACCESS_TOKEN or IG_BUSINESS_ID")
        return False
    
    url = f"{INSTAGRAM_BASE_URL}/{ig_id}/messages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    payload = {
        "recipient": {
            "id": recipient_id
        },
        "message": {
            "text": text
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        res_data = response.json()
        print(f"META DM: {response.status_code} | {res_data}")
        return response.status_code == 200
    except Exception as e:
        print(f"META DM ERROR: {e}")
        return False


def send_message(recipient: dict, text: str = None, attachment: dict = None, supabase_user_id: str = "legacy_admin"):
    """
    Unified entry point for sending messages.
    """
    user_id = recipient.get("id")
    comment_id = recipient.get("comment_id")
    
    if comment_id:
        return send_private_reply(comment_id, text, supabase_user_id)
    elif user_id:
        return send_dm(user_id, text, supabase_user_id)
    
    return False


def send_comment_reply(comment_id: str, text: str, supabase_user_id: str = "legacy_admin"):
    """Sends a PUBLIC reply to a comment via Facebook Graph API."""
    token = get_config("IG_ACCESS_TOKEN", supabase_user_id)
    if not token:
        return False
        
    url = f"https://graph.facebook.com/v21.0/{comment_id}/replies"
    params = {"message": text, "access_token": token}
    
    try:
        response = requests.post(url, params=params)
        print(f"COMMENT REPLY STATUS: {response.status_code} | RESPONSE: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"COMMENT REPLY ERROR: {e}")
        return False
