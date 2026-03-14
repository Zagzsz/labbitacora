from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models.usuario import Usuario

settings = get_settings()


def init_db() -> None:
    """Create the admin user if it doesn't exist."""
    db: Session = SessionLocal()
    try:
        existing = db.query(Usuario).filter(
            Usuario.username == settings.ADMIN_USERNAME
        ).first()
        if not existing:
            admin = Usuario(
                username=settings.ADMIN_USERNAME,
                hashed_password=hash_password(settings.ADMIN_PASSWORD),
            )
            db.add(admin)
            db.commit()
            print(f"✅ Admin user '{settings.ADMIN_USERNAME}' created.")
        else:
            print(f"ℹ️  Admin user '{settings.ADMIN_USERNAME}' already exists.")
    finally:
        db.close()
