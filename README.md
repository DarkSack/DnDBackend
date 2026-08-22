# DnDBackend — Generador de personajes y campañas de rol con IA

Backend para una **plataforma web de mesas de rol al estilo D&D**. Su parte más vistosa: si eres un jugador que se quedó en blanco o un DM que necesita improvisar en 30 segundos, el sistema te **genera personajes completos** (con atributos, trasfondo, alineamiento) y **campañas originales** (con antagonistas, facciones, ubicaciones) usando un modelo LLM. Además cubre la fontanería clásica de la app: registro/login de usuarios, salas de juego y personajes propios.

---

## Qué hace

### 🧙 Generación de héroes con IA

`POST /api/character/summonHero` → pide a **Groq** un personaje medieval fantástico coherente. Devuelve un JSON estricto con:

- Nombre, género, raza (Humano, Elfo, Enano, Orco…), clase (Guerrero, Mago, Pícaro…), edad.
- 6 atributos base D&D (fuerza, destreza, constitución, inteligencia, sabiduría, carisma) balanceados 1–20.
- Rasgos físicos y de personalidad, trasfondo, habilidades, rasgos únicos.
- Alineamiento (Legal Bueno … Caótico Malvado) y religión coherentes con el trasfondo.

### 🏰 Creación y guardado de personajes propios

`POST /api/character/createHero` → guarda el personaje en la tabla `characters` de **Supabase**. Valida los campos y devuelve el registro creado.

### 📚 Generación de campañas

`POST /api/histories/createHistory` → arma una campaña con título, ambientación, trama, NPCs clave, ubicaciones, antagonista principal, facciones, elementos únicos, dificultad y duración estimada.

`POST /api/histories/continueHistory` → continúa una historia existente a partir del último estado.

### 🔐 Auth

- `POST /api/auth/register` — alta de usuario.
- `POST /api/auth/login` — login y emisión de JWT.
- `middleware.ts` — verifica el JWT en las rutas protegidas.

### 🎲 Salas de juego

- `POST /api/room/createRoom` — crea una sala privada o pública.
- (Más endpoints en `pages/api/room/` para unirse / listar).

---

## Cómo se usa (ejemplo)

```bash
# Generar un héroe con IA
curl -X POST https://<tu-deploy>/api/character/summonHero \
  -H "Authorization: Bearer $JWT"

# Registrar ese héroe en tu cuenta
curl -X POST https://<tu-deploy>/api/character/createHero \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Aelric","raza":"Elfo","clase":"Explorador", ... }'
```

---

## Bajo el capó

- **Framework:** Next.js 15 (API Routes) sobre React 19.
- **DB:** Supabase (PostgreSQL) — tablas `characters`, `rooms`, `histories`, `users`, `friends`.
- **IA:** **Groq SDK** para generación de texto (personajes / campañas); **Replicate** disponible para imágenes.
- **Auth:** JWT.
- **Rate limiting:** `rate-limiter-flexible` — protege los endpoints de IA contra abuso.
- **CORS:** activado desde `middleware.ts` para que cualquier frontend pueda conectarse.

---

## Setup local

```bash
git clone https://github.com/DarkSack/DnDBackend.git
cd DnDBackend
npm install
npm run dev            # http://localhost:3000
```

### Variables de entorno

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

JWT_SECRET=una_clave_muy_larga

GROQ_API_KEY=gsk_...
REPLICATE_API_TOKEN=r8_...

NEXTAUTH_URL=http://localhost:3000
```

---

## Estructura

```
DnDBackend/
├── pages/api/
│   ├── auth/          # register, login
│   ├── character/     # createHero, summonHero
│   ├── histories/     # createHistory, continueHistory
│   └── room/          # createRoom, join, list
├── utils/
│   ├── Client.ts      # cliente Supabase
│   ├── prompts.js     # prompts detallados para Groq (summonHero, summonCampaign)
│   └── functions.js
├── Interfaces/        # Tipos TS (Auth, Characters, Rooms, Campaings)
├── lib/Const.ts
└── middleware.ts      # Auth + CORS
```

---

Hecho con ❤️ por **Sack**.
