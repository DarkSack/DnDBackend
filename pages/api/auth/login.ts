import { NextApiRequest, NextApiResponse } from "next";
import { SignInData } from "@/Interfaces/Auth";
import supabase from "@/utils/Client";
import ALLOWED_ORIGIN from "@/lib/Const";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Cabeceras CORS comunes para TODAS las respuestas
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Si es preflight OPTIONS, responder y terminar
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.status(200).end();
    return;
  }
  console.log("req", req);
  console.log("res", res);
  // Solo aceptamos POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email, password }: SignInData = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña requeridos" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email no válido" });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error en signIn:", error);

      if (
        error.code === "invalid_login_credentials" ||
        error.code === "invalid_credentials"
      ) {
        return res
          .status(401)
          .json({ error: "Usuario no encontrado o contraseña incorrecta" });
      }

      if (error.message.includes("Email not confirmed")) {
        return res.status(403).json({
          error: "Por favor confirma tu email antes de iniciar sesión",
        });
      }

      if (error.message.includes("Too many requests")) {
        return res.status(429).json({
          error: "Demasiados intentos de inicio de sesión. Intenta más tarde",
        });
      }

      return res.status(500).json({
        error: error.message || "Error desconocido",
      });
    }

    if (!data.user || !data.session) {
      return res.status(500).json({
        error: "No se pudo iniciar sesión",
      });
    }

    const { data: userData } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    const user = {
      id: data.user.id,
      email: data.user.email,
      username: userData?.username,
      avatar_url: userData?.avatar_url,
    };

    return res.status(200).json({
      user,
      token: data.session.access_token,
    });
  } catch (error) {
    console.error("Error interno:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
