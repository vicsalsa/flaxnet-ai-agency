import { eq, like, and, desc } from "drizzle-orm";
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

// Conexión con SSL requerido para Render
const queryClient = postgres(process.env.DATABASE_URL!, { ssl: 'require' });
export const db = drizzle(queryClient);

/**
 * Mantenemos getDb por compatibilidad
 */
export async function getDb() {
  return db;
}

// --- FUNCIONES DE USUARIO (Mantenidas) ---

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
  } catch (error) { 
    console.error("Error upsertUser:", error); 
    throw error; 
  }
}

// --- FUNCIONES DE TICKETS (Restauradas para el build) ---

export async function createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket | null> {
  try {
    const result = await db.insert(supportTickets).values(ticket).returning();
    return result[0] ?? null;
  } catch (error) { 
    console.error("Error ticket:", error); 
    throw error; 
  }
}

export async function getAllSupportTickets() {
  return await db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
}

export async function getSupportTicketsByEmail(email: string) {
  return await db.select().from(supportTickets).where(eq(supportTickets.email, email));
}

export async function updateSupportTicket(id: number, data: any) {
  return await db.update(supportTickets).set(data).where(eq(supportTickets.id, id));
}

// --- FUNCIONES DE KNOWLEDGE BASE (Cascarones para evitar error de compilación) ---
// Como ahora usas JSON en el cliente, estas funciones ya no se usan, 
// pero el servidor las necesita exportadas para arrancar.

export async function getAllKnowledgeBaseArticles() {
  return []; 
}

export async function getKnowledgeBaseByCategory(category: string) {
  return [];
}

export async function searchKnowledgeBase(searchTerm: string): Promise<KnowledgeBaseArticle[]> {
  // Mantenemos la estructura por si el servidor la llama, aunque devuelva vacío
  return [];
}

export async function recordFeedback(articleId: string, isHelpful: boolean) {
  return { success: true };
}
