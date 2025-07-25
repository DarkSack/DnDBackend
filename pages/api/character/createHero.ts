import { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/utils/Client";
import { CharacterData } from "@/Interfaces/Characters";
import { ApiResponse } from "@/Interfaces/Auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  // Validar método HTTP
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Validar que el body existe y no está vacío
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Validar campos requeridos
    const characterData: CharacterData = req.body as CharacterData;

    if (!characterData.nombre) {
      return res
        .status(400)
        .json({ error: "El nombre del personaje es obligatorio" });
    }

    // Insertar en la base de datos
    const { data, error } = await supabase
      .from("characters")
      .insert(characterData)
      .select();

    if (error) {
      console.error("Error de Supabase:", error);
      return res.status(400).json({
        error: error.message || "Error desconocido",
      });
    }

    return res.status(201).json({ data: data[0] });
  } catch (error) {
    console.error("Error interno:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}
