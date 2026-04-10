import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "fs";
import { join } from "path";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function askFlaxnetIA(preguntaUsuario: string) {
  try {
    if (!genAI) return "Error: No se ha configurado la clave de API de Gemini en el servidor.";

    let rawData;
    // Intentamos localizar el JSON de forma dinámica para Vercel
    try {
      const path1 = join(process.cwd(), "client", "src", "data", "knowledge.json");
      rawData = readFileSync(path1, "utf-8");
    } catch (e) {
      const path2 = join(process.cwd(), "..", "client", "src", "data", "knowledge.json");
      rawData = readFileSync(path2, "utf-8");
    }

    const articles = JSON.parse(rawData).filter((a: any) => a.isActive !== false);
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
