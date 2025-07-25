import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const allowedOrigins = new Set([
  "https://dn-d-inky.vercel.app",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
]);

const optionsRateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 1,
});

const corsHeaders = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With, Accept, Origin",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "86400",
} as const;

interface CORSHeaders extends Headers {
  set(name: string, value: string): void;
}

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const isAllowedOrigin = origin && allowedOrigins.has(origin);

  console.log(`[${request.method}] ${request.url} - Origin: ${origin}`);

  if (request.method === "OPTIONS") {
    try {
      await optionsRateLimiter.consume(origin || "unknown");
    } catch {
      return new Response("Too many requests", { status: 429 });
    }

    if (!isAllowedOrigin) {
      console.warn(`CORS denied for origin: ${origin}`);
      return new Response("CORS Not Allowed", { status: 403 });
    }

    return new Response(null, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Access-Control-Allow-Origin": origin!,
      },
    });
  }

  const response = NextResponse.next();

  if (isAllowedOrigin && origin) {
    const headers = response.headers as CORSHeaders;
    headers.set("Access-Control-Allow-Origin", origin);
    Object.entries(corsHeaders).forEach(([key, value]) =>
      headers.set(key, value)
    );
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/auth/:path*"],
} as const;
