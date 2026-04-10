import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// IMPORTANTE: Importamos el JSON directamente para que se incluya en el build de Render
import articles from "../client/src/data/knowledge.json";

import {
  users,
  supportTickets,
  type InsertUser,
  type InsertSupportTicket,
  type SupportTicket,
} from "../drizzle/schema";

// Conexión con SSL requerido para Render
const queryClient = postgres(process.env.DATABASE_URL!, { ssl: "require" });
export const db = drizzle(queryClient);

/**
 * Mantenemos getDb por compatibilidad con el resto del sistema
 */
export async function getDb() {
  return db;
}

// --- FUNCIONES DE USUARIO (Base de Datos) ---

export async function getUserByOpenId(openId: string) {
  const result = await db.select().from(users).where(eq(users.openId, openId));
  return result[0] ?? null;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required");
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, any> = {};
    const textFields = ["name", "email", "loginMethod"] as const;

    textFields.forEach(field => {
      if (user[field] !== undefined) {
        values[field] = user[field] ?? null;
        updateSet[field] = user[field] ?? null;
      }
    });

    if (user.lastSignedIn) updateSet.lastSignedIn = user.lastSignedIn;

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("Error upsertUser:", error);
    throw error;
  }
}

// --- FUNCIONES DE TICKETS (Base de Datos) ---

export async function createSupportTicket(
  ticket: InsertSupportTicket
): Promise<SupportTicket | null> {
  try {
    const result = await db.insert(supportTickets).values(ticket).returning();
    return result[0] ?? null;
  } catch (error) {
    console.error("Error ticket:", error);
    throw error;
  }
}

export async function getAllSupportTickets() {
  return await db
    .select()
    .from(supportTickets)
    .orderBy(desc(supportTickets.createdAt));
}

export async function getSupportTicketsByEmail(email: string) {
  return await db
    .select()
    .from(supportTickets)
    .where(eq(supportTickets.email, email));
}

export async function updateSupportTicket(id: number, data: any) {
  return await db
    .update(supportTickets)
    .set(data)
    .where(eq(supportTickets.id, id));
}

// --- LOGICA DE BÚSQUEDA PARA EL ASISTENTE IA (BASADA EN JSON IMPORTADO) ---

/**
 * Esta función es la que usa el chatbot para responder.
 * Ahora lee directamente del JSON importado en memoria.
 */
export async function searchKnowledgeBase(searchTerm: string): Promise<any[]> {
  try {
    const query = searchTerm.toLowerCase();
    
    // Buscamos en el array de artículos importado
    const results = (articles as any[]).filter((a: any) => 
      a.isActive && (
        a.title.toLowerCase().includes(query) || 
        a.content.toLowerCase().includes(query) || 
        a.keywords.toLowerCase().includes(query)
      )
    );

    console.log(`🔍 Búsqueda IA: "${searchTerm}" | Resultados: ${results.length}`);
    return results.slice(0, 5); 
  } catch (error) {
    console.error("Error en la búsqueda del chatbot:", error);
    return [];
  }
}

/**
 * Devuelve todos los artículos para el servidor si fuera necesario
 */
export async function getAllKnowledgeBaseArticles() {
  return articles;
}

// --- MOCKS DE COMPATIBILIDAD (Para evitar errores de compilación en Render) ---

export async function getKnowledgeBaseByCategory(category: string) { return []; }
export async function getKnowledgeBaseArticle(articleId: string) { return null; }
export async function incrementArticleViews(articleId: string) { return { success: true }; }
export async function recordFeedback(articleId: string, isHelpful: boolean) { return { success: true }; }
export async function recordHelpfulFeedback(articleId: string, isHelpful: boolean) { return { success: true }; }
export async function createArticleRating(rating: any) { return null; }
export async function getArticleAverageRating(articleId: string) { return { averageRating: 0, totalRatings: 0 }; }
export async function getArticleRatings(articleId: string) { return []; }
export async function getUserArticleRating(articleId: string, userEmail: string) { return null; }
export async function getArticleRatingStats(articleId: string) { 
  return { averageRating: 0, totalRatings: 0, ratingDistribution: [] }; 
}
