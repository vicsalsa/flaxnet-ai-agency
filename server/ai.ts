import { getArticles } from "../client/src/lib/knowledge";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function askFlaxnetIA(preguntaUsuario: string) {
  // 1. Consultar la base de conocimientos basada en JSON
  const articles = getArticles();

  // 2. Convertir los artículos en un texto que Gemini entienda
  const contexto = articles
    .map(art => `TÍTULO: ${art.title}\nCONTENIDO: ${art.content}`)
    .join("\n\n");

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Eres el experto de Flaxnet IA. 
    Usa este conocimiento específico de nuestra agencia para responder:
    ${contexto}
    
    Si el usuario pregunta por Gemma 4, n8n o SEO 2026, usa los datos anteriores.`,
  });

  const result = await model.generateContent(preguntaUsuario);
  return result.response.text();
}
