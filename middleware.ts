import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Manejar CORS para todas las rutas de API
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://dn-d-inky.vercel.app",
    ];

    // Crear response
    const response = NextResponse.next();

    // Establecer headers CORS
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Max-Age", "86400");

    // Manejar preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: response.headers });
    }

    return response;
  }
}

export const config = {
  matcher: "/api/:path*",
};
