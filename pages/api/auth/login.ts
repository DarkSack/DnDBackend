import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse, SignInData } from "@/Interfaces/Auth";
import supabase from "@/utils/Client";
import ALLOWED_ORIGIN from "@/lib/Const";

export default async function handler(req: NextApiRequest): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ error: "Método no permitido" });
  }
  const { email, password }: SignInData = req.body;
  if (!email || !password) {
    return Response.json({ error: "Email y contraseña requeridos" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Email no válido" });
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
        return Response.json({
          error: "Usuario no encontrado o contraseña incorrecta",
        });
      }
      if (error.message.includes("Email not confirmed")) {
        return Response.json({
          error: "Por favor confirma tu email antes de iniciar sesión",
        });
      }
      if (error.message.includes("Too many requests")) {
        return Response.json({
          error: "Demasiados intentos de inicio de sesión. Intenta más tarde",
        });
      }
      return Response.json({
        error: error.message || "Error desconocido",
      });
    }
    if (!data.user || !data.session) {
      return Response.json({
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
      username: userData.username,
      avatar_url: userData.avatar_url,
    };
    return Response.json(
      {
        user,
        token: data.session.access_token,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      }
    );
  } catch (error) {
    console.error("Error interno:", error);
    return Response.json({ error: "Error interno del servidor" });
  }
}
