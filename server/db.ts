import { eq, like, and, avg, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { 
  users, 
  supportTickets, 
  knowledgeBase, 
  articleRatings,
  type InsertUser, 
  type InsertSupportTicket, 
  type SupportTicket, 
  type KnowledgeBaseArticle, 
  type InsertArticleRating, 
  type ArticleRating 
} from "../drizzle/schema";
import { ENV } from './_core/env';

// Conexión directa
const queryClient = postgres(process.env.DATABASE_URL!);
// EXPORTACIÓN CLAVE: Exportamos 'db' directamente
export const db = drizzle(queryClient);

/**
 * Mantenemos getDb por compatibilidad con funciones antiguas
 */
export async function getDb() {
  return db;
}

// --- Funciones de utilidad corregidas para usar 'db' directamente ---

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required");
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, any> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    textFields.forEach((field) => {
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
  } catch (error) { console.error("Error upsertUser:", error); throw error; }
}

export async function createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket | null> {
  try {
    const result = await db.insert(supportTickets).values(ticket).returning();
    return result[0] ?? null;
  } catch (error) { console.error("Error ticket:", error); throw error; }
}

export async function searchKnowledgeBase(searchTerm: string): Promise<KnowledgeBaseArticle[]> {
  return await db.select().from(knowledgeBase)
    .where(and(eq(knowledgeBase.isActive, true), like(knowledgeBase.keywords, `%${searchTerm}%`)))
    .limit(5);
}

// ... (Puedes dejar el resto de funciones igual, pero asegúrate de que usen 'db' en lugar de llamar a 'getDb()')
