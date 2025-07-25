import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Crear la respuesta
  const response = NextResponse.next();

  // Configurar headers CORS
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Max-Age", "86400");

  // Manejar preflight requests (OPTIONS)
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  return response;
}

// Configurar en qué rutas aplicar el middleware
export const config = {
  matcher: ["/api/:path*"], // Solo en rutas API
};