
import sys
import os
sys.path.append('c:\\Users\\kikin\\Documents\\projectos\\LabBitacora\\backend')
from app.db.session import SessionLocal
from app.models.archivo import Archivo
from app.schemas.archivo import ArchivoResponse
import json

def debug():
    db = SessionLocal()
    try:
        archivos = db.query(Archivo).all()
        for a in archivos:
            # Try to validate via Pydantic
            try:
                resp = ArchivoResponse.model_validate(a)
                print(f"VALID: {resp.model_dump_json()}")
            except Exception as e:
                print(f"INVALID: {a.nombre} - Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    debug()
