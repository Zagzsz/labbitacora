import uuid
from typing import Optional
from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class VerifyCodeRequest(BaseModel):
    email: str
    code: str
    purpose: str  # "register" or "reset_password"


class ForgotPasswordRequest(BaseModel):
    email: str


class ResetPasswordRequest(BaseModel):
    email: str
    code: str
    new_password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: uuid.UUID
    username: str
    email: str
    is_admin: bool
    is_active: bool
    universidad: Optional[str] = None
    carrera: Optional[str] = None
    semestre: Optional[str] = None

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    universidad: Optional[str] = None
    carrera: Optional[str] = None
    semestre: Optional[str] = None
