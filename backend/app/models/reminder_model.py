from sqlalchemy import Column, Integer, Time, ForeignKey, Boolean, Date
from sqlalchemy.orm import relationship
from app.db.database import Base

class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(Integer, primary_key=True, index=True)
    medicine_id = Column(Integer, ForeignKey("medicines.id"))
    time = Column(Time)
    is_active = Column(Boolean, default=True)

    medicine = relationship("Medicine", back_populates="reminders")
    logs = relationship("AdherenceLog", back_populates="reminder")
