
import sys
import os
from sqlalchemy.orm import Session

# Add backend to path
sys.path.append('c:\\Users\\kikin\\Documents\\projectos\\LabBitacora\\backend')

from app.db.session import SessionLocal
from app.models.archivo import Archivo
from app.models.practica import Practica
from app.models.usuario import Usuario

def debug():
    db = SessionLocal()
    try:
        users = db.query(Usuario).all()
        print(f"--- Users ({len(users)}) ---")
        for u in users:
            print(f"User: {u.username} (ID: {u.id})")
            
        practicas = db.query(Practica).all()
        print(f"\n--- Practicas ({len(practicas)}) ---")
        for p in practicas:
            print(f"Practica: {p.titulo} (User ID: {p.usuario_id})")
            
        archivos = db.query(Archivo).all()
        print(f"\n--- Archivos ({len(archivos)}) ---")
        for a in archivos:
            print(f"Archivo: {a.nombre} (Practica ID: {a.practica_id})")
            
        # Check the join
        joined = db.query(Archivo).join(Practica).all()
        print(f"\n--- Joined Archivos ({len(joined)}) ---")
        for j in joined:
            print(f"Joined Archivo: {j.nombre} -> Practica: {j.practica.titulo}")
            
    finally:
        db.close()

if __name__ == "__main__":
    debug()
