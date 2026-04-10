import { GoogleGenerativeAI } from "@google/generative-ai";
// IMPORTANTE: Leemos el JSON directamente para que Vercel no se pierda
import knowledgeData from "../client/src/data/knowledge.json";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function askFlaxnetIA(preguntaUsuario: string) {
  try {
    // Extraemos los artículos del JSON de forma segura
    const articles = (knowledgeData as any[]).filter(a => a.isActive !== false);

    const contexto = articles
      .map(art => `TÍTULO: ${art.title}\nCONTENIDO: ${art.content}`)
      .join("\n\n---\n\n");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Eres el experto de Flaxnet IA. Usa este conocimiento: ${contexto}. 
      Responde siempre basándote en esta información, especialmente si preguntan por Gemma 4 o n8n.`,
    });

    const result = await model.generateContent(preguntaUsuario);
    return result.response.text();
  } catch (error) {
    console.error("Error en IA:", error);
    return "Lo siento, mi conexión con el cerebro de IA ha fallado.";
  }
}
