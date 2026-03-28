from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.usuario import Usuario
from app.models.practica import Practica
from app.schemas.practica import (
    PracticaCreate,
    PracticaUpdate,
    PracticaResponse,
    PracticaListItem,
)

router = APIRouter(prefix="/practicas", tags=["practicas"])


@router.get("", response_model=list[PracticaListItem])
def list_practicas(
    proyecto_id: UUID | None = None,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    query = db.query(Practica).filter(Practica.usuario_id == current_user.id)
    
    if proyecto_id:
        query = query.filter(Practica.proyecto_id == proyecto_id)
        
    practicas = query.order_by(Practica.fecha.desc()).all()
    
    return [
        PracticaListItem(
            id=p.id,
            titulo=p.titulo,
            materia=p.materia,
            fecha=p.fecha,
            etiquetas=p.etiquetas or [],
            is_public=p.is_public,
            proyecto_id=p.proyecto_id,
            created_at=p.created_at,
            updated_at=p.updated_at,
            usuario_creador=p.usuario.username,
        )
        for p in practicas
    ]


@router.post("", response_model=PracticaResponse, status_code=status.HTTP_201_CREATED)
def create_practica(
    data: PracticaCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    practica = Practica(
        usuario_id=current_user.id,
        proyecto_id=data.proyecto_id,
        titulo=data.titulo,
        materia=data.materia,
        fecha=data.fecha,
        descripcion=data.descripcion,
        objetivo=data.objetivo,
        conclusion=data.conclusion,
        etiquetas=data.etiquetas,
        is_public=getattr(data, "is_public", False) # Fallback seguro
    )
    db.add(practica)
    db.commit()
    db.refresh(practica)
    return _to_response(practica)


@router.get("/{practica_id}/public", response_model=PracticaResponse)
def get_practica_public(
    practica_id: UUID,
    db: Session = Depends(get_db),
):
    practica = db.query(Practica).filter(Practica.id == practica_id).first()
    if not practica:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Práctica no encontrada")
    
    if not practica.is_public:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Esta práctica es privada y no puede ser visualizada públicamente."
        )
        
    return _to_response(practica)


@router.get("/{practica_id}", response_model=PracticaResponse)
def get_practica(
    practica_id: UUID,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    practica = _get_or_404(db, practica_id, current_user.id)
    return _to_response(practica)


@router.put("/{practica_id}", response_model=PracticaResponse)
def update_practica(
    practica_id: UUID,
    data: PracticaUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    practica = _get_or_404(db, practica_id, current_user.id)
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(practica, field, value)
    db.commit()
    db.refresh(practica)
    return _to_response(practica)


@router.delete("/{practica_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_practica(
    practica_id: UUID,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    practica = _get_or_404(db, practica_id, current_user.id)

    # Delete all associated Cloudinary files
    from app.core.cloudinary import delete_file
    for archivo in practica.archivos:
        delete_file(archivo.public_id)

    db.delete(practica)
    db.commit()


def _get_or_404(db: Session, practica_id: UUID, usuario_id) -> Practica:
    practica = (
        db.query(Practica)
        .filter(Practica.id == practica_id, Practica.usuario_id == usuario_id)
        .first()
    )
    if not practica:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Práctica no encontrada")
    return practica


def _to_response(p: Practica) -> PracticaResponse:
    from app.schemas.practica import ArchivoResponse, MedicionResponse
    return PracticaResponse(
        id=p.id,
        titulo=p.titulo,
        materia=p.materia,
        fecha=p.fecha,
        descripcion=p.descripcion,
        objetivo=p.objetivo,
        conclusion=p.conclusion,
        etiquetas=p.etiquetas or [],
        is_public=p.is_public,
        proyecto_id=p.proyecto_id,
        campos_dinamicos=p.campos_dinamicos or {},
        created_at=p.created_at,
        updated_at=p.updated_at,
        usuario_creador=p.usuario.username,
        archivos=[
            ArchivoResponse(
                id=a.id, 
                practica_id=p.id,
                nombre=a.nombre, 
                tipo=a.tipo,
                url_cloudinary=a.url_cloudinary, 
                tamano_kb=a.tamano_kb,
                created_at=a.created_at,
            ) for a in p.archivos
        ],
        mediciones=[
            MedicionResponse(
                id=m.id, nombre_variable=m.nombre_variable, unidad=m.unidad,
                valores=m.valores, timestamps=m.timestamps, notas=m.notas,
                created_at=m.created_at,
            ) for m in p.mediciones
        ],
    )
