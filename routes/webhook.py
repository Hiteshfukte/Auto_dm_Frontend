from fastapi import APIRouter, Request, Response
from fastapi.responses import PlainTextResponse
import os
from config import get_config, get_supabase_user_by_business_id
from services.comment_handler import handle_comment_event
from services.gate_logic import handle_message_event
import traceback

router = APIRouter(prefix="/api/webhook", tags=["Webhook"])

@router.api_route("", methods=["GET", "HEAD"])
async def verify_webhook(request: Request):
    """Meta's verification GET request."""
    # Use ENV or DB config for Verify Token
    VERIFY_TOKEN = get_config("VERIFY_TOKEN") or "verify123"
    
    params = request.query_params
    if (
        params.get("hub.mode") == "subscribe" and 
        params.get("hub.verify_token") == VERIFY_TOKEN
    ):
        print("Webhook Verified!")
        return PlainTextResponse(content=params.get("hub.challenge"), status_code=200)
    
    return Response(content="Verification failed", status_code=403)

@router.post("")
async def receive_events(request: Request):
    """Processes incoming data from Meta's Webhooks."""
    data = await request.json()
    
    # Robust logging for debugging
    log_msg = f"\n--- WEBHOOK RECEIVED at {os.times()} ---\n{data}\n"
    print(log_msg, flush=True)
    with open("webhook_debug.log", "a", encoding="utf-8") as f:
        f.write(log_msg)
    
    try:
        # Standard Meta Webhook Structure: entry[] -> changes[] or messaging[]
        if "entry" not in data:
            return {"status": "ignored"}
            
        for entry in data["entry"]:
            # Identify the owner of this specific Instagram Business ID
            ig_id = entry.get("id")
            supabase_user_id = get_supabase_user_by_business_id(ig_id) or "legacy_admin"
            
            # Handle Comments (IG 'media' object changes)
            if "changes" in entry:
                for change in entry["changes"]:
                    if change.get("field") == "comments":
                        await handle_comment_event(change.get("value"), supabase_user_id)
            
            # Handle Direct Messages (Phase 6)
            elif "messaging" in entry:
                for event in entry["messaging"]:
                    message = event.get("message", {})
                    # Skip 'is_echo' messages (messages sent by our own bot)
                    if message.get("is_echo"):
                        continue
                        
                    if "text" in message:
                        await handle_message_event(event, supabase_user_id)
                
    except Exception as e:
        error_msg = f"Webhook Processing Error: {str(e)}\n{traceback.format_exc()}"
        print(error_msg, flush=True)
        with open("webhook_debug.log", "a", encoding="utf-8") as f:
            f.write(f"\n!!! ERROR !!!\n{error_msg}\n")
        
    return {"status": "ok"}
