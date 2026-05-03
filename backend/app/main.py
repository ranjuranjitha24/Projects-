from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine, Base

from app.api import user, medicine

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Smart Health Reminder API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/api/users", tags=["users"])
app.include_router(medicine.router, prefix="/api/medicines", tags=["medicines"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Smart Health Reminder API"}

# Include routers here
