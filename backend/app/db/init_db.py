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
        # Check by username or email
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
            print(f"✅ Admin user '{settings.ADMIN_USERNAME}' created.")
        else:
            # Ensure existing admin has correct flags
            if not admin.is_admin or not admin.is_active or admin.email != settings.ADMIN_EMAIL:
                admin.is_admin = True
                admin.is_active = True
                admin.email = settings.ADMIN_EMAIL
                db.commit()
                print(f"ℹ️ Admin user '{settings.ADMIN_USERNAME}' flags updated.")
            else:
                print(f"ℹ️ Admin user '{settings.ADMIN_USERNAME}' already exists and is configured.")
    finally:
        db.close()
