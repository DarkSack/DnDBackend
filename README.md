# 🐉 DnD Backend

Backend para una **plataforma web de mesas de rol** (Dungeons & Dragons y sistemas afines). Los jugadores pueden registrarse, crear personajes, unirse a salas de juego, agregar amigos y disfrutar de experiencias narrativas asistidas con IA.

Construido sobre **Next.js API Routes** con **Supabase** como base de datos y **Groq / Replicate** para generación de texto e imagen.

---

## ✨ Características

- 🔐 **Autenticación** con JWT (registro / login / refresh)
- 🧙 **Gestión de personajes** — creación, edición, historial y hojas de personaje
- 🏰 **Sistema de salas** — crear salas privadas o públicas, invitar y unirse
- 👥 **Amigos y social** — invitaciones, lista de amigos, estado en línea
- 🤖 **Integración con IA** — generación de descripciones, retratos e historias vía **Groq** + **Replicate**
- 🛡️ **Rate limiting** con `rate-limiter-flexible`
- 🌐 **CORS** configurable para conectar cualquier frontend

---

## 🧱 Stack Tecnológico

| Capa       | Tecnología                                |
| ---------- | ----------------------------------------- |
| Framework  | Next.js 15 (App/Pages Router) + React 19  |
| Runtime    | Node.js                                   |
| Base datos | Supabase (PostgreSQL)                     |
| Auth       | JWT                                       |
| IA         | Groq SDK · Replicate                      |
| Seguridad  | rate-limiter-flexible · CORS              |
| Lenguaje   | TypeScript + JavaScript                   |

---

## 🚀 Instalación

```bash
# 1. Clonar
git clone https://github.com/DarkSack/DnDBackend.git
cd DnDBackend

# 2. Dependencias
npm install

# 3. Configurar entorno (ver sección .env)
cp .env.example .env.local   # si existe

# 4. Servidor de desarrollo
npm run dev
# → http://localhost:3000
```

Para producción:

```bash
npm run build
npm start
```

---

## 🔐 Variables de entorno

Crea un archivo `.env.local` en la raíz con:

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

JWT_SECRET=una_clave_muy_larga_y_secreta

GROQ_API_KEY=gsk_...
REPLICATE_API_TOKEN=r8_...

NEXTAUTH_URL=http://localhost:3000
```

---

## 📁 Estructura

```
DnDBackend/
├── pages/
│   ├── api/
│   │   ├── auth/         # /register /login /me
│   │   ├── character/    # CRUD de personajes
│   │   ├── room/         # Salas y matchmaking
│   │   └── histories/    # Historias generadas con IA
│   ├── _app.js
│   └── index.js
├── Interfaces/           # Tipos TS compartidos
├── lib/                  # Cliente Supabase, helpers
├── utils/                # Funciones auxiliares
├── middleware.ts         # Middleware global (auth, CORS)
├── docs/                 # Documentación adicional
├── next.config.mjs
└── tsconfig.json
```

---

## 🔌 Endpoints principales

| Método | Ruta                        | Descripción                              |
| ------ | --------------------------- | ---------------------------------------- |
| POST   | `/api/auth/register`        | Registrar un usuario                     |
| POST   | `/api/auth/login`           | Iniciar sesión y recibir JWT             |
| GET    | `/api/character`            | Listar personajes del usuario            |
| POST   | `/api/character`            | Crear personaje                          |
| GET    | `/api/room`                 | Listar salas disponibles                 |
| POST   | `/api/room`                 | Crear una sala                           |
| POST   | `/api/room/join`            | Unirse a una sala                        |
| POST   | `/api/histories/generate`   | Generar historia / descripción con IA    |

> Consulta la carpeta `docs/` para el detalle completo de request/response.

---

## 🤝 Contribución

Se aceptan _issues_ y _pull requests_. Por favor abre un issue antes de trabajar en un cambio grande.

---

Hecho con ❤️ por **Sack**.
