export const summonHero = `Crea un personaje original para un juego de rol (RPG) de estilo medieval fantástico. Devuelve únicamente un objeto en formato JSON, sin explicaciones, texto adicional ni comentarios.

El personaje debe estar bien estructurado, con una personalidad coherente y equilibrada. Usa los siguientes campos exactos y asegúrate de usar solo las opciones permitidas:
{
  "nombre": "", // Nombre propio y acorde al universo medieval fantástico
  "genero": "", // "Masculino", "Femenino", "No binario", u otra identidad válida
  "raza": "", // Una de las siguientes: "Humano", "Elfo", "Enano", "Orco", "Mediano", "Tiefling", "Dracónido", "Gnomo"
  "clase": "", // Una de las siguientes: "Guerrero", "Mago", "Pícaro", "Clérigo", "Paladín", "Bárbaro", "Explorador", "Hechicero", "Druida", "Monje"
  "edad": 0, // Edad apropiada para la raza y clase
  "rasgos_fisicos": [], // Lista de 3 a 5 descripciones físicas notables
  "personalidad": [], // Lista de 3 a 5 rasgos de carácter
  "trasfondo": "", // Breve historia de origen (1 a 3 frases)
  "fuerza": 0,         // De 1 a 20
  "destreza": 0,       // De 1 a 20
  "constitucion": 0,   // De 1 a 20
  "inteligencia": 0,   // De 1 a 20
  "sabiduria": 0,      // De 1 a 20
  "carisma": 0,        // De 1 a 20
  "habilidades": [], // Lista de 2 a 5 habilidades o talentos (ej. "sigilo", "arcanismo")
  "rasgos_unicos": [], // Lista de 1 a 3 características especiales o dones
  "alineamiento": "", // Uno de los siguientes: "Legal Bueno", "Neutral Bueno", "Caótico Bueno", "Legal Neutral", "Neutral", "Caótico Neutral", "Legal Malvado", "Neutral Malvado", "Caótico Malvado"
  "religion": "", // Nombre de una deidad o creencia ficticia acorde al mundo
  "datos_extra": "" // Cualquier otro detalle interesante (manías, armas favoritas, mascotas, etc.)
}

Asegúrate de que todos los campos estén completos, que los atributos estén equilibrados y que la personalidad del personaje tenga coherencia con su alineamiento y trasfondo.

Regresa únicamente el objeto JSON, sin explicaciones, comentarios ni texto adicional.`;

export const summonCampaign = `
Crea una campaña original para un juego de rol (RPG) de estilo medieval fantástico. Devuelve la información en formato JSON como un objeto con campos clave bien estructurados y detallados.

Incluye los siguientes campos:
{
  "title": "",                 // Nombre de la campaña, evocador y apropiado al género
  "setting": "",               // Descripción del mundo o región donde ocurre la campaña
  "main_theme": "",            // Tema principal o conflicto central (ej. invasión, corrupción, exploración)
  "starting_level": 0,         // Nivel inicial recomendado para los personajes (ej. 1, 5, 10)
  "recommended_players": 0,    // Número ideal de jugadores
  "plot_summary": "",          // Resumen breve de la trama principal (3-5 frases)
  "key_npcs": [],              // Lista de personajes importantes (nombre y rol breve)
  "major_locations": [],       // Lista de lugares clave con breve descripción
  "primary_antagonist": "",    // Nombre y descripción del antagonista principal
  "notable_factions": [],      // Lista de facciones relevantes y su influencia
  "unique_elements": [],       // Elementos únicos o especiales de la campaña (magia, tecnología, mitos)
  "recommended_difficulty": "", // Dificultad sugerida: "Beginner", "Intermediate", "Advanced", "Expert"
  "estimated_duration": ""     // Duración aproximada en sesiones o horas
}
Regresa únicamente el objeto JSON sin texto adicional, explicaciones ni comentarios. Asegúrate que la información sea coherente, interesante y propia de una campaña medieval fantástica.
`;
