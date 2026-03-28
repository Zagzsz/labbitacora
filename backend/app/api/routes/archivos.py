from uuid import UUID
import logging

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status, Request
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.usuario import Usuario
from app.models.practica import Practica
from app.models.archivo import Archivo
from app.schemas.archivo import ArchivoResponse
from app.core.cloudinary import upload_file, delete_file
from app.core.limiter import limiter

router = APIRouter(tags=["archivos"])
logger = logging.getLogger(__name__)

MAX_UPLOAD_SIZE_BYTES = 25 * 1024 * 1024


@router.post(
    "/practicas/{practica_id}/archivos",
    response_model=ArchivoResponse,
    status_code=status.HTTP_201_CREATED,
)
@limiter.limit("20/minute")
async def upload_archivo(
    practica_id: UUID,
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    # Verify practica belongs to user
    practica = (
        db.query(Practica)
        .filter(Practica.id == practica_id, Practica.usuario_id == current_user.id)
        .first()
    )
    if not practica:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Práctica no encontrada")

    # Determine file type
    content_type = file.content_type or ""
    filename = file.filename or ""
    ext = filename.split(".")[-1].lower() if "." in filename else ""

    if content_type.startswith("image/") or ext in ["jpg", "jpeg", "png", "gif", "webp"]:
        tipo = "imagen"
    elif content_type.startswith("video/") or ext in ["mov", "mp4", "avi", "mkv"]:
        tipo = "video"
    elif content_type == "application/pdf" or ext == "pdf":
        tipo = "pdf"
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Solo se permiten imágenes, videos y PDFs"
        )

    # Read file in chunks and enforce a hard cap to prevent memory abuse.
    total_size = 0
    file_buffer = bytearray()
    while True:
        chunk = await file.read(1024 * 1024)
        if not chunk:
            break
        total_size += len(chunk)
        if total_size > MAX_UPLOAD_SIZE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="El archivo excede el límite de 25MB",
            )
        file_buffer.extend(chunk)

    file_bytes = bytes(file_buffer)
    tamano_kb = len(file_bytes) // 1024
    filename = file.filename or "archivo"
    cloud_result = upload_file(file_bytes, filename, folder=f"labbitacora/{practica_id}")
    logger.info("Cloudinary upload success")

    # Save to database
    archivo = Archivo(
        practica_id=practica_id,
        nombre=filename,
        tipo=tipo,
        url_cloudinary=cloud_result["url"],
        public_id=cloud_result["public_id"],
        tamano_kb=tamano_kb,
    )
    db.add(archivo)
    db.commit()
    db.refresh(archivo)

    return ArchivoResponse(
        id=str(archivo.id),
        practica_id=str(archivo.practica_id),
        nombre=archivo.nombre,
        tipo=archivo.tipo,
        url_cloudinary=archivo.url_cloudinary,
        tamano_kb=archivo.tamano_kb,
        created_at=archivo.created_at,
    )


@router.get("/archivos", response_model=list[ArchivoResponse])
def get_all_archivos(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    """
    Retrieve all files across all practices belonging to the current user.
    """
    return (
        db.query(Archivo)
        .join(Practica, Archivo.practica_id == Practica.id)
        .filter(Practica.usuario_id == current_user.id)
        .order_by(Archivo.created_at.desc())
        .all()
    )


@router.delete("/archivos/{archivo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_archivo(
    archivo_id: UUID,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    archivo = db.query(Archivo).filter(Archivo.id == archivo_id).first()
    if not archivo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Archivo no encontrado")

    # Verify ownership through practica
    practica = db.query(Practica).filter(
        Practica.id == archivo.practica_id,
        Practica.usuario_id == current_user.id,
    ).first()
    if not practica:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Sin permisos")

    delete_file(archivo.public_id)
    db.delete(archivo)
    db.commit()
