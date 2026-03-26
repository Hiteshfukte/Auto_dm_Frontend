from fastapi import APIRouter, Depends
from database import get_db
from services.auth_wrapper import get_supabase_user

router = APIRouter(prefix="/api/stats", tags=["Stats"])

@router.get("")
def get_stats(user_id: str = Depends(get_supabase_user)):
    """Returns analytics stats for the dashboard of the current user."""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Count sent DMs for this user
        cursor.execute("SELECT COUNT(*) FROM sent_dms WHERE supabase_user_id = ?", (user_id,))
        dms_sent = cursor.fetchone()[0]
        
        # Count active automations for this user
        cursor.execute("SELECT COUNT(*) FROM automations WHERE active=1 AND supabase_user_id = ?", (user_id,))
        active_count = cursor.fetchone()[0]
        
        conn.close()
        
        # Note: 'leads' is currently mapped to 'dms_sent' as per the frontend's previous logic
        return {
            "dms_sent": dms_sent, 
            "leads": dms_sent, 
            "active_automations": active_count
        }
    except Exception as e:
        print("Stats Fetch Error:", e)
        return {"dms_sent": 0, "leads": 0, "active_automations": 0}
