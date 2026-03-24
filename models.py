from pydantic import BaseModel
from typing import Optional, List

class AutomationBase(BaseModel):
    name: str  
    keyword: str
    message: str
    link: Optional[str] = None
    follow_gate: bool = False
    active: bool = True
    media_id: Optional[str] = None
    thumbnail_url: Optional[str] = None
    caption: Optional[str] = None

class AutomationCreate(AutomationBase):
    pass

class Automation(AutomationBase):
    id: int
    user_id: str
    dms_today: Optional[int] = 0

class ConnectRequest(BaseModel):
    access_token: str
    business_id: str
