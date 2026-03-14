import os
import sys
# Add parent directory to path so we can import app modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.usuario import Usuario
from app.core.security import hash_password
from app.core.config import get_settings

settings = get_settings()

def reset_admin():
    print(f"🔄 Re-sincronizando contraseña para: {settings.ADMIN_USERNAME}")
    db: Session = SessionLocal()
    try:
        user = db.query(Usuario).filter(Usuario.username == settings.ADMIN_USERNAME).first()
        if not user:
            print("❌ Admin no encontrado. Creándolo...")
            user = Usuario(
                username=settings.ADMIN_USERNAME,
                hashed_password=hash_password(settings.ADMIN_PASSWORD)
            )
            db.add(user)
        else:
            print("✅ Admin encontrado. Actualizando hash...")
            user.hashed_password = hash_password(settings.ADMIN_PASSWORD)
        
        db.commit()
        print("✨ Contraseña actualizada correctamente en la base de datos.")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_admin()
