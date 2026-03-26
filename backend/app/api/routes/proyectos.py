from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.usuario import Usuario
from app.models.proyecto import Proyecto, ProyectoMiembro
from app.schemas.proyecto import (
    ProyectoCreate,
    ProyectoUpdate,
    ProyectoResponse,
    ProyectoListItem,
)

router = APIRouter(prefix="/proyectos", tags=["proyectos"])

@router.get("", response_model=list[ProyectoListItem])
def list_proyectos(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    # Proyectos donde el usuario es miembro
    proyectos = (
        db.query(Proyecto)
        .join(ProyectoMiembro)
        .filter(ProyectoMiembro.usuario_id == current_user.id)
        .order_by(Proyecto.created_at.desc())
        .all()
    )
    return proyectos

@router.post("", response_model=ProyectoResponse, status_code=status.HTTP_201_CREATED)
def create_proyecto(
    data: ProyectoCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    proyecto = Proyecto(
        nombre=data.nombre,
        descripcion=data.descripcion
    )
    db.add(proyecto)
    db.flush() # Para obtener el ID antes del commit
    
    # Agregar al creador como miembro "owner"
    miembro = ProyectoMiembro(
        proyecto_id=proyecto.id,
        usuario_id=current_user.id,
        rol="owner"
    )
    db.add(miembro)
    db.commit()
    db.refresh(proyecto)
    return proyecto

@router.get("/{proyecto_id}", response_model=ProyectoResponse)
def get_proyecto(
    proyecto_id: UUID,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    proyecto = _get_project_if_member(db, proyecto_id, current_user.id)
    return proyecto

@router.put("/{proyecto_id}", response_model=ProyectoResponse)
def update_proyecto(
    proyecto_id: UUID,
    data: ProyectoUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    proyecto = _get_project_if_member(db, proyecto_id, current_user.id)
    
    # Solo el owner puede editar (por ahora lógica simple)
    # _check_role(db, proyecto_id, current_user.id, ["owner", "editor"])
    
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(proyecto, field, value)
    
    db.commit()
    db.refresh(proyecto)
    return proyecto

@router.delete("/{proyecto_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_proyecto(
    proyecto_id: UUID,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    proyecto = _get_project_if_member(db, proyecto_id, current_user.id)
    
    # Solo el owner puede eliminar
    _check_owner(db, proyecto_id, current_user.id)
    
    db.delete(proyecto)
    db.commit()

def _get_project_if_member(db: Session, proyecto_id: UUID, usuario_id: UUID) -> Proyecto:
    proyecto = (
        db.query(Proyecto)
        .join(ProyectoMiembro)
        .filter(Proyecto.id == proyecto_id, ProyectoMiembro.usuario_id == usuario_id)
        .first()
    )
    if not proyecto:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Proyecto no encontrado o no tienes acceso"
        )
    return proyecto

def _check_owner(db: Session, proyecto_id: UUID, usuario_id: UUID):
    miembro = (
        db.query(ProyectoMiembro)
        .filter(ProyectoMiembro.proyecto_id == proyecto_id, ProyectoMiembro.usuario_id == usuario_id)
        .first()
    )
    if not miembro or miembro.rol != "owner":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Solo el propietario puede realizar esta acción"
        )
