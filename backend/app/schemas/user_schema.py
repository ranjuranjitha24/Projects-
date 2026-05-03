from pydantic import BaseModel, EmailStr
from datetime import time
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    wake_up_time: Optional[time] = None
    breakfast_time: Optional[time] = None
    lunch_time: Optional[time] = None
    dinner_time: Optional[time] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
