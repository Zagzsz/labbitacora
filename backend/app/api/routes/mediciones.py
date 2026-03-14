from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.usuario import Usuario
from app.models.practica import Practica
from app.models.medicion import Medicion
from app.schemas.medicion import MedicionCreate, MedicionUpdate, MedicionResponse

router = APIRouter(tags=["mediciones"])


@router.post(
    "/practicas/{practica_id}/mediciones",
    response_model=MedicionResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_medicion(
    practica_id: UUID,
    data: MedicionCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    practica = (
        db.query(Practica)
        .filter(Practica.id == practica_id, Practica.usuario_id == current_user.id)
        .first()
    )
    if not practica:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Práctica no encontrada")

    medicion = Medicion(
        practica_id=practica_id,
        nombre_variable=data.nombre_variable,
        unidad=data.unidad,
        valores=data.valores,
        timestamps=data.timestamps,
        notas=data.notas,
    )
    db.add(medicion)
    db.commit()
    db.refresh(medicion)
    return _to_response(medicion)


@router.put("/mediciones/{medicion_id}", response_model=MedicionResponse)
def update_medicion(
    medicion_id: UUID,
    data: MedicionUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    medicion = _get_or_403(db, medicion_id, current_user.id)
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(medicion, field, value)
    db.commit()
    db.refresh(medicion)
    return _to_response(medicion)


@router.delete("/mediciones/{medicion_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_medicion(
    medicion_id: UUID,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    medicion = _get_or_403(db, medicion_id, current_user.id)
    db.delete(medicion)
    db.commit()


def _get_or_403(db: Session, medicion_id: UUID, usuario_id) -> Medicion:
    medicion = db.query(Medicion).filter(Medicion.id == medicion_id).first()
    if not medicion:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Medición no encontrada")
    practica = db.query(Practica).filter(
        Practica.id == medicion.practica_id,
        Practica.usuario_id == usuario_id,
    ).first()
    if not practica:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")
    return medicion


def _to_response(m: Medicion) -> MedicionResponse:
    return MedicionResponse(
        id=str(m.id),
        nombre_variable=m.nombre_variable,
        unidad=m.unidad,
        valores=m.valores,
        timestamps=m.timestamps,
        notas=m.notas,
        created_at=m.created_at,
    )
