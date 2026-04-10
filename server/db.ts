import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { readFileSync } from 'fs';
import { join } from 'path';
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
 * Mantenemos getDb por compatibilidad
 */
export async function getDb() {
  return db;
}

// --- FUNCIONES DE USUARIO ---

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

// --- FUNCIONES DE TICKETS ---

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

// --- LOGICA DE BÚSQUEDA PARA EL ASISTENTE IA (BASADA EN JSON) ---

export async function searchKnowledgeBase(searchTerm: string): Promise<any[]> {
  try {
    // Intentamos 3 rutas posibles para no fallar ni en local ni en Render
    const pathsToTry = [
      join(process.cwd(), 'client', 'src', 'data', 'knowledge.json'),
      join(process.cwd(), 'src', 'data', 'knowledge.json'),
      join(__dirname, '..', 'client', 'src', 'data', 'knowledge.json')
    ];

    let rawData = null;
    for (const p of pathsToTry) {
      try {
        rawData = readFileSync(p, 'utf8');
        if (rawData) {
          console.log("✅ JSON encontrado en:", p);
          break;
        }
      } catch (e) {
        continue; // Si no está aquí, probamos la siguiente
      }
    }

    if (!rawData) {
      console.error("❌ No se encontró knowledge.json en ninguna ruta conocida");
      return [];
    }

    const articles = JSON.parse(rawData);
    const query = searchTerm.toLowerCase();
    
    return articles.filter((a: any) => 
      a.isActive && (
        a.title.toLowerCase().includes(query) || 
        a.content.toLowerCase().includes(query) || 
        a.keywords.toLowerCase().includes(query)
      )
    ).slice(0, 5);
  } catch (error) {
    console.error("Error crítico en búsqueda JSON:", error);
    return [];
  }
}

// --- MOCKS PARA MANTENER LA COMPATIBILIDAD DEL BUILD ---

export async function getAllKnowledgeBaseArticles() { return []; }
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
