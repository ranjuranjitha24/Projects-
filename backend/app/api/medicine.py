from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.models.medicine_model import Medicine
from app.schemas.medicine_schema import MedicineCreate, MedicineResponse
from app.services.health_logic import calculate_reminder_times

router = APIRouter()

@router.post("/", response_model=MedicineResponse)
def add_medicine(medicine: MedicineCreate, user_id: int, db: Session = Depends(get_db)):
    # Create the new medicine
    new_med = Medicine(
        name=medicine.name,
        condition=medicine.condition,
        food_relation=medicine.food_relation,
        dosage=medicine.dosage,
        frequency=medicine.frequency,
        user_id=user_id
    )
    db.add(new_med)
    db.commit()
    db.refresh(new_med)
    
    # Calculate reminders
    # In a full app, we'd fetch the user's routines from the DB and pass them
    # user = db.query(User).filter(User.id == user_id).first()
    # routines = {"wake_up_time": user.wake_up_time, ...}
    # times = calculate_reminder_times(medicine.condition, medicine.food_relation, medicine.frequency, routines)
    # Then insert into Reminder table.

    return new_med

@router.get("/user/{user_id}", response_model=List[MedicineResponse])
def get_user_medicines(user_id: int, db: Session = Depends(get_db)):
    return db.query(Medicine).filter(Medicine.user_id == user_id).all()
