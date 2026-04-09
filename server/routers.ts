import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createSupportTicket, getSupportTicketsByEmail, updateSupportTicket, getAllSupportTickets, searchKnowledgeBase, getKnowledgeBaseByCategory, getAllKnowledgeBaseArticles, getKnowledgeBaseArticle, incrementArticleViews, recordHelpfulFeedback, createArticleRating, getArticleAverageRating, getArticleRatings, getUserArticleRating, getArticleRatingStats } from "./db";
import { sendTicketConfirmationEmail, sendTicketUpdateEmail } from "./email";
import { nanoid } from "nanoid";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  knowledgeBase: router({
    search: publicProcedure
      .input(z.object({ query: z.string().min(1) }))
      .query(async ({ input }) => {
        try {
          const articles = await searchKnowledgeBase(input.query);
          return articles;
        } catch (error) {
          console.error("[API] Error searching knowledge base:", error);
          return [];
        }
      }),

    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        try {
          const articles = await getKnowledgeBaseByCategory(input.category);
          return articles;
        } catch (error) {
          console.error("[API] Error fetching articles by category:", error);
          return [];
        }
      }),

    getAll: publicProcedure.query(async () => {
      try {
        const articles = await getAllKnowledgeBaseArticles();
        return articles;
      } catch (error) {
        console.error("[API] Error fetching all articles:", error);
        return [];
      }
    }),

    getArticle: publicProcedure
      .input(z.object({ articleId: z.string() }))
      .query(async ({ input }) => {
        try {
          const article = await getKnowledgeBaseArticle(input.articleId);
          if (article) {
            await incrementArticleViews(input.articleId);
          }
          return article;
        } catch (error) {
          console.error("[API] Error fetching article:", error);
          return null;
        }
      }),

    recordFeedback: publicProcedure
      .input(z.object({ articleId: z.string(), isHelpful: z.boolean() }))
      .mutation(async ({ input }) => {
        try {
          await recordHelpfulFeedback(input.articleId, input.isHelpful);
          return { success: true };
        } catch (error) {
          console.error("[API] Error recording feedback:", error);
          return { success: false };
        }
      }),

    createRating: publicProcedure
      .input(
        z.object({
          articleId: z.string(),
          rating: z.number().min(1).max(5),
          userEmail: z.string().email(),
          review: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const result = await createArticleRating({
            articleId: input.articleId,
            rating: input.rating,
            userEmail: input.userEmail,
            review: input.review,
          });
          return { success: !!result, rating: result };
        } catch (error) {
          console.error("[API] Error creating rating:", error);
          return { success: false };
        }
      }),

    getAverageRating: publicProcedure
      .input(z.object({ articleId: z.string() }))
      .query(async ({ input }) => {
        try {
          const average = await getArticleAverageRating(input.articleId);
          return average;
        } catch (error) {
          console.error("[API] Error fetching average rating:", error);
          return 0;
        }
      }),

    getRatings: publicProcedure
      .input(z.object({ articleId: z.string() }))
      .query(async ({ input }) => {
        try {
          const ratings = await getArticleRatings(input.articleId);
          return ratings;
        } catch (error) {
          console.error("[API] Error fetching ratings:", error);
          return [];
        }
      }),

    getRatingStats: publicProcedure
      .input(z.object({ articleId: z.string() }))
      .query(async ({ input }) => {
        try {
          const stats = await getArticleRatingStats(input.articleId);
          return stats;
        } catch (error) {
          console.error("[API] Error fetching rating stats:", error);
          return { averageRating: 0, totalRatings: 0, ratingDistribution: {} };
        }
      }),
  }),

  tickets: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "El nombre es requerido"),
          email: z.string().email("Email inválido"),
          phone: z.string().optional(),
          category: z.string().min(1, "La categoría es requerida"),
          subject: z.string().min(1, "El asunto es requerido"),
          description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
          priority: z.enum(["low", "medium", "high"]).default("medium"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const ticketId = `TKT-${Date.now()}-${nanoid(9)}`;
          
          const ticket = await createSupportTicket({
            ticketId,
            name: input.name,
            email: input.email,
            phone: input.phone,
            category: input.category,
            subject: input.subject,
            description: input.description,
            priority: input.priority,
            status: "open",
            emailSent: false,
          });

          if (!ticket) {
            throw new Error("Failed to create ticket");
          }

          // Send confirmation email asynchronously
          const emailSent = await sendTicketConfirmationEmail(ticket);
          
          // Update ticket with email sent status
          if (emailSent) {
            await updateSupportTicket(ticket.id, {
              emailSent: true,
              emailSentAt: new Date(),
            });
          }

          return {
            success: true,
            ticketId: ticket.ticketId,
            message: "Ticket creado exitosamente. Se ha enviado una confirmación por email.",
          };
        } catch (error) {
          console.error("[API] Error creating ticket:", error);
          throw new Error("Error al crear el ticket. Por favor, intenta de nuevo.");
        }
      }),

    getByEmail: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        try {
          const tickets = await getSupportTicketsByEmail(input.email);
          return tickets;
        } catch (error) {
          console.error("[API] Error fetching tickets:", error);
          return [];
        }
      }),

    getAll: publicProcedure.query(async () => {
      try {
        const tickets = await getAllSupportTickets();
        return tickets;
      } catch (error) {
        console.error("[API] Error fetching all tickets:", error);
        return [];
      }
    }),

    updateStatus: publicProcedure
      .input(
        z.object({
          ticketId: z.number(),
          status: z.enum(["open", "in-progress", "resolved"]),
          updateMessage: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const updated = await updateSupportTicket(input.ticketId, {
            status: input.status,
          });

          if (!updated) {
            throw new Error("Ticket not found");
          }

          // Send update email if message provided
          if (input.updateMessage) {
            await sendTicketUpdateEmail(updated, input.updateMessage);
          }

          return {
            success: true,
            message: "Ticket actualizado exitosamente.",
          };
        } catch (error) {
          console.error("[API] Error updating ticket:", error);
          throw new Error("Error al actualizar el ticket.");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
