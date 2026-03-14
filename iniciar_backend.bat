@echo off
cd backend
echo 🚀 Iniciando Backend de LabBitácora...

if not exist venv (
    echo ❌ ERROR: No se encuentra la carpeta 'venv'. Asegurate de estar en la carpeta correcta.
    pause
    exit
)

venv\Scripts\python run.py
if %ERRORLEVEL% neq 0 (
    echo ❌ El servidor se ha detenido con un error.
    pause
)
