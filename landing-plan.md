# Landing Page — LabBitácora

## Objetivo
Crear una landing page pública en `www.labbitacora.app` que reciba a usuarios nuevos antes de mostrar el login. La página debe ser coherente con la paleta visual existente de la app (púrpura, fondo negro, cards oscuras).

---

## Stack y contexto
- **Frontend:** Next.js + Tailwind CSS, desplegado en Vercel
- **Dominio:** `www.labbitacora.app`
- **Auth:** JWT (ya implementado)
- **Ruta actual del login:** `/login`
- **La landing vivirá en:** `/` (index)

---

## Paleta de colores (ya existente en la app)
```
Fondo:        #0a090f
Surface:      #111019
Borde:        #1c1a2e
Acento:       #a855f7  (púrpura)
Acento hover: #9333ea
Texto:        #e8e6f0
Muted:        #6b6880
```

---

## Estructura de la página

### 1. `<Navbar />`
- Logo "LabBitácora" a la izquierda con punto animado
- Botón ghost "Iniciar sesión" → `/login`
- Botón primario "Registrarse" → `/register`
- Fondo con `backdrop-blur` al hacer scroll

### 2. `<Hero />`
- Eyebrow: `BITÁCORA DE LABORATORIO DIGITAL`
- Título: `Documenta cada práctica con precisión.`
- Subtítulo: descripción breve de la app
- Botones: "Comenzar gratis →" `/register` | "Ver características" scroll a `#features`
- Mockup visual del dashboard (puede ser imagen screenshot o componente estático)

### 3. `<Features />` — id: `features`
- Grid de 3×2 con 6 features:
  1. CRUD completo de prácticas
  2. Archivos adjuntos (Cloudinary)
  3. Gráficas de datos (Recharts)
  4. Autenticación JWT por usuario
  5. Responsive / mobile-first
  6. Stack moderno (Next.js + FastAPI + PostgreSQL)

### 4. `<HowItWorks />`
- 4 pasos numerados a la izquierda
- Bloque decorativo tipo terminal a la derecha (estático, solo visual)

### 5. `<CTA />`
- Título: `Tu bitácora, siempre contigo.`
- Subtítulo: `Regístrate gratis y empieza a documentar hoy.`
- Botones: "Crear cuenta gratis →" | "Iniciar sesión"

### 6. `<Footer />`
- Logo + versión + dominio

---

## Archivos a crear / modificar

```
app/
├── page.tsx                  ← MODIFICAR: era redirect a /login, ahora es la landing
├── components/
│   └── landing/
│       ├── Navbar.tsx        ← CREAR
│       ├── Hero.tsx          ← CREAR
│       ├── Features.tsx      ← CREAR
│       ├── HowItWorks.tsx    ← CREAR
│       ├── CTA.tsx           ← CREAR
│       └── Footer.tsx        ← CREAR
```

---

## Comportamiento de rutas

| Ruta | Comportamiento |
|------|----------------|
| `/` | Landing page (pública) |
| `/login` | Formulario de login (ya existe) |
| `/register` | Formulario de registro (ya existe o pendiente) |
| `/dashboard` | Protegida — redirige a `/login` si no hay JWT |

> Si `app/page.tsx` tenía un `redirect('/login')`, reemplazarlo con el componente de landing.

---

## Notas de implementación
- Usar `next/link` para todos los botones de navegación, no `<a>` directos
- El mockup del Hero puede ser un `<Image>` con screenshot del dashboard real
- Animaciones de entrada con Tailwind (`animate-fade-in`) o Framer Motion si ya está instalado
- Los colores deben usar las mismas variables CSS o clases Tailwind que el resto de la app para consistencia
- La navbar debe detectar scroll para agregar `border-b` y `bg-opacity` dinámicamente (`useEffect` + `window.scrollY`)
