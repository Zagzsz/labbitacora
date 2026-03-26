import uuid
from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel


class PracticaCreate(BaseModel):
    titulo: str
    materia: str
    fecha: date
    descripcion: Optional[str] = None
    objetivo: Optional[str] = None
    conclusion: Optional[str] = None
    etiquetas: list[str] = []


class PracticaUpdate(BaseModel):
    titulo: Optional[str] = None
    materia: Optional[str] = None
    fecha: Optional[date] = None
    descripcion: Optional[str] = None
    objetivo: Optional[str] = None
    conclusion: Optional[str] = None
    etiquetas: Optional[list[str]] = None
    is_public: Optional[bool] = None
    proyecto_id: Optional[uuid.UUID] = None


class ArchivoResponse(BaseModel):
    id: uuid.UUID
    nombre: str
    tipo: str
    url_cloudinary: str
    tamano_kb: Optional[int] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class MedicionResponse(BaseModel):
    id: uuid.UUID
    nombre_variable: str
    unidad: str
    valores: list[float]
    timestamps: Optional[list[float]] = None
    notas: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class PracticaResponse(BaseModel):
    id: uuid.UUID
    titulo: str
    materia: str
    fecha: date
    descripcion: Optional[str] = None
    objetivo: Optional[str] = None
    conclusion: Optional[str] = None
    is_public: bool = False
    proyecto_id: Optional[uuid.UUID] = None
    created_at: datetime
    updated_at: datetime
    archivos: list[ArchivoResponse] = []
    mediciones: list[MedicionResponse] = []

    model_config = {"from_attributes": True}


class PracticaListItem(BaseModel):
    id: uuid.UUID
    titulo: str
    materia: str
    fecha: date
    etiquetas: list[str] = []
    is_public: bool = False
    proyecto_id: Optional[uuid.UUID] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
