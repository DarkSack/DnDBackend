// middleware.ts en la raíz del proyecto
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://dn-d-inky.vercel.app",
];

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Si es una preflight request (OPTIONS), responder directamente
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": isAllowedOrigin ? origin : "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const response = NextResponse.next();

  // Agregar headers CORS al resto de métodos
  response.headers.set(
    "Access-Control-Allow-Origin",
    isAllowedOrigin ? origin : "*"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  response.headers.set("Vary", "Origin");

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};
