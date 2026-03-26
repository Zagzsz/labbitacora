import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel

class PlantillaField(BaseModel):
    id: str
    name: str
    type: str # text, number, date, select
    unit: Optional[str] = None
    options: Optional[List[str]] = None # For select types
    required: bool = False

class PlantillaBase(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    campos_schema: List[PlantillaField] = []

class PlantillaCreate(PlantillaBase):
    pass

class PlantillaResponse(PlantillaBase):
    id: uuid.UUID
    usuario_id: uuid.UUID
    created_at: datetime

    class Config:
        from_attributes = True
