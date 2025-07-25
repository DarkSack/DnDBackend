import { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/Client";
import { ApiResponse, SignUpData, UserData } from "@/Interfaces/Auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  // Validar método HTTP
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Extraer y validar datos del body
  const { email, password, username, id }: SignUpData = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña requeridos" });
  }

  // Validaciones adicionales
  if (password.length < 6) {
    return res.status(400).json({
      error: "La contraseña debe tener al menos 6 caracteres",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email no válido" });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("User already registered")) {
        return res.status(409).json({
          error: "El usuario ya está registrado",
        });
      }

      if (error.message.includes("Invalid email")) {
        return res.status(400).json({
          error: "Email no válido",
        });
      }

      if (error.message.includes("Password should be at least")) {
        return res.status(400).json({
          error: "La contraseña debe tener al menos 6 caracteres",
        });
      }

      return res.status(400).json({
        error: error.message || "Error desconocido",
      });
    }

    const userData: UserData = {
      id,
      username,
      email,
      created_at: new Date(),
      avatar_url: "",
    };

    const { error: userError } = await supabase.from("users").insert(userData);

    if (userError) {
      return res.status(400).json({
        error: userError.message || "Error al crear perfil de usuario",
      });
    }

    return res.status(201).json({
      user: data.user,
      token: data.session.access_token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
