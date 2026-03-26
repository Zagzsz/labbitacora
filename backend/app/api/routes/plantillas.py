from uuid import UUID
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.usuario import Usuario
from app.models.plantilla import Plantilla
from app.schemas.plantilla import PlantillaCreate, PlantillaResponse

router = APIRouter(prefix="/plantillas", tags=["Plantillas"])

@router.get("/", response_model=List[PlantillaResponse])
def get_plantillas(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    return db.query(Plantilla).filter(Plantilla.usuario_id == current_user.id).all()

@router.post("/", response_model=PlantillaResponse, status_code=status.HTTP_201_CREATED)
def create_plantilla(
    plantilla_in: PlantillaCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    db_plantilla = Plantilla(
        **plantilla_in.model_dump(),
        usuario_id=current_user.id
    )
    db.add(db_plantilla)
    db.commit()
    db.refresh(db_plantilla)
    return db_plantilla

@router.delete("/{plantilla_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_plantilla(
    plantilla_id: UUID,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    db_plantilla = db.query(Plantilla).filter(
        Plantilla.id == plantilla_id, 
        Plantilla.usuario_id == current_user.id
    ).first()
    
    if not db_plantilla:
        raise HTTPException(status_code=404, detail="Plantilla no encontrada")
        
    db.delete(db_plantilla)
    db.commit()
    return None
