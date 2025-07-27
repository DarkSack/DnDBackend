import { NextApiRequest, NextApiResponse } from 'next';

// Configuración de CORS para producción y desarrollo
const ALLOWED_ORIGIN = process.env.NODE_ENV === 'production'
  ? 'https://*.vercel.app'
  : 'http://localhost:3000';

// Middleware para manejar CORS
export const runMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    // Manejar peticiones preflight
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.status(204).end();
      return;
    }

    // Configurar headers CORS para otras peticiones
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } catch (error) {
    console.error('Error en CORS middleware:', error);
    res.status(500).json({ error: 'Error interno en CORS' });
  }
};
