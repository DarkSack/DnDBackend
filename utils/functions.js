import { Groq } from "groq-sdk";

/**
 * Limpia el texto de una respuesta de la IA quitando los delimitadores
 * de bloques de c digo y los espacios en blanco iniciales y finales.
 *
 * @param {string} responseText - El texto a limpiar
 * @returns {object} El objeto JSON resultante de parsear el texto limpio.
 * @throws {SyntaxError} Si el texto no se puede parsear como JSON.
 */
export function cleanJsonIA(responseText) {
  const clean = responseText.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(clean);
  } catch (err) {
    console.error("Error al hacer JSON.parse:", clean);
    throw err;
  }
}

/**
 * Utiliza el modelo de lenguaje Groq para completar un texto
 * dados algunos mensajes de contexto.
 *
 * @param {string} prompt - El texto a completar
 * @returns {string} - Un string con la respuesta del modelo.
 * @throws {Error} Si Groq devuelve un error.
 */
export async function chatCompletion(prompt) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
  const responseText = response.choices[0].message.content;
  return cleanJsonIA(responseText);
}
