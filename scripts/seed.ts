// scripts/seed.ts
import { db } from "../server/db"; // Asegúrate de que la ruta a tu instancia de DB sea correcta
import { knowledgeBase } from "../drizzle/schema";
import { nanoid } from "nanoid";

async function main() {
  console.log("🌱 Empezando la siembra de conocimientos...");

  const articles = [
    {
      articleId: nanoid(),
      title: "Gemma 4: IA Agéntica en el Edge",
      category: "IA Local",
      keywords: "Gemma 4, Google, Open Source, Edge AI",
      content: "Google ha liberado Gemma 4, su modelo de código abierto más avanzado con capacidades agénticas de vanguardia. Está diseñado para ejecutarse localmente en dispositivos móviles mediante Google AI Edge Gallery.",
      summary: "Gemma 4 permite llevar inteligencia avanzada directamente a dispositivos Android e iOS.",
    },
    {
      articleId: nanoid(),
      title: "Gemini Nano 4 para Android",
      category: "IA Móvil",
      keywords: "Gemini Nano, Android, On-device IA",
      content: "Gemini Nano 4 es la evolución de la IA on-device para Android, construida sobre la arquitectura Gemma 4. Ofrece un procesamiento hasta 4 veces más rápido y reduce el consumo energético en un 60% respecto a versiones previas. Soporta más de 140 idiomas y ventanas de contexto de 128K tokens.",
      summary: "IA multimodal nativa, ultrarrápida y eficiente ejecutada directamente en smartphones Android.",
    },
    {
      articleId: nanoid(),
      title: "Requisitos de VRAM para LLMs (2025-2026)",
      category: "Infraestructura",
      keywords: "VRAM, GPU, Hardware, Cuantización",
      content: "La VRAM es el recurso más crítico al desplegar modelos locales. Un modelo de 70B parámetros en precisión INT4 requiere aproximadamente 35GB de VRAM. GPUs como la RTX 4090 o 5090 con 24GB de VRAM pueden manejar modelos 70B cuantizados a Q4.",
      summary: "Guía técnica para dimensionar hardware según el tamaño y precisión del modelo de IA.",
    },
    {
      articleId: nanoid(),
      title: "Optimización de n8n para Automatización",
      category: "Automatización",
      keywords: "n8n, Docker, Workflows, Optimización",
      content: "Para flujos de trabajo de alto volumen en n8n, es esencial el uso de Docker Compose y estrategias de procesamiento en paralelo o gestión de colas. Herramientas como n8n Atom permiten gestionar colecciones de flujos directamente desde VS Code o Cursor.",
      summary: "Mejores prácticas para instalar y optimizar n8n en servidores VPS o locales.",
    },
    {
      articleId: nanoid(),
      title: "Estrategia SEO en la era de la IA (2026)",
      category: "Marketing Digital",
      keywords: "SEO 2026, AI Overviews, Tráfico Orgánico",
      content: "En 2026, las búsquedas con IA (Google AI Overviews, ChatGPT, Perplexity) están transformando el tráfico orgánico. El SEO técnico impecable es más vital que nunca, ya que los motores priorizan sitios sin errores para alimentar sus respuestas.",
      summary: "Cómo adaptar el posicionamiento web ante la disrupción de los modelos de lenguaje en los buscadores.",
    }
  ];

  try {
    for (const article of articles) {
      await db.insert(knowledgeBase).values(article);
      console.log(`✅ Insertado: ${article.title}`);
    }
    console.log("✨ ¡Siembra completada con éxito!");
  } catch (error) {
    console.error("❌ Error sembrando datos:", error);
  }
}

main();