import { eq, like, and, avg, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, supportTickets, InsertSupportTicket, SupportTicket, knowledgeBase, InsertKnowledgeBaseArticle, KnowledgeBaseArticle, articleRatings, InsertArticleRating, ArticleRating } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

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

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a new support ticket
 */
export async function createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create ticket: database not available");
    return null;
  }

  try {
    const result = await db.insert(supportTickets).values(ticket);
    const ticketId = result[0]?.insertId;
    
    if (!ticketId) {
      throw new Error("Failed to create ticket");
    }

    const created = await db.select().from(supportTickets).where(eq(supportTickets.id, ticketId as number)).limit(1);
    return created.length > 0 ? created[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create support ticket:", error);
    throw error;
  }
}

/**
 * Get a support ticket by ID
 */
export async function getSupportTicketById(id: number): Promise<SupportTicket | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get ticket: database not available");
    return null;
  }

  try {
    const result = await db.select().from(supportTickets).where(eq(supportTickets.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get support ticket:", error);
    throw error;
  }
}

/**
 * Get support tickets by email
 */
export async function getSupportTicketsByEmail(email: string): Promise<SupportTicket[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get tickets: database not available");
    return [];
  }

  try {
    const result = await db.select().from(supportTickets).where(eq(supportTickets.email, email));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get support tickets by email:", error);
    throw error;
  }
}

/**
 * Update a support ticket
 */
export async function updateSupportTicket(id: number, updates: Partial<InsertSupportTicket>): Promise<SupportTicket | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update ticket: database not available");
    return null;
  }

  try {
    await db.update(supportTickets).set(updates).where(eq(supportTickets.id, id));
    return getSupportTicketById(id);
  } catch (error) {
    console.error("[Database] Failed to update support ticket:", error);
    throw error;
  }
}

/**
 * Get all support tickets (for admin)
 */
export async function getAllSupportTickets(): Promise<SupportTicket[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get tickets: database not available");
    return [];
  }

  try {
    const result = await db.select().from(supportTickets);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get all support tickets:", error);
    throw error;
  }
}

/**
 * Search knowledge base articles by keywords
 */
export async function searchKnowledgeBase(searchTerm: string): Promise<KnowledgeBaseArticle[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot search knowledge base: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(knowledgeBase)
      .where(
        and(
          eq(knowledgeBase.isActive, true),
          like(knowledgeBase.keywords, `%${searchTerm}%`)
        )
      )
      .limit(5);
    return result;
  } catch (error) {
    console.error("[Database] Failed to search knowledge base:", error);
    return [];
  }
}

/**
 * Get knowledge base articles by category
 */
export async function getKnowledgeBaseByCategory(category: string): Promise<KnowledgeBaseArticle[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get knowledge base: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(knowledgeBase)
      .where(
        and(
          eq(knowledgeBase.isActive, true),
          eq(knowledgeBase.category, category)
        )
      );
    return result;
  } catch (error) {
    console.error("[Database] Failed to get knowledge base by category:", error);
    return [];
  }
}

/**
 * Get all active knowledge base articles
 */
export async function getAllKnowledgeBaseArticles(): Promise<KnowledgeBaseArticle[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get knowledge base: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(knowledgeBase)
      .where(eq(knowledgeBase.isActive, true));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get all knowledge base articles:", error);
    return [];
  }
}

/**
 * Get a specific knowledge base article
 */
export async function getKnowledgeBaseArticle(articleId: string): Promise<KnowledgeBaseArticle | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get article: database not available");
    return null;
  }

  try {
    const result = await db
      .select()
      .from(knowledgeBase)
      .where(eq(knowledgeBase.articleId, articleId))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get knowledge base article:", error);
    return null;
  }
}

/**
 * Update knowledge base article views
 */
export async function incrementArticleViews(articleId: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update article: database not available");
    return;
  }

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

/**
 * Record helpful feedback
 */
export async function recordHelpfulFeedback(articleId: string, isHelpful: boolean): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update feedback: database not available");
    return;
  }

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
 * Create article rating
 */
export async function createArticleRating(rating: InsertArticleRating): Promise<ArticleRating | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create rating: database not available");
    return null;
  }

  try {
    const result = await db.insert(articleRatings).values(rating);
    if (result) {
      const inserted = await db
        .select()
        .from(articleRatings)
        .where(eq(articleRatings.id, result[0].insertId))
        .limit(1);
      return inserted.length > 0 ? inserted[0] : null;
    }
    return null;
  } catch (error) {
    console.error("[Database] Failed to create rating:", error);
    throw error;
  }
}

/**
 * Get average rating for an article
 */
export async function getArticleAverageRating(articleId: string): Promise<number> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get rating: database not available");
    return 0;
  }

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

/**
 * Get all ratings for an article
 */
export async function getArticleRatings(articleId: string): Promise<ArticleRating[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get ratings: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(articleRatings)
      .where(eq(articleRatings.articleId, articleId))
      .orderBy(desc(articleRatings.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get ratings:", error);
    return [];
  }
}

/**
 * Get user's rating for an article
 */
export async function getUserArticleRating(articleId: string, userEmail: string): Promise<ArticleRating | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user rating: database not available");
    return null;
  }

  try {
    const result = await db
      .select()
      .from(articleRatings)
      .where(and(eq(articleRatings.articleId, articleId), eq(articleRatings.userEmail, userEmail)))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get user rating:", error);
    return null;
  }
}

/**
 * Get rating statistics for an article
 */
export async function getArticleRatingStats(articleId: string): Promise<{
  averageRating: number;
  totalRatings: number;
  ratingDistribution: Record<number, number>;
}> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get rating stats: database not available");
    return { averageRating: 0, totalRatings: 0, ratingDistribution: {} };
  }

  try {
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
  } catch (error) {
    console.error("[Database] Failed to get rating stats:", error);
    return { averageRating: 0, totalRatings: 0, ratingDistribution: {} };
  }
}
