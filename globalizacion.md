# Fase 5: LabBitácora Global — De Diario Estudiantil a Plataforma de Investigación

Este plan transforma a **LabBitácora** en una herramienta versátil para cualquier disciplina científica e ingeniería, eliminando la dependencia de campos rígidos y permitiendo la colaboración organizada.

## User Review Required

> [!IMPORTANT]
> **Cambio de Arquitectura de Datos**: Introduciremos "Proyectos" como contenedores principales. Esto significa que una práctica ya no solo pertenecerá a un usuario, sino a un proyecto (donde puede haber varios usuarios).

> [!TIP]
> **Universalidad**: La idea de "Plantillas" permitirá que tú definas qué campos quieres llenar (ej: "Hipótesis", "Metodología", "Resultados RAW") en lugar de estar limitado a "Objetivo" y "Conclusión".

## Proposed Changes

### 1. Sistema de Proyectos y Colaboración (Workspaces)
Permite que grupos de estudio o laboratorios trabajen juntos.

- **[NEW] [proyecto.py](file:///c:/Users/kikin/Documents/projectos/LabBitacora/backend/app/models/proyecto.py)**: Modelo de `Proyecto` (nombre, descripción, dueño).
- **[NEW] [proyecto_miembro.py](file:///c:/Users/kikin/Documents/projectos/LabBitacora/backend/app/models/proyecto_miembro.py)**: Tabla intermedia para la relación muchos-a-muchos entre `Usuarios` y `Proyectos`.
- **[MODIFY] [practica.py](file:///c:/Users/kikin/Documents/projectos/LabBitacora/backend/app/models/practica.py)**: Agregar `proyecto_id` (FK) y campo `is_public` (bool).

---

### 2. Plantillas Dinámicas (Custom Templates)
Para que LabBitácora sirva tanto para un químico como para un desarrollador de software.

- **[NEW] [plantilla.py](file:///c:/Users/kikin/Documents/projectos/LabBitacora/backend/app/models/plantilla.py)**: Modelo para guardar campos personalizados (nombre del campo, tipo de dato).
- **[MODIFY] [practica.py](file:///c:/Users/kikin/Documents/projectos/LabBitacora/backend/app/models/practica.py)**: Permitir que los campos de texto (`objetivo`, `conclusion`, etc.) sean dinámicos mediante una columna tipo JSONB (PostgreSQL).

---

### 3. Portafolio Público y Compartición
- **[MODIFY] [practicas.py (API)](file:///c:/Users/kikin/Documents/projectos/LabBitacora/backend/app/api/routes/practicas.py)**: Nuevo endpoint `GET /public/practica/{id}` que permite ver una práctica sin iniciar sesión (si está marcada como `is_public`).
- **[NEW] [ExportPDFService] (Frontend)**: Implementar una vista de impresión optimizada (`Scientific Layout`) para generar PDFs profesionales listos para entregarse.

---

### 4. UI/UX (Inspiración Stitch)
- **Dashboard Global**: Una vista donde puedas ver tus Proyectos en lugar de solo una lista plana de prácticas.
- **Project Detail**: Una vista que agrupe todas las prácticas, mediciones y archivos de un proyecto específico.

## Verification Plan

### Manual Verification
1.  **Crear Proyecto**: Verificar que un usuario pueda crear su primer "Proyecto de Investigación".
2.  **Invitación**: Simular que el admin invita a otro usuario al proyecto.
3.  **Compartir Link**: Generar un enlace público de una práctica y verificar que se pueda ver en modo incógnito.
4.  **Generar PDF**: Validar que el botón de exportación genere un documento con formato académico.

---
**Nota**: Este plan es ambicioso y modular. Podemos empezar por los **Proyectos** y el **Portafolio Público** para ver resultados rápidos.
