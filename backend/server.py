from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Applied AI Masterclass API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class RegistrationCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=25)
    city: str = Field(min_length=1, max_length=80)
    current_status: str
    ai_familiarity: str
    attend_reason: str
    interested_in_programme: str
    consent: bool

    @field_validator("consent")
    @classmethod
    def must_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Consent is required")
        return v


class Registration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    phone: str
    city: str
    current_status: str
    ai_familiarity: str
    attend_reason: str
    interested_in_programme: str
    consent: bool
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Applied AI Masterclass API", "status": "ok"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.dict())
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    docs = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**d) for d in docs]


@api_router.post("/register")
async def register(payload: RegistrationCreate):
    try:
        reg = Registration(**payload.dict())
        # Prevent duplicate email (soft check)
        existing = await db.registrations.find_one({"email": reg.email.lower()})
        doc = reg.dict()
        doc["email"] = reg.email.lower()
        if existing:
            # Update existing record with latest info instead of failing
            await db.registrations.update_one(
                {"email": reg.email.lower()},
                {"$set": {**doc, "updated_at": datetime.now(timezone.utc)}},
            )
            return {"success": True, "id": existing.get("id", reg.id), "updated": True}
        await db.registrations.insert_one(doc)
        return {"success": True, "id": reg.id, "updated": False}
    except Exception as e:
        logging.exception("register failed")
        raise HTTPException(status_code=400, detail=str(e))


@api_router.get("/registrations/count")
async def registrations_count():
    count = await db.registrations.count_documents({})
    return {"count": count}


@api_router.get("/registrations", response_model=List[Registration])
async def list_registrations(limit: int = 100):
    docs = await db.registrations.find().sort("created_at", -1).to_list(limit)
    return [Registration(**d) for d in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
