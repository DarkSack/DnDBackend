import { NextApiRequest, NextApiResponse } from "next";
import { chatCompletion } from "@/utils/functions";
import {
  HistoryResponse,
  ErrorResponse,
  RequestBody,
} from "@/Interfaces/Campaings";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HistoryResponse | ErrorResponse>
) {
  // Validación del método HTTP
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { resumen, jugadores, ultima_accion }: RequestBody = req.body;

  // Validación de campos requeridos
  if (!resumen || !jugadores || !ultima_accion) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  const createHistory = `Aquí está el estado actual de la historia de rol:
- Resumen hasta ahora: ${resumen}
- Jugadores involucrados: ${jugadores}
- Última acción del jugador: ${ultima_accion}
Con base en eso, genera:
{
  descripcion_del_resultado: "",
  cambios_en_la_historia: "",
  eventos_ocurridos: [],
  oportunidades_o_peligros_nuevos: [],
  dialogo_npc: "",
  resumen_actualizado: ""
}`;

  try {
    const response = await chatCompletion(createHistory);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error al generar historia:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
}
