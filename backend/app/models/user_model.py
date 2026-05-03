from sqlalchemy import Column, Integer, String, Time
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    # Routine settings
    wake_up_time = Column(Time, nullable=True)
    breakfast_time = Column(Time, nullable=True)
    lunch_time = Column(Time, nullable=True)
    dinner_time = Column(Time, nullable=True)

    medicines = relationship("Medicine", back_populates="user")
