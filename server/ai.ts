import { GoogleGenerativeAI } from "@google/generative-ai";
import _knowledgeData from "../client/src/data/knowledge.json";

// Typescript module resolution parses this as default or named exports depending on config.
const knowledgeData: any = _knowledgeData;

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function askFlaxnetIA(preguntaUsuario: string) {
  try {
    if (!genAI) return "Error: No se ha configurado la clave de API de Gemini en el servidor.";

    // filter only active articles
    const articles = (knowledgeData.default || knowledgeData).filter((a: any) => a.isActive !== false);
    const contexto = articles
      .map((art: any) => `TÍTULO: ${art.title}\nCONTENIDO: ${art.content}`)
      .join("\n\n---\n\n");

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: `Eres el experto de Flaxnet IA. Base de conocimientos: ${contexto}. 
      Responde siempre basándote en esta información. Si preguntan por Gemma 4 o n8n, usa los datos técnicos del texto.`,
    });

    const result = await model.generateContent(preguntaUsuario);
    return result.response.text();

    // Muestra el error real para identificar en Render/Local qué API falla si sigue fallando
  } catch (error: any) {
    console.error("Error crítico en askFlaxnetIA:", error);
    return "Lo siento, falló la API de Gemini: " + (error.message || String(error));
  }
}
