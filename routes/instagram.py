from fastapi import APIRouter, Depends
import requests
from config import get_config
from middleware.auth import verify_token

router = APIRouter(prefix="/api/instagram", tags=["Instagram"])

@router.get("/reels", dependencies=[Depends(verify_token)])
def get_instagram_reels():
    """Fetches the latest media (Reels) from the connected Instagram account."""
    token = get_config("IG_ACCESS_TOKEN")
    bid = get_config("IG_BUSINESS_ID")
    
    if not token or not bid:
        return {"error": "Instagram not connected."}

    url = f"https://graph.facebook.com/v18.0/{bid}/media"
    params = {
        "fields": "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
        "access_token": token,
        "limit": 20
    }
    
    try:
        response = requests.get(url, params=params)
        data = response.json()
        # Filter for VIDEO media type usually implies Reels in this context
        return data.get("data", [])
    except Exception as e:
        print("IG Media Fetch Error:", e)
        return []
