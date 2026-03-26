from fastapi import APIRouter, Response, HTTPException
from fastapi.responses import PlainTextResponse, RedirectResponse
import requests
import os
from config import get_config, set_config

router = APIRouter(prefix="/api/auth", tags=["OAuth"])

# --- Instagram Business Login (New API — required for Messaging) ---
@router.get("/instagram/login")
def instagram_business_login():
    """Instagram Business Login OAuth URL (for Messaging API)."""
    app_id = get_config("FACEBOOK_APP_ID")
    if not app_id:
        return {"error": "FACEBOOK_APP_ID not configured"}
    
    base_url = os.getenv("BACKEND_URL", "http://127.0.0.1:8000")
    redirect_uri = f"{base_url}/api/auth/instagram/callback"
    
    scope = (
        "instagram_business_basic,"
        "instagram_business_manage_messages,"
        "instagram_business_manage_comments,"
        "instagram_business_content_publish"
    )
    
    auth_url = (
        f"https://www.instagram.com/oauth/authorize?"
        f"client_id={app_id}&"
        f"redirect_uri={redirect_uri}&"
        f"response_type=code&"
        f"scope={scope}"
    )
    return RedirectResponse(url=auth_url)

# --- Facebook Login (for Page Access Token — required for Instagram Messaging API) ---
@router.get("/facebook/login")
def facebook_login():
    """Facebook OAuth — gets Page Access Token needed for Instagram Messaging."""
    app_id = get_config("FACEBOOK_APP_ID")
    if not app_id:
        return {"error": "FACEBOOK_APP_ID not configured"}
    
    base_url = os.getenv("BACKEND_URL", "http://127.0.0.1:8000")
    redirect_uri = f"{base_url}/api/auth/facebook/callback"
    scope = (
        "instagram_basic,"
        "instagram_manage_comments,"
        "instagram_manage_messages,"
        "pages_read_engagement,"
        "pages_show_list,"
        "business_management,"
        "pages_messaging"
    )
    auth_url = (
        f"https://www.facebook.com/v18.0/dialog/oauth?"
        f"client_id={app_id}&"
        f"redirect_uri={redirect_uri}&"
        f"scope={scope}&"
        f"response_type=code"
    )
    return RedirectResponse(url=auth_url)

@router.get("/instagram/callback")
def instagram_callback(code: str):
    """Handles Instagram Business Login callback."""
    app_id = get_config("FACEBOOK_APP_ID")
    app_secret = get_config("FACEBOOK_APP_SECRET")
    base_url = os.getenv("BACKEND_URL", "http://127.0.0.1:8000")
    redirect_uri = f"{base_url}/api/auth/instagram/callback"

    if not app_id or not app_secret:
        return PlainTextResponse("Error: App ID or Secret not configured", status_code=500)
    
    try:
        # Exchange code for short-lived token
        token_url = "https://api.instagram.com/oauth/access_token"
        resp = requests.post(token_url, data={
            "client_id": app_id,
            "client_secret": app_secret,
            "grant_type": "authorization_code",
            "redirect_uri": redirect_uri,
            "code": code
        })
        data = resp.json()
        short_token = data.get("access_token")
        user_id = data.get("user_id")
        
        if not short_token:
            return PlainTextResponse(f"Error getting token: {data}", status_code=400)
        
        # Exchange for long-lived token
        long_token_url = "https://graph.instagram.com/access_token"
        resp = requests.get(long_token_url, params={
            "grant_type": "ig_exchange_token",
            "client_secret": app_secret,
            "access_token": short_token
        })
        data = resp.json()
        long_token = data.get("access_token", short_token)
        
        # Save token and IG user ID (for graph.instagram.com/me/messages)
        set_config("IG_ACCESS_TOKEN", long_token)
        set_config("IG_BUSINESS_ID", str(user_id))
        
        html_content = f"""
        <html>
            <body style="background: #282828; color: white; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh;">
                <div style="text-align: center;">
                    <h1 style="color: #4ade80;">Instagram Connected!</h1>
                    <p>Instagram Business ID: {user_id}</p>
                    <p>Messaging API is now enabled!</p>
                    <script>
                        setTimeout(() => {{
                            const frontendUrl = '{os.getenv("FRONTEND_URL", "http://localhost:3000")}';
                            window.location.href = frontendUrl + '/dashboard/instagram?success=1';
                        }}, 2000);
                    </script>
                </div>
            </body>
        </html>
        """
        return Response(content=html_content, media_type="text/html")
    
    except Exception as e:
        return PlainTextResponse(f"OAuth Error: {str(e)}", status_code=500)

@router.get("/facebook/callback")
def facebook_callback(code: str):
    """Handles the OAuth callback, exchanges code for token, and finds the Instagram Business ID."""
    app_id = get_config("FACEBOOK_APP_ID")
    app_secret = get_config("FACEBOOK_APP_SECRET")
    base_url = os.getenv("BACKEND_URL", "http://127.0.0.1:8000")
    redirect_uri = f"{base_url}/api/auth/facebook/callback"

    if not app_id or not app_secret:
        return PlainTextResponse("Error: App ID or Secret not configured in .env", status_code=500)

    try:
        # 1. Exchange Code for Short-Lived Token
        token_url = (
            f"https://graph.facebook.com/v18.0/oauth/access_token?"
            f"client_id={app_id}&"
            f"redirect_uri={redirect_uri}&"
            f"client_secret={app_secret}&"
            f"code={code}"
        )
        resp = requests.get(token_url)
        data = resp.json()
        short_token = data.get("access_token")
        if not short_token:
            return PlainTextResponse(f"Error getting token: {data}", status_code=400)
            
        # 2. Exchange for Long-Lived Token (60 days)
        long_token_url = (
            f"https://graph.facebook.com/v18.0/oauth/access_token?"
            f"grant_type=fb_exchange_token&"
            f"client_id={app_id}&"
            f"client_secret={app_secret}&"
            f"fb_exchange_token={short_token}"
        )
        resp = requests.get(long_token_url)
        data = resp.json()
        long_token = data.get("access_token", short_token)

        # 3. Find connected Instagram Business Account + Page Token
        pages_url = f"https://graph.facebook.com/v18.0/me/accounts?access_token={long_token}&fields=instagram_business_account,name,id,access_token"
        resp = requests.get(pages_url)
        pages_data = resp.json()
        
        business_id = None
        page_access_token = None
        if "data" in pages_data:
            for page in pages_data["data"]:
                if "instagram_business_account" in page:
                    business_id = page["instagram_business_account"]["id"]
                    page_access_token = page.get("access_token")  # Page-level token
                    break

        if not business_id:
            return PlainTextResponse("Error: No Instagram Business Account found linked to your Facebook Pages.", status_code=404)

        # Save to Persistent Config (Database)
        # Use Page Access Token for messaging API (required by Meta)
        # Fall back to user token if page token not available
        token_to_save = page_access_token or long_token
        set_config("IG_ACCESS_TOKEN", token_to_save)
        set_config("IG_BUSINESS_ID", business_id)
        set_config("IG_USER_TOKEN", long_token)  # Keep user token for other APIs

        # Success! Redirect back to the local frontend dashboard
        # Using a timer to show success then redirect
        html_content = f"""
        <html>
            <body style="background: #282828; color: white; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh;">
                <div style="text-align: center;">
                    <h1 style="color: #4ade80;">Success!</h1>
                    <p>Connected to Instagram Business Account: {business_id}</p>
                    <p>Redirecting you back to Dashboard...</p>
                    <script>
                        setTimeout(() => {{
                            const frontendUrl = '{os.getenv("FRONTEND_URL", "http://localhost:3000")}';
                            window.location.href = frontendUrl + '/dashboard/instagram?success=1';
                        }}, 2000);
                    </script>
                </div>
            </body>
        </html>
        """
        return Response(content=html_content, media_type="text/html")

    except Exception as e:
        return PlainTextResponse(f"OAuth Error: {str(e)}", status_code=500)
