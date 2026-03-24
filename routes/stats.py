from fastapi import APIRouter, Depends
from database import get_db
from middleware.auth import verify_token

router = APIRouter(prefix="/api/stats", tags=["Stats"])

@router.get("", dependencies=[Depends(verify_token)])
def get_stats():
    """Returns analytics stats for the dashboard."""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Count sent DMs
        cursor.execute("SELECT COUNT(*) FROM sent_dms")
        dms_sent = cursor.fetchone()[0]
        
        # Count active automations
        cursor.execute("SELECT COUNT(*) FROM automations WHERE active=1")
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
