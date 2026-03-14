import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ArchivoResponse(BaseModel):
    id: uuid.UUID
    practica_id: uuid.UUID
    nombre: str
    tipo: str
    url_cloudinary: str
    tamano_kb: Optional[int] = None
    created_at: datetime

    model_config = {"from_attributes": True}
