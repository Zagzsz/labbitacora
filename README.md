# 📓 LabBitácora

Bitácora digital para documentar prácticas y proyectos de laboratorio de ingeniería mecatrónica. Permite registrar procedimientos, mediciones, archivos adjuntos y notas por práctica, con un panel administrativo para gestionar usuarios.

> 🌐 **Demo en vivo**: [labbitacora.vercel.app](https://labbitacora.vercel.app/)

## ✨ Características

- 📝 Registro detallado de prácticas de laboratorio
- 📊 Tablas y gráficas de mediciones numéricas
- 📎 Subida de archivos (fotos, PDFs) vía Cloudinary
- 👥 Sistema multi-usuario con roles (Admin / Usuario)
- 🔐 Autenticación con JWT
- 🛡️ Panel administrativo para gestión de cuentas

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React + Vite |
| Backend | Python · FastAPI |
| Base de datos | PostgreSQL (Aiven) |
| Archivos | Cloudinary |
| Deploy | Render |

## 🚀 Configuración Local

### Prerrequisitos

- Python 3.11+
- Node.js 18+
- Una base de datos PostgreSQL (local o remota)
- Cuenta en Cloudinary

### Backend

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env  # editar con tus credenciales

# Ejecutar migraciones
alembic upgrade head

# Iniciar servidor
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install

# Configurar la URL del backend
cp .env.example .env  # editar VITE_API_URL

npm run dev
```

## 🔑 Variables de Entorno (Backend)

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | URL de conexión a PostgreSQL |
| `SECRET_KEY` | Clave secreta para firmar JWT |
| `ALGORITHM` | Algoritmo JWT (ej. `HS256`) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Duración del token de acceso |
| `CLOUDINARY_CLOUD_NAME` | Nombre del cloud en Cloudinary |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary |
| `ADMIN_USERNAME` | Nombre del usuario administrador inicial |
| `ADMIN_PASSWORD` | Contraseña del administrador inicial |
| `FRONTEND_URL` | URL del frontend (para CORS) |

## 📁 Estructura del Proyecto

```
LabBitacora/
├── backend/           # FastAPI + SQLAlchemy
│   ├── app/
│   │   ├── api/       # Rutas y dependencias
│   │   ├── core/      # Seguridad, config, email
│   │   ├── db/        # Sesión y seed inicial
│   │   ├── models/    # Modelos SQLAlchemy
│   │   └── schemas/   # Esquemas Pydantic
│   └── alembic/       # Migraciones de base de datos
├── frontend/          # React + Vite
│   └── src/
│       ├── api/       # Configuración de Axios
│       ├── components/# Componentes reutilizables
│       ├── context/   # Contextos (Auth)
│       └── pages/     # Páginas de la aplicación
└── render.yaml        # Configuración de despliegue en Render
```

## 🌐 Despliegue en Render

El archivo `render.yaml` describe la configuración del servicio. Para desplegar:

1. Conecta el repositorio en [render.com](https://render.com).
2. Configura las variables de entorno listadas arriba en el panel de Render.
3. Render ejecutará automáticamente el build y el servidor.

> **Nota**: Las migraciones de base de datos se deben ejecutar manualmente desde la Shell del servicio en Render con `alembic upgrade head`, o puedes añadirlo al comando de inicio.

---

*Proyecto personal · Ingeniería Mecatrónica*
