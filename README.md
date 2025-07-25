# DND Backend

Backend para la aplicación web de mesa de rol, una plataforma donde los jugadores pueden crear sus personajes, unirse a salas de juego y disfrutar de experiencias de rol en línea.

## Características Principales

- Sistema de autenticación robusto (registro e inicio de sesión)
- Gestión de usuarios y perfiles
- Sistema de salas de juego (creación y unión)
- Gestión de personajes de juego
- Sistema de amigos y social
- Integración con Next.js para la API

## Tecnologías Utilizadas

- Next.js 14
- Node.js
- JavaScript
- Supabase (base de datos)
- JWT (autenticación)

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno:
   - `DATABASE_URL` - URL de conexión a Supabase
   - `JWT_SECRET` - Clave secreta para JWT
   - `NEXTAUTH_URL` - URL de la aplicación

## Estructura del Proyecto

```
dndbackend/
├── pages/             # Rutas de la API
│   └── api/
│       ├── auth/     # Endpoints de autenticación
│       ├── rooms/    # Endpoints de salas
│       ├── characters/ # Endpoints de personajes
│       └── friends/  # Endpoints de amigos
├── utils/            # Funciones y utilidades
├── lib/              # Configuraciones y helpers
├── constants/        # Constantes del proyecto
└── middleware/       # Middleware de Next.js
```