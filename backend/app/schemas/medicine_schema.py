from pydantic import BaseModel
from typing import Optional

class MedicineCreate(BaseModel):
    name: str
    condition: str
    food_relation: str
    dosage: str
    frequency: str

class MedicineResponse(BaseModel):
    id: int
    name: str
    condition: str
    food_relation: str
    dosage: str
    frequency: str
    user_id: int

    class Config:
        from_attributes = True
