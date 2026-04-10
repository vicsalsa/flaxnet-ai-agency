import { GoogleGenerativeAI } from "@google/generative-ai";
import knowledgeData from "../client/src/data/knowledge.json";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function askFlaxnetIA(preguntaUsuario: string) {
  try {
    // 1. EXTRACCIÓN SEGURA DEL JSON
    // Vercel a veces envuelve los JSON en propiedades. Buscamos el array real.
    let rawArticles: any = knowledgeData;
    
    if (!Array.isArray(rawArticles)) {
        // Si no es un array, intentamos sacarlo de .default o de .articles
        rawArticles = rawArticles.default || rawArticles.articles || Object.values(rawArticles);
    }

    // Filtramos. Si isActive no existe, lo damos por válido por si acaso.
    const articles = (rawArticles as any[]).filter(a => a.isActive !== false);

    // CHIVATOS PARA LA CONSOLA DE VERCEL (Logs)
    console.log(`[IA] Artículos extraídos del JSON: ${articles.length}`);

    // 2. CONSTRUIR EL CONTEXTO
    const contexto = articles
      .map(art => `TÍTULO: ${art.title}\nCONTENIDO: ${art.content}`)
      .join("\n\n---\n\n");
      
    console.log(`[IA] Longitud del texto enviado a Gemini: ${contexto.length} caracteres`);

    // Si por algún motivo el contexto sigue vacío, la IA nos avisará directamente
    if (contexto.trim().length === 0) {
      return "Error de lectura: El servidor no ha podido cargar los artículos del JSON.";
    }

    // 3. LLAMADA A GEMINI
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Eres el asistente experto de la agencia Flaxnet IA. 
      Tu ÚNICA fuente de verdad es la siguiente base de conocimientos:
      
      ${contexto}
      
      REGLAS: 
      - Si te preguntan por Gemma 4, n8n, SEO u otros servicios, DEBES usar el texto de arriba para responder con todo detalle.
      - NUNCA digas que no tienes información, ni recomiendes crear un ticket si la info está en el texto.
      - Resuelve la duda directamente.`,
    });

    const result = await model.generateContent(preguntaUsuario);
    return result.response.text();

  } catch (error) {
    console.error("[IA] Error Crítico:", error);
    return "Ups, mis engranajes de IA se han atascado. Inténtalo de nuevo en un segundo.";
  }
}
