from fastapi import APIRouter, Depends
from config import get_config, set_config, delete_config
from models import ConnectRequest
from services.auth_wrapper import get_supabase_user
import requests

router = APIRouter(prefix="/api/config", tags=["Configuration"])

@router.get("/status")
def get_config_status(user_id: str = Depends(get_supabase_user)):
    """Checks if Instagram is connected for the current user."""
    token = get_config("IG_ACCESS_TOKEN", user_id)
    bid = get_config("IG_BUSINESS_ID", user_id)
    connected = bool(token and bid)
    
    # Static profile URL for now
    PROFILE_URL = "https://www.instagram.com/star__media_/"
    
    return {
        "instagram_connected": connected,
        "profile_url": PROFILE_URL,
        "business_id": bid if connected else None
    }

@router.get("/permissions")
def check_token_permissions(user_id: str = Depends(get_supabase_user)):
    """Debug: Check what permissions the current user's token has."""
    token = get_config("IG_ACCESS_TOKEN", user_id)
    bid = get_config("IG_BUSINESS_ID", user_id)
    
    if not token:
        return {"error": "No access token found. Please login first."}
    
    # Check token permissions via Graph API
    url = f"https://graph.facebook.com/v19.0/me/permissions"
    resp = requests.get(url, params={"access_token": token})
    permissions = resp.json()
    
    # Also check if messaging is enabled on the IG account
    ig_url = f"https://graph.facebook.com/v19.0/{bid}"
    ig_resp = requests.get(ig_url, params={
        "fields": "username,name,messaging_type",
        "access_token": token
    })
    
    return {
        "permissions": permissions,
        "ig_account": ig_resp.json(),
        "tip": "Look for 'instagram_manage_messages' in permissions list"
    }

@router.post("/connect")
def connect_instagram(data: ConnectRequest, user_id: str = Depends(get_supabase_user)):
    """Manually connects Instagram by saving token and ID for the user."""
    set_config("IG_ACCESS_TOKEN", data.access_token, user_id)
    set_config("IG_BUSINESS_ID", data.business_id, user_id)
    return {"status": "connected"}

@router.post("/disconnect")
def disconnect_instagram(user_id: str = Depends(get_supabase_user)):
    """Disconnects Instagram for the current user."""
    delete_config("IG_BUSINESS_ID", user_id)
    delete_config("IG_ACCESS_TOKEN", user_id)
    return {"status": "disconnected"}
