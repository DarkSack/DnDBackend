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
  const {
    allowedOrigins,
    allowedMethods,
    allowedHeaders,
    allowCredentials,
  } = config;

  const origin = req.headers.origin;

  if (origin && allowedOrigins?.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  } else if (!allowCredentials) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  if (allowCredentials) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  if (allowedMethods) {
    res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(", ").toUpperCase());
  }

  if (allowedHeaders) {
    res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(", ").toUpperCase());
  }

  res.setHeader("Access-Control-Max-Age", "86400"); // Cache preflight 24h

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true; // Preflight handled
  }

  return false; // Continue with normal handler
}