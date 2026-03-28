# 📓 LabBitácora CORE

Sistema de gestión de investigación digital y bitácora técnica para ingeniería. Diseñado para documentar prácticas de laboratorio, proyectos y experimentos con una estética premium y un enfoque **Mobile-First**.

> 🌐 **Web**: [www.labbitacora.app](https://www.labbitacora.app)  
> 📱 **Optimizado para iOS/iPhone & Android**

## ✨ Características Premium

- 📱 **Diseño Responsivo Total**: Interfaz fluida adaptada a dispositivos móviles con layouts dinámicos y navegación optimizada.
- 📊 **Telemetría Interactiva**: Gráficas de líneas dinámicas utilizando **Recharts** para visualización de mediciones experimentales.
- 📎 **Bóveda de Evidencias Pro**: Gestión avanzada de archivos (imágenes, videos, PDFs) con previsualización integrada y soporte para video.
- 🌐 **Acceso Público Controlado**: Generación de reportes técnicos vía enlaces públicos para visualización externa sin necesidad de cuenta.
- 📋 **Protocolos de Investigación**: Sistema de plantillas con campos dinámicos para estandarizar el registro según la disciplina (PLC, Programación, etc.).
- 👥 **Gestión Multi-Usuario**: Roles de Administrador y Usuario con control de acceso por JWT.

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Frontend** | React + Vite + Framer Motion (Animaciones) |
| **Backend** | Python · FastAPI |
| **Visualización** | Recharts (Telemetría de Datos) |
| **DB** | PostgreSQL (Aiven) |
| **Storage** | Cloudinary |
| **Deploy** | Render |

## 🚀 Instalación y Configuración Local

### Prerrequisitos
- **Python 3.11+**
- **Node.js 18+**
- PostgreSQL (Instancia activa)

### 1. Backend
```bash
cd backend
python -m venv venv
# Activar venv (Windows: venv\Scripts\activate | Unix: source venv/bin/activate)
pip install -r requirements.txt
cp .env.example .env  # Configurar con tus credenciales
alembic upgrade head
uvicorn app.main:app --reload
```

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env  # Configurar VITE_API_URL
npm run dev
```

## 🔑 Variables de Entorno (Requeridas)

| Variable | Propósito |
|---|---|
| `DATABASE_URL` | String de conexión a PostgreSQL |
| `SECRET_KEY` | Semilla para firmado de tokens JWT |
| `ALGORITHM` | Algoritmo JWT (ej. `HS256`) |
| `CLOUDINARY_URL` | Configuración base de Cloudinary |
| `ADMIN_USERNAME/PASSWORD` | Credenciales del primer superusuario |
| `FRONTEND_URL` | URL de origen permitida en CORS |

## 📂 Arquitectura de Bitácora
```
LabBitacora/
├── backend/           # Lógica Core (FastAPI + SQLAlchemy)
│   ├── alembic/       # Migraciones y Control de Esquemas
│   └── app/api        # Endpoints (Prácticas, Proyectos, Plantillas)
├── frontend/          # Interfaz Premium (React)
│   ├── src/hooks      # useMobile y lógica de estado
│   └── src/pages      # Dashboards y Vistas de Investigación
└── render.yaml        # Blueprint de Despliegue en la Nube
```

## 🔐 Seguridad e Higiene
El repositorio cuenta con políticas estrictas de ignorado para prevenir fugas de secretos (`.env`) y archivos de sistema (`.DS_Store`, `venv`). Todas las credenciales deben gestionarse a través del panel de configuración de Render o variables de sistema.

---
*Plataforma de Ingeniería Mecatrónica · Gestión de Datos Científicos*
