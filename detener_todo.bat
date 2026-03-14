@echo off
echo 🛑 Deteniendo servicios de LabBitácora...

echo.
echo ⏳ Cerrando procesos de Python (Backend/Uvicorn)...
taskkill /F /IM python.exe /T 2>nul
taskkill /F /IM uvicorn.exe /T 2>nul

echo.
echo ⏳ Cerrando procesos de Node (Frontend/Vite)...
taskkill /F /IM node.exe /T 2>nul

echo.
echo ⏳ Cerrando ventanas de comandos (Terminales)...
taskkill /F /IM cmd.exe /FI "WINDOWTITLE ne Administrador:  Deteniendo servicios de LabBitacora" 2>nul

echo.
echo ✅ ¡Todos los servicios y terminales han sido cerrados!
echo Esta ventana se cerrará en 3 segundos...
timeout /t 3 >nul
exit
