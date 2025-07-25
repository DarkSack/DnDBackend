// Definir el tipo para los datos de la habitación
interface RoomData {
  id: string;
  name: string;
  gameSystem: string;
  genre: string;
  currentPlayers: number;
  maxPlayers: number;
  isPrivate: boolean;
  gameMaster: string;
  description: string;
  nextSession: string;
  status: string;
  difficulty: string;
  duration: string;
  createdAt: string;
}

// Tipo para la respuesta de éxito
interface SuccessResponse {
  message: string;
}

// Tipo para la respuesta de error
interface ErrorResponse {
  error: string;
}

// Tipo unión para las posibles respuestas
type ApiResponse = SuccessResponse | ErrorResponse;

export type { RoomData, SuccessResponse, ErrorResponse, ApiResponse };
