import { GoogleGenerativeAI } from "@google/generative-ai";
import { flaxnetKnowledge } from "./knowledge";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAIResponse(userPrompt: string) {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `Eres el consultor experto de Flaxnet IA. 
    Tu objetivo es resolver dudas usando este contexto: ${flaxnetKnowledge}.
    Responde de forma concisa, profesional y con un toque innovador.`
  });

  const result = await model.generateContent(userPrompt);
  return result.response.text();
}