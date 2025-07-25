import { NextApiRequest, NextApiResponse } from "next";
import { chatCompletion } from "@/utils/functions";
import { summonHero } from "@/utils/prompts";

// Tipos para las respuestas
interface SuccessResponse {
  response: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  try {
    const response = await chatCompletion(summonHero);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error al generar personaje:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
}
