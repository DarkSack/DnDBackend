// Tipos para la respuesta exitosa
interface CampaignResponse {
  response: string;
}

// Tipo para errores
interface ErrorResponse {
  error: string;
}

// Tipos para el request body
interface RequestBody {
  resumen: string;
  jugadores: string;
  ultima_accion: string;
}

// Tipos para la respuesta exitosa
interface HistoryResponse {
  response: string;
}

export type { CampaignResponse, ErrorResponse, HistoryResponse, RequestBody };
