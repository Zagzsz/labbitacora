import uuid
from typing import Optional
from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    username: str
    password: str


class RegisterRequest(BaseModel):
    username: str
    password: str = Field(min_length=8, max_length=128)


class AdminResetPasswordRequest(BaseModel):
    new_password: str = Field(min_length=8, max_length=128)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: uuid.UUID
    username: str
    is_admin: bool
    is_active: bool
    full_name: Optional[str] = None
    universidad: Optional[str] = None
    carrera: Optional[str] = None
    semestre: Optional[str] = None

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    universidad: Optional[str] = None
    carrera: Optional[str] = None
    semestre: Optional[str] = None
