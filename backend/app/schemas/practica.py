import uuid
from datetime import date, datetime
from typing import Optional, List
from pydantic import BaseModel


class PracticaCreate(BaseModel):
    titulo: str
    materia: str
    fecha: date
    etiquetas: List[str] = []
    objetivo: Optional[str] = None
    descripcion: Optional[str] = None
    conclusion: Optional[str] = None
    proyecto_id: Optional[uuid.UUID] = None
    is_public: bool = False
    campos_dinamicos: dict = {}


class PracticaUpdate(BaseModel):
    titulo: Optional[str] = None
    materia: Optional[str] = None
    fecha: Optional[date] = None
    etiquetas: Optional[List[str]] = None
    objetivo: Optional[str] = None
    descripcion: Optional[str] = None
    conclusion: Optional[str] = None
    is_public: Optional[bool] = None
    campos_dinamicos: Optional[dict] = None
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
    campos_dinamicos: dict = {}
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
    campos_dinamicos: dict = {}
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
