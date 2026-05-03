from sqlalchemy import Column, Integer, ForeignKey, Boolean, Date, Time
from sqlalchemy.orm import relationship
from app.db.database import Base

class AdherenceLog(Base):
    __tablename__ = "adherence_logs"

    id = Column(Integer, primary_key=True, index=True)
    reminder_id = Column(Integer, ForeignKey("reminders.id"))
    date = Column(Date)
    taken = Column(Boolean, default=False)
    taken_at = Column(Time, nullable=True)

    reminder = relationship("Reminder", back_populates="logs")
