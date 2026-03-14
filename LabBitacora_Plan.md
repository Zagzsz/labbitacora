# 📋 LabBitácora — Plan Completo de Proyecto

## 🧠 Contexto del Proyecto

Construir una aplicación web personal llamada **LabBitácora**, una bitácora digital para documentar prácticas y proyectos de laboratorio de ingeniería mecatrónica. El usuario es el único que usará la app (no hay sistema de registro público). La app debe ser ligera para poder deployarse en servidores gratuitos con ~512MB RAM.

---

## 🏗️ Stack Tecnológico

### Frontend
- **Vite + React** (el usuario ya tiene experiencia con este setup)
- **Tailwind CSS** para estilos
- **React Router v6** para navegación
- **Recharts** para gráficas de mediciones
- **React Hook Form** para formularios
- **Axios** para llamadas a la API

### Backend
- **Python 3.11+**
- **FastAPI** como framework principal
- **SQLAlchemy** como ORM
- **Alembic** para migraciones de base de datos
- **Python-Jose** para JWT auth
- **Passlib + bcrypt** para hashing de contraseñas
- **Cloudinary SDK** para manejo de archivos
- **Uvicorn** como servidor ASGI

### Base de Datos
- **PostgreSQL** en Aiven (free tier) — el usuario ya tiene cuenta

### Almacenamiento de Archivos
- **Cloudinary** (free tier) para fotos y PDFs
- El backend NUNCA almacena archivos localmente, solo recibe el archivo, lo sube a Cloudinary y guarda la URL en PostgreSQL

### Deploy
- **Render** para backend y frontend (el usuario ya tiene cuenta)
- Variables de entorno para todas las credenciales

---

## 📁 Estructura de Carpetas

```
labbitacora/
├── frontend/                        # Proyecto Vite + React
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js             # Instancia de Axios con baseURL y JWT interceptor
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── Practica/
│   │   │   │   ├── PracticaCard.jsx      # Tarjeta resumen en la lista
│   │   │   │   ├── PracticaForm.jsx      # Formulario crear/editar
│   │   │   │   ├── MedicionesTabla.jsx   # Tabla de datos numéricos
│   │   │   │   └── MedicionesGrafica.jsx # Gráfica Recharts
│   │   │   ├── Archivos/
│   │   │   │   ├── SubirArchivo.jsx      # Dropzone para fotos y PDFs
│   │   │   │   └── ArchivoPreview.jsx    # Preview de imagen o ícono PDF
│   │   │   └── UI/
│   │   │       ├── Button.jsx
│   │   │       ├── Input.jsx
│   │   │       ├── Modal.jsx
│   │   │       └── Badge.jsx             # Para etiquetas/tags
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx             # Lista de todas las prácticas
│   │   │   ├── PracticaDetalle.jsx       # Vista completa de una práctica
│   │   │   ├── PracticaNueva.jsx         # Crear práctica
│   │   │   └── PracticaEditar.jsx        # Editar práctica existente
│   │   ├── context/
│   │   │   └── AuthContext.jsx           # Estado global de autenticación
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── usePracticas.js
│   │   ├── utils/
│   │   │   └── formatters.js             # Formatear fechas, unidades, etc.
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env                          # VITE_API_URL=...
│   ├── vite.config.js
│   └── package.json
│
├── backend/                          # Proyecto FastAPI
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── auth.py           # POST /auth/login, POST /auth/me
│   │   │   │   ├── practicas.py      # CRUD de prácticas
│   │   │   │   ├── archivos.py       # Upload y delete de archivos
│   │   │   │   └── mediciones.py     # CRUD de mediciones por práctica
│   │   │   └── deps.py               # Dependency: get_current_user
│   │   ├── core/
│   │   │   ├── config.py             # Settings con pydantic-settings (.env)
│   │   │   ├── security.py           # Crear/verificar JWT, hashear password
│   │   │   └── cloudinary.py         # Configuración y funciones de Cloudinary
│   │   ├── db/
│   │   │   ├── base.py               # Base de SQLAlchemy
│   │   │   ├── session.py            # Engine y SessionLocal
│   │   │   └── init_db.py            # Crear usuario admin inicial
│   │   ├── models/                   # Modelos SQLAlchemy (tablas)
│   │   │   ├── usuario.py
│   │   │   ├── practica.py
│   │   │   ├── archivo.py
│   │   │   └── medicion.py
│   │   ├── schemas/                  # Schemas Pydantic (validación)
│   │   │   ├── auth.py
│   │   │   ├── practica.py
│   │   │   ├── archivo.py
│   │   │   └── medicion.py
│   │   └── main.py                   # App FastAPI, CORS, routers
│   ├── alembic/                      # Migraciones
│   ├── .env                          # Variables de entorno (ver sección abajo)
│   ├── requirements.txt
│   └── alembic.ini
│
└── README.md
```

---

## 🗄️ Modelos de Base de Datos

### Tabla: `usuarios`
```
id              UUID        PK
username        VARCHAR     UNIQUE NOT NULL
hashed_password VARCHAR     NOT NULL
created_at      TIMESTAMP   DEFAULT NOW()
```

### Tabla: `practicas`
```
id              UUID        PK
usuario_id      UUID        FK → usuarios.id
titulo          VARCHAR     NOT NULL
materia         VARCHAR     NOT NULL
fecha           DATE        NOT NULL
descripcion     TEXT        (Markdown)
objetivo        TEXT        (Markdown)
conclusion      TEXT        (Markdown)
etiquetas       ARRAY[TEXT] (ej: ["PLC", "Hidráulica"])
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### Tabla: `archivos`
```
id              UUID        PK
practica_id     UUID        FK → practicas.id
nombre          VARCHAR     NOT NULL
tipo            VARCHAR     NOT NULL   -- "imagen" | "pdf"
url_cloudinary  VARCHAR     NOT NULL
public_id       VARCHAR     NOT NULL   -- para poder eliminarlo de Cloudinary
tamaño_kb       INTEGER
created_at      TIMESTAMP
```

### Tabla: `mediciones`
```
id              UUID        PK
practica_id     UUID        FK → practicas.id
nombre_variable VARCHAR     NOT NULL   -- ej: "Voltaje", "Presión", "RPM"
unidad          VARCHAR     NOT NULL   -- ej: "V", "PSI", "rpm"
valores         ARRAY[FLOAT] NOT NULL  -- lista de lecturas
timestamps      ARRAY[FLOAT] (opcional, para el eje X de la gráfica)
notas           TEXT
created_at      TIMESTAMP
```

---

## 🔌 Endpoints de la API

### Auth
```
POST   /api/auth/login          # { username, password } → { access_token, token_type }
GET    /api/auth/me             # → datos del usuario actual (requiere JWT)
```

### Prácticas
```
GET    /api/practicas           # Lista todas las prácticas del usuario
POST   /api/practicas           # Crear nueva práctica
GET    /api/practicas/{id}      # Obtener práctica con archivos y mediciones
PUT    /api/practicas/{id}      # Editar práctica
DELETE /api/practicas/{id}      # Eliminar práctica (y sus archivos de Cloudinary)
```

### Archivos
```
POST   /api/practicas/{id}/archivos         # Subir archivo (form-data: file)
DELETE /api/archivos/{archivo_id}           # Eliminar archivo (también en Cloudinary)
```

### Mediciones
```
POST   /api/practicas/{id}/mediciones       # Agregar set de mediciones
PUT    /api/mediciones/{medicion_id}        # Editar medición
DELETE /api/mediciones/{medicion_id}        # Eliminar medición
```

---

## 🔐 Autenticación

- JWT con expiración de 7 días
- El token se guarda en `localStorage` en el frontend
- Axios interceptor agrega `Authorization: Bearer <token>` en cada request automáticamente
- Si el token expira, redirigir automáticamente a `/login`
- Solo existe UN usuario (el dueño de la app), creado mediante `init_db.py` con credenciales desde `.env`

---

## ☁️ Flujo de Subida de Archivos

```
1. Usuario selecciona archivo en el frontend (foto o PDF)
2. Frontend hace POST /api/practicas/{id}/archivos con form-data
3. Backend recibe el archivo en memoria (no lo guarda en disco)
4. Backend sube el archivo a Cloudinary usando el SDK
5. Cloudinary retorna { url, public_id }
6. Backend guarda { url, public_id, nombre, tipo } en tabla archivos de PostgreSQL
7. Backend retorna el objeto archivo creado al frontend
8. Frontend muestra preview de la imagen o ícono de PDF con link
```

Para eliminar:
```
1. Frontend hace DELETE /api/archivos/{id}
2. Backend busca el archivo en BD, obtiene public_id
3. Backend llama cloudinary.uploader.destroy(public_id)
4. Backend elimina el registro de la BD
```

---

## 🎨 Diseño UI/UX

### Paleta de colores sugerida
- Fondo: `#0f172a` (slate-900, dark mode)
- Superficie: `#1e293b` (slate-800)
- Acento principal: `#38bdf8` (sky-400, azul eléctrico)
- Acento secundario: `#a78bfa` (violet-400)
- Texto: `#f1f5f9` (slate-100)
- Texto secundario: `#94a3b8` (slate-400)

### Páginas y comportamiento

**`/login`**
- Formulario centrado con username y password
- Al hacer login exitoso → redirigir a `/dashboard`

**`/dashboard`**
- Grid de PracticaCards ordenadas por fecha (más reciente primero)
- Barra de búsqueda por título o materia
- Filtro por etiqueta
- Botón flotante `+` para crear nueva práctica

**`/practicas/nueva`**
- Formulario en pasos o scroll:
  1. Info básica: título, materia, fecha, etiquetas
  2. Descripción y objetivo (textarea Markdown)
  3. Conclusión (textarea Markdown)
- Al guardar → redirigir a `/practicas/{id}`

**`/practicas/{id}`**
- Header con título, materia, fecha y etiquetas
- Secciones: Descripción → Objetivo → Archivos → Mediciones → Conclusión
- Archivos mostrados en grid: fotos con preview, PDFs con ícono + nombre clickeable
- Mediciones en tabla + gráfica de líneas (Recharts) por cada set
- Botones editar y eliminar en el header

**`/practicas/{id}/editar`**
- Mismo formulario de crear pero precargado con los datos existentes

---

## 📊 Componente de Mediciones

La tabla de mediciones permite al usuario registrar lecturas de sensores u otras variables:

```
Ejemplo de uso real:
- Proyecto bomba de agua:
  Variable: "Presión de salida"
  Unidad: "PSI"
  Valores: [0, 12, 23, 31, 38, 42, 43]

- Proyecto PLC:
  Variable: "Tiempo de ciclo"
  Unidad: "ms"
  Valores: [120, 118, 122, 119, 121]
```

La gráfica usa Recharts `<LineChart>` con:
- Eje X: índice de muestra (o timestamp si se provee)
- Eje Y: valor numérico con unidad en el label
- Línea suave con puntos visibles
- Tooltip al hover

---

## ⚙️ Variables de Entorno

### Backend (`.env`)
```env
# Base de datos
DATABASE_URL=postgresql://usuario:password@host:puerto/labbitacora

# JWT
SECRET_KEY=una_clave_secreta_larga_y_aleatoria
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Usuario admin inicial
ADMIN_USERNAME=tu_usuario
ADMIN_PASSWORD=tu_password_segura

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:8000/api
```

---

## 📦 Dependencias

### Backend (`requirements.txt`)
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
sqlalchemy==2.0.30
alembic==1.13.1
psycopg2-binary==2.9.9
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.9
cloudinary==1.40.0
pydantic-settings==2.2.1
```

### Frontend (`package.json` dependencies)
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.23.0",
  "axios": "^1.7.0",
  "recharts": "^2.12.0",
  "react-hook-form": "^7.51.0",
  "react-dropzone": "^14.2.3",
  "@tailwindcss/typography": "^0.5.13"
}
```

---

## 🚀 Orden de Implementación Recomendado

### Semana 1 — Base y Auth
1. Inicializar proyecto Vite y FastAPI
2. Configurar PostgreSQL (Aiven) y Cloudinary
3. Crear modelos SQLAlchemy y correr migraciones con Alembic
4. Implementar endpoint de login y JWT
5. Crear `init_db.py` para generar el usuario admin
6. Implementar `AuthContext` y página de Login en el frontend
7. Probar login completo end-to-end

### Semana 2 — CRUD de Prácticas
1. Implementar endpoints CRUD de prácticas en el backend
2. Crear Dashboard con lista de prácticas (datos mock primero)
3. Crear formulario de nueva práctica
4. Conectar Dashboard y formulario con la API real
5. Implementar página de detalle de práctica

### Semana 3 — Archivos y Mediciones
1. Implementar endpoint de subida de archivos con Cloudinary
2. Crear componente `SubirArchivo.jsx` con drag & drop
3. Mostrar archivos en la vista de detalle (fotos + PDFs)
4. Implementar endpoints de mediciones
5. Crear tabla de mediciones y gráfica con Recharts

### Semana 4 — Polish y Deploy
1. Implementar búsqueda y filtros en el Dashboard
2. Editar y eliminar prácticas con confirmación
3. Ajustes de UI/UX, responsive, animaciones sutiles
4. Deploy del backend en Render
5. Deploy del frontend en Render (o Vercel)
6. Configurar variables de entorno en producción
7. Pruebas finales end-to-end

---

## 🎨 Sistema de Diseño UI

### Estética general
Inspirada en herramientas como **Linear, Vercel y Raycast**: dark mode refinado, espaciado generoso, tipografía limpia, acentos en índigo suave. Sin efectos llamativos — elegancia por precisión.

### Fuentes
```
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

- UI general:      Inter (300, 400, 500, 600)
- Valores / chips: JetBrains Mono (400, 500)
```

### Paleta de colores (variables CSS)
```css
:root {
  --bg-root:       #0c0c10;   /* fondo global */
  --bg-surface:    #0e0e14;   /* sidebar, cards */
  --bg-input:      #0c0c10;   /* inputs, textareas */
  --bg-elevated:   #18182a;   /* hover states, chips */

  --border:        #1a1a24;   /* bordes normales */
  --border-subtle: #1e1e2c;   /* bordes inputs */

  --accent:        #818cf8;   /* índigo — acción principal */
  --accent-dim:    #818cf812; /* fondos de acento */
  --accent-ring:   rgba(129,140,248,0.15); /* focus ring */

  --text-primary:  #f0f0fa;   /* títulos */
  --text-body:     #d8d8e8;   /* texto normal */
  --text-muted:    #8888a0;   /* labels */
  --text-faint:    #3a3a52;   /* placeholders, hints */

  --success:       #22c55e;
  --danger:        #f87171;
}
```

### Tokens de espaciado y radio
```
Radios:    inputs/botones → 8px | cards → 12px | pills/tags → 20px
Padding:   inputs → 9px 12px | cards → 24px | sidebar → 16px 10px
Gap grid:  formularios → 16px | secciones → 20-24px
```

### Componentes base reutilizables

**Input / Textarea / Select** — mismos estilos base:
```css
background: var(--bg-input);
border: 1px solid var(--border-subtle);
border-radius: 8px;
color: var(--text-body);
font-size: 13px;
padding: 9px 12px;
transition: border-color 0.15s, box-shadow 0.15s;

:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-ring);
  outline: none;
}
```

**Botón primario:**
```css
background: #818cf8;
border: none;
border-radius: 8px;
color: #fff;
font-size: 13px;
font-weight: 500;
padding: 8px 20px;
box-shadow: 0 1px 3px rgba(0,0,0,0.4);
```

**Botón secundario:**
```css
background: transparent;
border: 1px solid var(--border-subtle);
border-radius: 8px;
color: #6a6a88;
```

**Tag / Pill inactivo:**
```css
border: 1px solid var(--border-subtle);
border-radius: 20px;
color: #5a5a78;
font-size: 12px;
padding: 3px 12px;
```

**Tag / Pill activo:**
```css
border: 1px solid #818cf860;
color: #c7d2fe;
background: #818cf812;
```

**Chip de valor numérico** (JetBrains Mono):
```css
background: #18182a;
border-radius: 5px;
color: #7878a0;
font-size: 11px;
padding: 2px 8px;
font-family: 'JetBrains Mono', monospace;
```

---

## ✨ Animaciones — Guía de Implementación

Usar **Framer Motion** (`framer-motion`) como librería de animaciones. Ligera, declarativa y compatible con React.

```bash
npm install framer-motion
```

### Principios
- Las animaciones deben sentirse **funcionales**, no decorativas
- Duración corta: entre `0.15s` y `0.35s` para la mayoría de transiciones
- Easing suave: `ease: [0.16, 1, 0.3, 1]` (spring-like) para entradas
- **Nunca** animar cosas que el usuario no inició (evitar loops infinitos en UI)

### Animaciones por componente

#### 1. Entrada de página (fade + slide sutil)
Envuelve cada `<Page />` con esto:
```jsx
import { motion } from "framer-motion";

const pageVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -4, transition: { duration: 0.15 } },
};

// En cada página:
<motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit">
  {/* contenido */}
</motion.div>
```

#### 2. Dashboard — Cards con stagger (aparecen en cascada)
```jsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const cardVariant = {
  hidden:  { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

<motion.div variants={container} initial="hidden" animate="visible" style={gridStyle}>
  {practicas.map(p => (
    <motion.div key={p.id} variants={cardVariant}>
      <PracticaCard practica={p} />
    </motion.div>
  ))}
</motion.div>
```

#### 3. Steps del formulario — Transición entre pasos
```jsx
import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence mode="wait">
  <motion.div
    key={step}
    initial={{ opacity: 0, x: 12 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -12 }}
    transition={{ duration: 0.2, ease: "easeInOut" }}
  >
    {/* contenido del step actual */}
  </motion.div>
</AnimatePresence>
```

#### 4. Tags — Aparecen con spring al seleccionarse
```jsx
<AnimatePresence>
  {form.etiquetas.map(tag => (
    <motion.span
      key={tag}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {tag} <button onClick={() => removeTag(tag)}>×</button>
    </motion.span>
  ))}
</AnimatePresence>
```

#### 5. Sets de mediciones — Entrada con slide
```jsx
<AnimatePresence>
  {form.mediciones.map((m, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <MedicionItem medicion={m} />
    </motion.div>
  ))}
</AnimatePresence>
```

#### 6. Botón "Guardado" — Micro-feedback
```jsx
<motion.button
  onClick={handleSave}
  animate={saved ? { scale: [1, 0.96, 1] } : {}}
  transition={{ duration: 0.2 }}
  style={{ background: saved ? "#22c55e" : "#818cf8" }}
>
  {saved ? "✓ Guardado" : "Guardar práctica"}
</motion.button>
```

#### 7. Sidebar nav items — Hover con layout shift suave
```jsx
<motion.div
  whileHover={{ x: 2 }}
  transition={{ duration: 0.1 }}
>
  {navItem}
</motion.div>
```

#### 8. Empty state — Entrada con bounce sutil
```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  {/* ícono y texto del empty state */}
</motion.div>
```

---

## 📝 Notas Importantes para el Desarrollo

1. **CORS:** Configurar `CORSMiddleware` en FastAPI para permitir el origen del frontend tanto en local como en producción
2. **UUIDs:** Usar `uuid4()` como PK en todos los modelos para evitar IDs predecibles
3. **Archivos:** Nunca guardar archivos en el filesystem del servidor — Render tiene almacenamiento efímero (se borra al redeploy). Siempre usar Cloudinary
4. **Etiquetas:** Guardar como array de texto en PostgreSQL (`ARRAY` type en SQLAlchemy con `postgresql.ARRAY(String)`)
5. **Markdown:** En el frontend renderizar el contenido Markdown con la librería `react-markdown`
6. **Fechas:** Manejar todas las fechas en UTC en el backend, formatear localmente en el frontend
7. **Validación:** Usar schemas Pydantic en el backend para toda validación de entrada — nunca confiar en datos del cliente
