from fastapi import APIRouter, Depends
from config import get_config, set_config, delete_config
from models import ConnectRequest
from middleware.auth import verify_token
import requests

router = APIRouter(prefix="/api/config", tags=["Configuration"])

@router.get("/status", dependencies=[Depends(verify_token)])
def get_config_status():
    """Checks if Instagram is connected."""
    token = get_config("IG_ACCESS_TOKEN")
    bid = get_config("IG_BUSINESS_ID")
    connected = bool(token and bid)
    
    # Static profile URL for now
    PROFILE_URL = "https://www.instagram.com/star__media_/"
    
    return {
        "instagram_connected": connected,
        "profile_url": PROFILE_URL,
        "business_id": bid if connected else None
    }

@router.get("/permissions", dependencies=[Depends(verify_token)])
def check_token_permissions():
    """Debug: Check what permissions the current token has."""
    token = get_config("IG_ACCESS_TOKEN")
    bid = get_config("IG_BUSINESS_ID")
    
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

@router.post("/connect", dependencies=[Depends(verify_token)])
def connect_instagram(data: ConnectRequest):
    """Manually connects Instagram by saving token and ID."""
    set_config("IG_ACCESS_TOKEN", data.access_token)
    set_config("IG_BUSINESS_ID", data.business_id)
    return {"status": "connected"}

@router.post("/disconnect", dependencies=[Depends(verify_token)])
def disconnect_instagram():
    """Disconnects Instagram by clearing tokens from the database."""
    delete_config("IG_BUSINESS_ID")
    return {"status": "disconnected"}
