from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict

class ProyectoBase(BaseModel):
    nombre: str
    descripcion: str | None = None

class ProyectoCreate(ProyectoBase):
    pass

class ProyectoUpdate(BaseModel):
    nombre: str | None = None
    descripcion: str | None = None
    slug: str | None = None

class ProyectoResponse(ProyectoBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: UUID
    slug: str | None
    created_at: datetime
    updated_at: datetime

class ProyectoListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: UUID
    nombre: str
    descripcion: str | None
    created_at: datetime
