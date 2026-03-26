from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass

# Importar todos los modelos para que Alembic los detecte
from app.models.usuario import Usuario
from app.models.practica import Practica
from app.models.proyecto import Proyecto, ProyectoMiembro
from app.models.archivo import Archivo
from app.models.medicion import Medicion
from app.models.plantilla import Plantilla
