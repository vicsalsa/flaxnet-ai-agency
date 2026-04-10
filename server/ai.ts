import { GoogleGenerativeAI } from "@google/generative-ai";
import knowledgeData from "../client/src/data/knowledge.json" assert { type: "json" };

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function askFlaxnetIA(preguntaUsuario: string) {
  try {
    if (!genAI) return "Error: No se ha configurado la clave de API de Gemini en el servidor.";

    // filter only active articles
    const articles = knowledgeData.filter((a: any) => a.isActive !== false);
    const contexto = articles
      .map((art: any) => `TÍTULO: ${art.title}\nCONTENIDO: ${art.content}`)
      .join("\n\n---\n\n");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Eres el experto de Flaxnet IA. Base de conocimientos: ${contexto}. 
      Responde siempre basándote en esta información. Si preguntan por Gemma 4 o n8n, usa los datos técnicos del texto.`,
    });

    const result = await model.generateContent(preguntaUsuario);
    return result.response.text();

  } catch (error: any) {
    console.error("Error crítico en askFlaxnetIA:", error);
    return "Lo siento, mi conexión con el cerebro de IA ha fallado temporalmente.";
  }
}
