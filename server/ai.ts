import { GoogleGenerativeAI } from "@google/generative-ai";
// Importación directa: Vercel incluirá este archivo en el bundle del servidor
import knowledgeData from "../client/src/data/knowledge.json";

// Validamos la API KEY antes de intentar cualquier cosa
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function askFlaxnetIA(preguntaUsuario: string) {
  try {
    // 1. Verificamos si la IA está configurada
    if (!genAI) {
      console.error("ERROR: GEMINI_API_KEY no encontrada en variables de entorno.");
      return "El servidor no tiene configurada la llave de acceso a la IA.";
    }

    // 2. Extraemos los artículos
    const articles = (knowledgeData as any[]).filter(a => a.isActive !== false);
    
    if (articles.length === 0) {
      return "No he podido cargar la base de conocimientos de la agencia.";
    }

    const contexto = articles
      .map(art => `TÍTULO: ${art.title}\nCONTENIDO: ${art.content}`)
      .join("\n\n---\n\n");

    // 3. Llamada a Gemini
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Eres el experto de Flaxnet IA. Base de conocimientos: ${contexto}. 
      Usa esta información para responder. Si preguntan por Gemma 4 o n8n, usa los datos técnicos proporcionados.`,
    });

    const result = await model.generateContent(preguntaUsuario);
    const responseText = result.response.text();

    return responseText || "La IA devolvió una respuesta vacía.";

  } catch (error: any) {
    console.error("Error crítico en askFlaxnetIA:", error);
    // Si el error es de la API de Google, lo reportamos
    if (error.message?.includes("API_KEY_INVALID")) {
      return "Error: La clave de API de Gemini es inválida.";
    }
    return "Lo siento, mi conexión con el cerebro de IA ha fallado.";
  }
}
