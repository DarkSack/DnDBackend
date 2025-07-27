import type { NextApiRequest, NextApiResponse } from "next";
import { SignInData } from "@/Interfaces/Auth";
import supabase from "@/utils/Client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Permitir CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Manejar preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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
      if (
        error.code === "invalid_login_credentials" ||
        error.code === "invalid_credentials"
      ) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
      if (error.message.includes("Email not confirmed")) {
        return res.status(403).json({ error: "Confirma tu email primero" });
      }
      if (error.message.includes("Too many requests")) {
        return res.status(429).json({ error: "Demasiados intentos" });
      }
      return res
        .status(500)
        .json({ error: error.message || "Error desconocido" });
    }

    if (!data.user || !data.session) {
      return res.status(500).json({ error: "No se pudo iniciar sesión" });
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
  } catch (err) {
    console.error("Error interno:", err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export default handler;
