from fastapi import APIRouter, HTTPException, Depends
from typing import List
from database import get_db
from models import Automation, AutomationCreate
from services.auth_wrapper import get_supabase_user
import sqlite3

router = APIRouter(prefix="/api/automations", tags=["Automations"])

@router.get("", response_model=List[Automation])
def get_automations(user_id: str = Depends(get_supabase_user)):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM automations WHERE supabase_user_id = ? ORDER BY created_at DESC", (user_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@router.post("", response_model=Automation)
def create_automation(auto: AutomationCreate, user_id: str = Depends(get_supabase_user)):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO automations (supabase_user_id, name, keyword, message, link, follow_gate, active, media_id, thumbnail_url, caption)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (user_id, auto.name, auto.keyword, auto.message, auto.link, int(auto.follow_gate), int(auto.active), auto.media_id, auto.thumbnail_url, auto.caption))
        new_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return {**auto.dict(), "id": new_id, "supabase_user_id": user_id, "dms_today": 0}
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{automation_id}")
def update_automation(automation_id: int, auto: AutomationCreate, user_id: str = Depends(get_supabase_user)):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE automations SET name=?, keyword=?, message=?, link=?, follow_gate=?, active=?, media_id=?, thumbnail_url=?, caption=? 
            WHERE id=? AND supabase_user_id=?
        """, (auto.name, auto.keyword, auto.message, auto.link, int(auto.follow_gate), int(auto.active), auto.media_id, auto.thumbnail_url, auto.caption, automation_id, user_id))
        conn.commit()
        conn.close()
        return {"status": "updated"}
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{automation_id}")
def delete_automation(automation_id: int, user_id: str = Depends(get_supabase_user)):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM automations WHERE id=? AND supabase_user_id=?", (automation_id, user_id))
        conn.commit()
        conn.close()
        return {"status": "deleted"}
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))
