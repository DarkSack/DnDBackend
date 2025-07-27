# Configuración de CORS en Next.js

## Introducción
Este documento explica la implementación de CORS (Cross-Origin Resource Sharing) en la aplicación Next.js, asegurando una configuración segura y compatible con Vercel.

## Estructura del Middleware
El middleware de CORS se encuentra en `middleware/cors.ts` y proporciona una configuración centralizada que puede ser importada y utilizada en cualquier endpoint de la API.

## Configuración

### Orígenes Permitidos
- **Desarrollo**: `http://localhost:3000`
- **Producción**: `https://*.vercel.app`

### Métodos Permitidos
- GET
- POST
- PUT
- DELETE
- OPTIONS

### Headers Permitidos
- Content-Type
- Authorization
- Accept
- X-Requested-With
- Access-Control-Allow-Origin

### Características
- Manejo automático de peticiones preflight (OPTIONS)
- Soporte para credenciales (credentials: true)
- Cache de 24 horas para respuestas CORS
- Logging de errores

## Uso en Endpoints
Para usar el middleware de CORS en cualquier endpoint, simplemente importe y utilícelo así:

```typescript
import { runMiddleware } from "@/middleware/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  await runMiddleware(req, res, cors);
  // Resto del código del endpoint...
}
```

## Consideraciones de Seguridad
- La configuración se adapta automáticamente según el entorno (desarrollo/producción)
- Se limitan los orígenes permitidos a los necesarios
- Se especifican explícitamente los headers permitidos
- Se manejan correctamente las credenciales

## Pruebas
Se recomienda probar las siguientes situaciones:
1. Peticiones desde localhost en desarrollo
2. Peticiones desde Vercel en producción
3. Peticiones preflight (OPTIONS)
4. Peticiones con credenciales
5. Peticiones desde orígenes no permitidos
