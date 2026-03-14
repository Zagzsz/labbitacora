import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class MedicionCreate(BaseModel):
    nombre_variable: str
    unidad: str
    valores: list[float]
    timestamps: Optional[list[float]] = None
    notas: Optional[str] = None


class MedicionUpdate(BaseModel):
    nombre_variable: Optional[str] = None
    unidad: Optional[str] = None
    valores: Optional[list[float]] = None
    timestamps: Optional[list[float]] = None
    notas: Optional[str] = None


class MedicionResponse(BaseModel):
    id: uuid.UUID
    nombre_variable: str
    unidad: str
    valores: list[float]
    timestamps: Optional[list[float]] = None
    notas: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}
