from datetime import datetime, timedelta, timezone
import random
import uuid

from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from app.core.security import verify_password, create_access_token, hash_password
from app.db.session import get_db
from app.models.usuario import Usuario
from app.models.verification_code import VerificationCode
from app.schemas.auth import (
    LoginRequest, 
    TokenResponse, 
    UserResponse, 
    UserUpdate,
    RegisterRequest,
    VerifyCodeRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest
)
from app.api.deps import get_current_user, get_current_admin_user
from app.core.limiter import limiter
from app.core.email import send_verification_code

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


@router.post("/register", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/hour")
def register(data: RegisterRequest, request: Request, db: Session = Depends(get_db)):
    # Check if user exists (either by username or email)
    user = db.query(Usuario).filter(
        (Usuario.username == data.username) | (Usuario.email == data.email)
    ).first()
    
    if user:
        if user.is_active:
            detail = "El nombre de usuario ya existe" if user.username == data.username else "El correo ya está registrado"
            raise HTTPException(status_code=409, detail=detail)
        
        # If user is inactive, they might be retrying because email failed or they didn't verify.
        # We update their info (in case they changed something) and re-send the code.
        print(f"🔄 Retrying registration for inactive user: {data.email}")
        user.username = data.username
        user.email = data.email
        user.hashed_password = hash_password(data.password)
    else:
        print(f"🆕 Creating new user for registration: {data.email}")
        user = Usuario(
            username=data.username,
            email=data.email,
            hashed_password=hash_password(data.password),
            is_active=False,
            is_admin=False
        )
        db.add(user)
    
    db.flush() # Ensure user has an ID
    
    # Generate/Update verification code
    code = f"{random.randint(100000, 999999)}"
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    # Clean old codes for this email
    db.query(VerificationCode).filter(
        VerificationCode.email == data.email, 
        VerificationCode.purpose == "register"
    ).update({"used": True})
    
    v_code = VerificationCode(
        email=data.email,
        code=code,
        purpose="register",
        expires_at=expires_at
    )
    db.add(v_code)
    
    # Try sending email BEFORE final commit
    if not send_verification_code(data.email, code, "register"):
        db.rollback() # Don't leave an inactive user if we couldn't even send the code the first time
        # (Though if they are already in DB from a previous attempt, rollback won't remove them, but it's okay)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Error al enviar el correo de verificación. Verifica tu email o intenta más tarde."
        )
        
    db.commit()
    return {"message": "Código de verificación enviado"}


@router.post("/verify-email")
def verify_email(data: VerifyCodeRequest, db: Session = Depends(get_db)):
    v_code = db.query(VerificationCode).filter(
        VerificationCode.email == data.email,
        VerificationCode.code == data.code,
        VerificationCode.purpose == data.purpose,
        VerificationCode.used == False,
        VerificationCode.expires_at > datetime.now(timezone.utc)
    ).first()
    
    if not v_code:
        raise HTTPException(status_code=400, detail="Código inválido o expirado")
    
    v_code.used = True
    
    if data.purpose == "register":
        user = db.query(Usuario).filter(Usuario.email == data.email).first()
        if user:
            user.is_active = True
            db.commit()
            return {"message": "Email verificado y cuenta activada"}
    
    db.commit()
    return {"message": "Código verificado correctamente"}


@router.post("/forgot-password")
@limiter.limit("3/hour")
def forgot_password(data: ForgotPasswordRequest, request: Request, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    if not user:
        # Don't reveal if email exists, but we can say "if exists, email sent"
        return {"message": "Si el correo está registrado, se ha enviado un código"}
    
    code = f"{random.randint(100000, 999999)}"
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    db.query(VerificationCode).filter(
        VerificationCode.email == data.email, 
        VerificationCode.purpose == "reset_password"
    ).update({"used": True})
    
    v_code = VerificationCode(
        email=data.email,
        code=code,
        purpose="reset_password",
        expires_at=expires_at
    )
    db.add(v_code)
    db.commit()
    
    send_verification_code(data.email, code, "reset_password")
    return {"message": "Código de verificación enviado"}


@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    v_code = db.query(VerificationCode).filter(
        VerificationCode.email == data.email,
        VerificationCode.code == data.code,
        VerificationCode.purpose == "reset_password",
        VerificationCode.used == False,
        VerificationCode.expires_at > datetime.now(timezone.utc)
    ).first()
    
    if not v_code:
        raise HTTPException(status_code=400, detail="Código inválido o expirado")
    
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    user.hashed_password = hash_password(data.new_password)
    v_code.used = True
    db.commit()
    return {"message": "Contraseña actualizada correctamente"}


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


# Admin routes
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
