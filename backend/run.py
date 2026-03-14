import uvicorn
import os
from dotenv import load_dotenv

if __name__ == "__main__":
    # Cargar variables de entorno del archivo .env
    load_dotenv()
    
    print("🚀 Iniciando servidor de LabBitácora...")
    # Ejecutar uvicorn de forma programática
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )
