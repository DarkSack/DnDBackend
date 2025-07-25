// lib/cors.ts - Helper para manejar CORS
import { NextApiRequest, NextApiResponse } from "next";

interface CorsOptions {
  allowedOrigins?: string[];
  allowedMethods?: string[];
  allowedHeaders?: string[];
  allowCredentials?: boolean;
}

const defaultOptions: CorsOptions = {
  allowedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://dn-d-inky.vercel.app",
  ],
  allowedMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "X-Api-Version",
    "Authorization",
  ],
  allowCredentials: true,
};

export function cors(
  req: NextApiRequest,
  res: NextApiResponse,
  options: CorsOptions = {}
): boolean {
  const config = { ...defaultOptions, ...options };
  const { allowedOrigins, allowedMethods, allowedHeaders, allowCredentials } =
    config;

  const origin = req.headers.origin;

  // Configurar Access-Control-Allow-Origin
  if (origin && allowedOrigins?.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  // Configurar otros headers CORS
  if (allowCredentials) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  if (allowedMethods) {
    res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(", "));
  }

  if (allowedHeaders) {
    res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(", "));
  }

  // Manejar preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true; // Indica que se manejó el preflight
  }

  return false; // Indica que debe continuar con el handler normal
}
