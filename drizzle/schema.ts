import { integer, pgEnum, pgTable, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

// --- Definición de Enums para Postgres ---
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);
export const statusEnum = pgEnum("status", ["open", "in-progress", "resolved"]);

// --- Tabla de Usuarios ---
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

// --- Tabla de Tickets de Soporte ---
export const supportTickets = pgTable("support_tickets", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  ticketId: varchar("ticketId", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  category: varchar("category", { length: 64 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description").notNull(),
  priority: priorityEnum("priority").default("medium").notNull(),
  status: statusEnum("status").default("open").notNull(),
  emailSent: boolean("email_sent").default(false).notNull(),
  emailSentAt: timestamp("email_sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Tabla de Base de Conocimiento (Donde irá tu info técnica) ---
export const knowledgeBase = pgTable("knowledge_base", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  articleId: varchar("articleId", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  keywords: text("keywords").notNull(),
  content: text("content").notNull(),
  summary: text("summary"),
  isActive: boolean("is_active").default(true).notNull(),
  views: integer("views").default(0).notNull(),
  helpful: integer("helpful").default(0).notNull(),
  notHelpful: integer("not_helpful").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Tabla de Valoraciones ---
export const articleRatings = pgTable("article_ratings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  articleId: varchar("articleId", { length: 64 }).notNull(),
  userEmail: varchar("userEmail", { length: 320 }).notNull(),
  rating: integer("rating").notNull(), 
  review: text("review"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});