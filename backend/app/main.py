from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler

from app.core.config import get_settings
from app.db.base import Base
from app.db.session import engine
from app.db.init_db import init_db
from app.api.routes import auth, practicas, archivos, mediciones, proyectos, plantillas
from app.core.limiter import limiter

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Tables are now managed by Alembic
    # init_db() ensures the initial admin user exists
    init_db()
    yield


app = FastAPI(
    title="LabBitácora API",
    description="API para bitácora digital de prácticas de laboratorio",
    version="1.0.0",
    lifespan=lifespan,
)

# Rate Limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS
origins = [
    settings.FRONTEND_URL,
    "https://www.labbitacora.app",
    "https://www.labbitacora.vercel.app",
    "https://labbitacora.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://192.168.100.34:5173",  # Para acceso desde la red local
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o for o in origins if o],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers under /api
app.include_router(auth.router, prefix="/api")
app.include_router(practicas.router, prefix="/api")
app.include_router(archivos.router, prefix="/api")
app.include_router(mediciones.router, prefix="/api")
app.include_router(proyectos.router, prefix="/api")
app.include_router(plantillas.router, prefix="/api")


@app.api_route("/", methods=["GET", "HEAD"])
def root():
    return {"message": "LabBitácora API v1.0.0"}
