from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.usuario import Usuario

settings = get_settings()


def init_db() -> None:
    """Crea el usuario administrador si no existe."""
    db: Session = SessionLocal()
    try:
        # Buscar por nombre de usuario o email
        admin = db.query(Usuario).filter(
            (Usuario.username == settings.ADMIN_USERNAME) | 
            (Usuario.email == settings.ADMIN_EMAIL)
        ).first()
        
        if not admin:
            admin = Usuario(
                username=settings.ADMIN_USERNAME,
                email=settings.ADMIN_EMAIL,
                hashed_password=hash_password(settings.ADMIN_PASSWORD),
                is_admin=True,
                is_active=True
            )
            db.add(admin)
            db.commit()
            print(f"✅ Usuario administrador '{settings.ADMIN_USERNAME}' creado.")
        else:
            # Asegurar que el admin existente tenga los flags correctos
            if not admin.is_admin or not admin.is_active or admin.email != settings.ADMIN_EMAIL:
                admin.is_admin = True
                admin.is_active = True
                admin.email = settings.ADMIN_EMAIL
                db.commit()
                print(f"ℹ️ Flags de usuario administrador '{settings.ADMIN_USERNAME}' actualizados.")
            else:
                print(f"ℹ️ El usuario administrador '{settings.ADMIN_USERNAME}' ya existe.")
    finally:
        db.close()
