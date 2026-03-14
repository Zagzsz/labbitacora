
import sys
import os
sys.path.append('c:\\Users\\kikin\\Documents\\projectos\\LabBitacora\\backend')
from app.db.session import SessionLocal
from app.models.archivo import Archivo
from app.models.practica import Practica

def debug():
    db = SessionLocal()
    try:
        archivos = db.query(Archivo).all()
        print(f"TOTAL_ARCHIVOS_IN_DB: {len(archivos)}")
        for a in archivos:
            print(f"FILE: {a.nombre} | PRACTICA_ID: {a.practica_id} | USER_ID: {a.practica.usuario_id if a.practica else 'NONE'}")
            
        practicas = db.query(Practica).all()
        print(f"TOTAL_PRACTICAS_IN_DB: {len(practicas)}")
        for p in practicas:
            print(f"PRACTICA: {p.titulo} | FILES_COUNT: {len(p.archivos)}")
    finally:
        db.close()

if __name__ == "__main__":
    debug()
