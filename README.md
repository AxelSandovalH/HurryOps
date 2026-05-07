# HurryOps

**Sistema de gestión logística para el corredor EE.UU. → México**

HurryOps centraliza la operación de empresas de paquetería que mueven envíos entre Estados Unidos y México. Desde la captura del paquete hasta la entrega al destinatario, todo en un solo portal — sin hojas de cálculo, sin WhatsApp, sin caos.

---

## El problema que resuelve

Coordinar envíos internacionales con múltiples agencias físicas en dos países es operativamente complejo. Los operadores logísticos pierden visibilidad del paquete, los clientes no saben dónde está su envío, y el seguimiento termina siendo una cadena interminable de mensajes.

HurryOps reemplaza ese flujo con un sistema estructurado: guías automáticas, estados rastreables y un portal público para el destinatario final.

---

## Para quién es

| Rol | Qué hace en HurryOps |
|---|---|
| **Operador logístico** | Administra todas las agencias, visualiza el flujo completo de envíos |
| **Agencia asociada** | Captura envíos, actualiza estados, gestiona su operación de forma aislada |
| **Chofer** | Registra la entrega en campo |
| **Destinatario final** | Rastrea su paquete por número de guía sin necesidad de crear cuenta |

---

## Funcionalidades principales

- **Captura de envíos** con generación automática de número de guía (`HURRY-20260507-XXXXX`)
- **Rastreo en tiempo real** con historial de estados: Recibido → En tránsito → En ruta → Entregado
- **Portal multi-agencia** con aislamiento de datos por agencia
- **Página pública de rastreo** por número de guía, sin login requerido
- **Roles diferenciados**: Administrador, Agencia y Chofer
- **Autenticación segura** con Google OAuth vía Supabase

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend / Backend | Next.js 14 (App Router) + TypeScript |
| Estilos | Tailwind CSS v3 |
| Auth | Supabase Auth + Google OAuth |
| Base de datos | PostgreSQL (Supabase) vía Prisma ORM |
| Deploy | Vercel / cualquier hosting Node.js |

---

## Estructura del proyecto

```
hurryops/
├── app/                  # App Router de Next.js
│   ├── (auth)/           # Rutas de autenticación
│   ├── (dashboard)/      # Portal de operador y agencias
│   ├── track/            # Página pública de rastreo
│   └── api/              # API Routes
├── components/           # Componentes reutilizables
├── lib/                  # Supabase client, Prisma, utilidades
├── prisma/               # Schema y migraciones
└── public/               # Assets estáticos
```

---

## Inicio rápido

```bash
# Clonar el repositorio
git clone git@github.com:AxelSandovalH/HurryOps.git
cd HurryOps

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Ejecutar migraciones
npx prisma migrate dev

# Iniciar servidor de desarrollo
npm run dev
```

---

## Variables de entorno requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
DIRECT_URL=
```

---

## Corredor de operación

```
[Agencia en EE.UU.]
       ↓  captura envío + genera guía
[HurryOps Dashboard]
       ↓  actualización de estados en tránsito
[Agencia en México]
       ↓  asigna chofer + entrega
[Destinatario final]
       ↓  rastrea en hurryops.com/track/HURRY-XXXXX
```

---

## Licencia

Propietario — todos los derechos reservados © 2026 HurryOps
