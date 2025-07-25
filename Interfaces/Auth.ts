/**
 * SignUp Interface
 */

// Definir el tipo para los datos de registro
interface SignUpData {
  email: string;
  password: string;
  username: string;
  id: string;
}

// Tipo para los datos del usuario en la tabla personalizada
interface UserData {
  id: string;
  username: string;
  email: string;
  created_at: Date;
  avatar_url: string;
}

// Tipo para la respuesta de éxito
interface SuccessResponse {
  user: object;
  token: string;
}

/**
 * Login Interface
 */

// Tipo para la respuesta exitosa
interface SuccessLoginResponse {
  user: object;
  session: object;
}

// Tipo para la respuesta de error
interface ErrorResponse {
  error: string;
}

// Definir el tipo para los datos de login
interface SignInData {
  email: string;
  password: string;
}

// Tipo unión para las posibles respuestas
type ApiResponse = SuccessResponse | ErrorResponse;

export type {
  SignUpData,
  UserData,
  SuccessResponse,
  ErrorResponse,
  ApiResponse,
  SignInData,
};
