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

// Cliente de conexión de Postgres
const queryClient = postgres(process.env.DATABASE_URL!);
const _db = drizzle(queryClient);

/**
 * En Postgres, ya no necesitamos "getDb" asíncrono de la misma forma,
 * pero mantenemos la estructura para no romper tu código existente.
 */
export async function getDb() {
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, any> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    textFields.forEach((field) => {
      if (user[field] !== undefined) {
        const val = user[field] ?? null;
        values[field] = val;
        updateSet[field] = val;
      }
    });

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    // Sintaxis de Postgres: onConflictDoUpdate
    await db.insert(users)
      .values(values)
      .onConflictDoUpdate({
        target: users.openId,
        set: updateSet,
      });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a new support ticket
 */
export async function createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket | null> {
  const db = await getDb();
  try {
    // En Postgres usamos .returning() para obtener el objeto insertado
    const result = await db.insert(supportTickets).values(ticket).returning();
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create support ticket:", error);
    throw error;
  }
}

export async function getSupportTicketById(id: number): Promise<SupportTicket | null> {
  const db = await getDb();
  const result = await db.select().from(supportTickets).where(eq(supportTickets.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getSupportTicketsByEmail(email: string): Promise<SupportTicket[]> {
  const db = await getDb();
  return await db.select().from(supportTickets).where(eq(supportTickets.email, email));
}

export async function updateSupportTicket(id: number, updates: Partial<InsertSupportTicket>): Promise<SupportTicket | null> {
  const db = await getDb();
  try {
    await db.update(supportTickets).set(updates).where(eq(supportTickets.id, id));
    return getSupportTicketById(id);
  } catch (error) {
    console.error("[Database] Failed to update support ticket:", error);
    throw error;
  }
}

export async function getAllSupportTickets(): Promise<SupportTicket[]> {
  const db = await getDb();
  return await db.select().from(supportTickets);
}

/**
 * Knowledge Base
 */
export async function searchKnowledgeBase(searchTerm: string): Promise<KnowledgeBaseArticle[]> {
  const db = await getDb();
  try {
    return await db
      .select()
      .from(knowledgeBase)
      .where(
        and(
          eq(knowledgeBase.isActive, true),
          like(knowledgeBase.keywords, `%${searchTerm}%`)
        )
      )
      .limit(5);
  } catch (error) {
    console.error("[Database] Failed to search knowledge base:", error);
    return [];
  }
}

export async function getKnowledgeBaseByCategory(category: string): Promise<KnowledgeBaseArticle[]> {
  const db = await getDb();
  return await db
    .select()
    .from(knowledgeBase)
    .where(
      and(
        eq(knowledgeBase.isActive, true),
        eq(knowledgeBase.category, category)
      )
    );
}

export async function getAllKnowledgeBaseArticles(): Promise<KnowledgeBaseArticle[]> {
  const db = await getDb();
  return await db
    .select()
    .from(knowledgeBase)
    .where(eq(knowledgeBase.isActive, true));
}

export async function getKnowledgeBaseArticle(articleId: string): Promise<KnowledgeBaseArticle | null> {
  const db = await getDb();
  const result = await db
    .select()
    .from(knowledgeBase)
    .where(eq(knowledgeBase.articleId, articleId))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function incrementArticleViews(articleId: string): Promise<void> {
  const db = await getDb();
  try {
    const article = await getKnowledgeBaseArticle(articleId);
    if (article) {
      await db
        .update(knowledgeBase)
        .set({ views: (article.views || 0) + 1 })
        .where(eq(knowledgeBase.articleId, articleId));
    }
  } catch (error) {
    console.error("[Database] Failed to increment article views:", error);
  }
}

export async function recordHelpfulFeedback(articleId: string, isHelpful: boolean): Promise<void> {
  const db = await getDb();
  try {
    const article = await getKnowledgeBaseArticle(articleId);
    if (article) {
      if (isHelpful) {
        await db
          .update(knowledgeBase)
          .set({ helpful: (article.helpful || 0) + 1 })
          .where(eq(knowledgeBase.articleId, articleId));
      } else {
        await db
          .update(knowledgeBase)
          .set({ notHelpful: (article.notHelpful || 0) + 1 })
          .where(eq(knowledgeBase.articleId, articleId));
      }
    }
  } catch (error) {
    console.error("[Database] Failed to record feedback:", error);
  }
}

/**
 * Ratings
 */
export async function createArticleRating(rating: InsertArticleRating): Promise<ArticleRating | null> {
  const db = await getDb();
  try {
    const result = await db.insert(articleRatings).values(rating).returning();
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create rating:", error);
    throw error;
  }
}

export async function getArticleAverageRating(articleId: string): Promise<number> {
  const db = await getDb();
  try {
    const result = await db
      .select({ avgRating: avg(articleRatings.rating) })
      .from(articleRatings)
      .where(eq(articleRatings.articleId, articleId));
    
    return result.length > 0 && result[0].avgRating ? parseFloat(result[0].avgRating.toString()) : 0;
  } catch (error) {
    console.error("[Database] Failed to get average rating:", error);
    return 0;
  }
}

export async function getArticleRatings(articleId: string): Promise<ArticleRating[]> {
  const db = await getDb();
  return await db
    .select()
    .from(articleRatings)
    .where(eq(articleRatings.articleId, articleId))
    .orderBy(desc(articleRatings.createdAt));
}

export async function getUserArticleRating(articleId: string, userEmail: string): Promise<ArticleRating | null> {
  const db = await getDb();
  const result = await db
    .select()
    .from(articleRatings)
    .where(and(eq(articleRatings.articleId, articleId), eq(articleRatings.userEmail, userEmail)))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getArticleRatingStats(articleId: string): Promise<{
  averageRating: number;
  totalRatings: number;
  ratingDistribution: Record<number, number>;
}> {
  const ratings = await getArticleRatings(articleId);
  const averageRating = await getArticleAverageRating(articleId);
  
  const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratings.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingDistribution[r.rating]++;
    }
  });

  return {
    averageRating: Math.round(averageRating * 10) / 10,
    totalRatings: ratings.length,
    ratingDistribution,
  };
}