import { NextApiRequest, NextApiResponse } from "next";
import { chatCompletion } from "@/utils/functions";
import { CampaignResponse, ErrorResponse } from "@/Interfaces/Campaings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CampaignResponse | ErrorResponse>
) {
  // Validación del método HTTP
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }
  const createHistory = `
    Crea una campaña de rol puuede ser de cualquier género con los siguientes parámetros:
    Devuelve únicamente un objeto JSON con estos campos:
    {
      "name": "",         // Nombre de la campaña
      "gameSystem": "",   // D&D 5e, Pathfinder, Call of Cthulhu, Vampire, Cyberpunk, World of Darkness
      "genre": "",        // Fantasy, Horror, Sci-Fi, Mystery, Adventure, Cyberpunk
      "description": "",  // Descripción extensa, atractiva y super explicada
      "difficulty": "",   // beginner, intermediate, advanced, expert
      "duration": "",     // Duración aproximada en sesiones o horas
    }
    No incluyas ningún texto, explicación ni comentario adicional, solo el objeto JSON completo y coherente.
    `;

  try {
    const response = await chatCompletion(createHistory);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error al generar historia:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
}
