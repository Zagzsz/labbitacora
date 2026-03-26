from datetime import datetime, timedelta, timezone
import random
import uuid

from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from app.core.security import verify_password, create_access_token, hash_password
from app.db.session import get_db
from app.models.usuario import Usuario
from app.schemas.auth import (
    LoginRequest, 
    TokenResponse, 
    UserResponse, 
    UserUpdate,
    RegisterRequest
)
from app.api.deps import get_current_user, get_current_admin_user
from app.core.limiter import limiter
# from app.core.email import send_verification_code # Eliminado

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/ping")
def ping():
    return {"status": "ok", "message": "Backend is reachable"}


@router.post("/login", response_model=TokenResponse)
@limiter.limit("5/minute")
def login(data: LoginRequest, request: Request, db: Session = Depends(get_db)):
    print(f"🔑 Login attempt: {data.username}")
    user = db.query(Usuario).filter(Usuario.username == data.username).first()
    if not user:
        print(f"❌ Login failed: User '{data.username}' not found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
        )
    
    if not user.is_active:
        print(f"❌ Login failed: Account deactivated for '{data.username}'")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cuenta desactivada. Contacta al administrador.",
        )
    
    if not verify_password(data.password, user.hashed_password):
        print(f"❌ Login failed: Password mismatch for '{data.username}'")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
        )
    
    print(f"✅ Login success: {data.username}")
    token = create_access_token({"sub": str(user.id), "is_admin": user.is_admin})
    return TokenResponse(access_token=token)


@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
@limiter.limit("10/hour")
def register(data: RegisterRequest, request: Request, db: Session = Depends(get_db)):
    # Verificar si el usuario ya existe
    user = db.query(Usuario).filter(Usuario.username == data.username).first()
    
    if user:
        if user.is_active:
            raise HTTPException(status_code=409, detail="El nombre de usuario ya está en uso")
        
        # Reintento de usuario inactivo: actualizar contraseña y reactivar directamente
        print(f"🔄 Reactivando usuario inactivo desde registro: {data.username}")
        user.hashed_password = hash_password(data.password)
        user.is_active = True
        db.commit()
        db.refresh(user)
        return user

    # Crear nuevo usuario activo
    print(f"🆕 Creando nuevo usuario activo: {data.username}")
    new_user = Usuario(
        username=data.username,
        hashed_password=hash_password(data.password),
        is_active=True,
        is_admin=False
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.patch("/users/{user_id}/reset-password", response_model=UserResponse)
def admin_reset_password(
    user_id: uuid.UUID,
    db: Session = Depends(get_db),
    admin_user: Usuario = Depends(get_current_admin_user)
):
    user = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    new_pass = data.get("new_password")
    if not new_pass or len(new_pass) < 6:
        raise HTTPException(status_code=400, detail="La contraseña debe tener al menos 6 caracteres")
        
    user.hashed_password = hash_password(new_pass)
    db.commit()
    db.refresh(user)
    return user


@router.get("/me", response_model=UserResponse)
def get_me(current_user: Usuario = Depends(get_current_user)):
    return current_user


@router.put("/me", response_model=UserResponse)
def update_me(
    data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(current_user, field, value)
    db.commit()
    db.refresh(current_user)
    return current_user


# Rutas de Administrador
@router.get("/users", response_model=list[UserResponse])
def list_users(
    db: Session = Depends(get_db),
    admin_user: Usuario = Depends(get_current_admin_user)
):
    return db.query(Usuario).order_by(Usuario.created_at.desc()).all()


@router.patch("/users/{user_id}/deactivate", response_model=UserResponse)
def deactivate_user(
    user_id: uuid.UUID,
    db: Session = Depends(get_db),
    admin_user: Usuario = Depends(get_current_admin_user)
):
    if user_id == admin_user.id:
        raise HTTPException(status_code=400, detail="No puedes desactivarte a ti mismo")
    
    user = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    user.is_active = False
    db.commit()
    db.refresh(user)
    return user


@router.patch("/users/{user_id}/activate", response_model=UserResponse)
def activate_user(
    user_id: uuid.UUID,
    db: Session = Depends(get_db),
    admin_user: Usuario = Depends(get_current_admin_user)
):
    user = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    user.is_active = True
    db.commit()
    db.refresh(user)
    return user
