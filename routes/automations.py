from fastapi import APIRouter, Depends, HTTPException
from typing import List
from database import get_db
from models import Automation, AutomationCreate
from middleware.auth import verify_token
import sqlite3

router = APIRouter(prefix="/api/automations", tags=["Automations"])

@router.get("", response_model=List[Automation], dependencies=[Depends(verify_token)])
def get_automations():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM automations ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@router.post("", response_model=Automation, dependencies=[Depends(verify_token)])
def create_automation(auto: AutomationCreate):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO automations (user_id, name, keyword, message, link, follow_gate, active, media_id, thumbnail_url, caption)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, ("default", auto.name, auto.keyword, auto.message, auto.link, int(auto.follow_gate), int(auto.active), auto.media_id, auto.thumbnail_url, auto.caption))
        new_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return {**auto.dict(), "id": new_id, "user_id": "default", "dms_today": 0}
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{automation_id}", dependencies=[Depends(verify_token)])
def update_automation(automation_id: int, auto: AutomationCreate):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE automations SET name=?, keyword=?, message=?, link=?, follow_gate=?, active=?, media_id=?, thumbnail_url=?, caption=? 
            WHERE id=?
        """, (auto.name, auto.keyword, auto.message, auto.link, int(auto.follow_gate), int(auto.active), auto.media_id, auto.thumbnail_url, auto.caption, automation_id))
        conn.commit()
        conn.close()
        return {"status": "updated"}
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{automation_id}", dependencies=[Depends(verify_token)])
def delete_automation(automation_id: int):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM automations WHERE id=?", (automation_id,))
        conn.commit()
        conn.close()
        return {"status": "deleted"}
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))
