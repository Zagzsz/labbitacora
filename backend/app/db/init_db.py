from sqlalchemy.orm import Session
import logging

from app.core.config import get_settings
from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.usuario import Usuario

settings = get_settings()
logger = logging.getLogger(__name__)


def init_db() -> None:
    """Crea el usuario administrador si no existe."""
    db: Session = SessionLocal()
    try:
        # Buscar solo por nombre de usuario
        admin = db.query(Usuario).filter(Usuario.username == settings.ADMIN_USERNAME).first()
        
        if not admin:
            admin = Usuario(
                username=settings.ADMIN_USERNAME,
                hashed_password=hash_password(settings.ADMIN_PASSWORD),
                is_admin=True,
                is_active=True
            )
            db.add(admin)
            db.commit()
            logger.info("Admin user created")
        else:
            # Asegurar que el admin existente tenga los flags correctos
            if not admin.is_admin or not admin.is_active:
                admin.is_admin = True
                admin.is_active = True
                db.commit()
                logger.info("Admin flags updated")
            else:
                logger.info("Admin user already exists")
    finally:
        db.close()
