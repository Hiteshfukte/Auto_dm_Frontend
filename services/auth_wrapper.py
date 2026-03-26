from fastapi import Request, HTTPException, Depends
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

# Supabase URL and Anon Key are required for verification
SUPABASE_URL = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_ANON_KEY:
    print("WARNING: Supabase credentials missing in backend .env!")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY) if SUPABASE_URL and SUPABASE_ANON_KEY else None

async def get_supabase_user(request: Request):
    """
    FastAPI dependency to verify a Supabase JWT from the Authorization header.
    Returns the user's UUID (supabase_user_id).
    """
    auth_header = request.headers.get("Authorization")
    
    # Handle local development / testing bypass if needed
    if not auth_header:
        # For now, fallback to 'legacy_admin' to keep things working during transition
        # In a real production app, we would raise an HTTPException here.
        return "legacy_admin"

    try:
        # Extract Bearer token
        token = auth_header.replace("Bearer ", "")
        
        if not supabase:
            raise HTTPException(status_code=500, detail="Supabase not configured on backend")
            
        # Verify the token with Supabase
        user_response = supabase.auth.get_user(token)
        
        if not user_response or not user_response.user:
            raise HTTPException(status_code=401, detail="Invalid or expired session")
            
        return str(user_response.user.id)
        
    except Exception as e:
        print(f"AUTH ERROR: {str(e)}")
        # Raise 401 instead of crashing
        raise HTTPException(status_code=401, detail="Authentication failed")
