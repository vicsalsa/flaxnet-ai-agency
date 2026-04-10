import { GoogleGenerativeAI } from "@google/generative-ai";
// IMPORTACIÓN DIRECTA: Saltamos el frontend para asegurar que el backend vea los datos
import knowledgeData from "../client/src/data/knowledge.json";

// Comprobación de seguridad para evitar errores 500 si falta la API Key
if (!process.env.GEMINI_API_KEY) {
  console.error("CRÍTICO: GEMINI_API_KEY no está definida en las variables de entorno.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function askFlaxnetIA(preguntaUsuario: string) {
  try {
    // 1. Filtrar directamente del JSON crudo
    const articles = (knowledgeData as any[]).filter(a => a.isActive);

    // 2. Convertir los artículos en un texto fuerte y claro
    const contexto = articles
      .map(art => `TÍTULO: ${art.title}\nCONTENIDO: ${art.content}`)
      .join("\n\n---\n\n");

    // 3. Instrucciones estrictas para que no ignore el contexto
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Eres el asistente experto oficial de la agencia Flaxnet IA. 
      Tu ÚNICA fuente de verdad es la siguiente base de conocimientos de la empresa:
      
      ${contexto}
      
      REGLAS ESTRICTAS: 
      - Si el usuario pregunta por Gemma 4, n8n, SEO 2026, o cualquier servicio listado arriba, DEBES usar esa información detalladamente. 
      - NUNCA digas que no tienes información si el tema está en el texto proporcionado.
      - Responde con un tono profesional, tecnológico y servicial.`,
    });

    const result = await model.generateContent(preguntaUsuario);
    return result.response.text();
  } catch (error) {
    console.error("Error en la generación de IA:", error);
    return "Lo siento, mis circuitos de IA están experimentando un reinicio rápido. Por favor, intenta de nuevo en unos segundos.";
  }
}
