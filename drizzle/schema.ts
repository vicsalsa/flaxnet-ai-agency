import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userLoginMethodEnum = pgEnum("login_method", [
  "google",
  "email",
  "github",
]);

export const userRoleEnum = pgEnum("user_role", ["user", "admin", "agent"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("open_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  loginMethod: userLoginMethodEnum("login_method").default("google"),
  role: userRoleEnum("user_role").default("user"),
  lastSignedIn: timestamp("last_signed_in"),
});

export const supportTickets = pgTable("support_tickets", {
  id: serial("id").primaryKey(),
  ticketId: varchar("ticket_id", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  category: varchar("category", { length: 100 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).default("open"),
  priority: varchar("priority", { length: 20 }).default("medium"),
  emailSent: boolean("email_sent").default(false),
  emailSentAt: timestamp("email_sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Type exports for inserts
export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertSupportTicket = typeof supportTickets.$inferInsert;
export type SupportTicket = typeof supportTickets.$inferSelect;

// Note: KnowledgeBase and articleRatings removed - now using JSON-based system
