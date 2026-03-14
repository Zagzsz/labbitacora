import uuid
from typing import Optional
from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: uuid.UUID
    username: str
    universidad: Optional[str] = None
    carrera: Optional[str] = None
    semestre: Optional[str] = None

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    universidad: Optional[str] = None
    carrera: Optional[str] = None
    semestre: Optional[str] = None
