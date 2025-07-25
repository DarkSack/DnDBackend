// Definir el tipo para los datos del personaje
interface CharacterData {
  id: string;
  nombre: string;
  genero: string;
  raza: string;
  clase: string;
  edad: number;
  rasgos_fisicos: string[];
  personalidad: string[];
  trasfondo: string;
  atributos: {
    fuerza: number;
    destreza: number;
    constitucion: number;
    inteligencia: number;
    sabiduria: number;
    carisma: number;
  };
  habilidades: string[];
  rasgos_unicos: string[];
  alineamiento: string;
  religion: string;
  datos_extra: string;
}

// Tipo para la respuesta de éxito
interface SuccessResponse {
  data: any;
}

// Tipo para la respuesta de error
interface ErrorResponse {
  error: string;
}

// Tipo unión para las posibles respuestas
type ApiResponse = SuccessResponse | ErrorResponse;

export type { CharacterData, SuccessResponse, ErrorResponse };
