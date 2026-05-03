from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base

class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    condition = Column(String) # e.g., Diabetes, Blood Pressure
    food_relation = Column(String) # e.g., Before Food, After Food, Empty Stomach
    dosage = Column(String)
    frequency = Column(String) # e.g., daily
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="medicines")
    reminders = relationship("Reminder", back_populates="medicine")
