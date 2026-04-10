import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  createSupportTicket,
  getSupportTicketsByEmail,
  updateSupportTicket,
  getAllSupportTickets,
} from "./db";
import { sendTicketConfirmationEmail, sendTicketUpdateEmail } from "./email";
import { nanoid } from "nanoid";
import { askFlaxnetIA } from "./ai.js"; // IMPORTANTE: Importamos la lógica de Gemini

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // --- NUEVO ROUTER DE CHAT ---
  chat: router({
    ask: publicProcedure
      .input(z.object({ message: z.string() }))
      .mutation(async ({ input }) => {
        try {
          const reply = await askFlaxnetIA(input.message);
          return { reply };
        } catch (error) {
          console.error("Error en tRPC Chat:", error);
          throw new Error("La IA no pudo procesar tu solicitud.");
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

          if (!ticket) throw new Error("Failed to create ticket");

          const emailSent = await sendTicketConfirmationEmail(ticket);
          if (emailSent) {
            await updateSupportTicket(ticket.id, {
              emailSent: true,
              emailSentAt: new Date(),
            });
          }

          return {
            success: true,
            ticketId: ticket.ticketId,
            message: "Ticket creado exitosamente.",
          };
        } catch (error) {
          console.error("[API] Error creating ticket:", error);
          throw new Error("Error al crear el ticket.");
        }
      }),

    getByEmail: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        try {
          return await getSupportTicketsByEmail(input.email);
        } catch (error) {
          return [];
        }
      }),

    getAll: publicProcedure.query(async () => {
      try {
        return await getAllSupportTickets();
      } catch (error) {
        return [];
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
