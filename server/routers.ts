import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies.js";
import { systemRouter } from "./_core/systemRouter.js";
import { publicProcedure, router } from "./_core/trpc.js";
import { z } from "zod";
import {
  createSupportTicket,
  getSupportTicketsByEmail,
  updateSupportTicket,
  getAllSupportTickets,
} from "./db.js";
import { sendTicketConfirmationEmail, sendTicketUpdateEmail } from "./email.js";
import { askFlaxnetIA } from "./ai.js"; 
import { nanoid } from "nanoid";

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

  // NUEVA RUTA PARA EL CHAT CON GEMINI
  chat: router({
    ask: publicProcedure
      .input(z.object({ message: z.string() }))
      .mutation(async ({ input }) => {
        try {
          const reply = await askFlaxnetIA(input.message);
          return { reply };
        } catch (error) {
          console.error("Error tRPC Chat:", error);
          return { reply: "Lo siento, hubo un error en el servidor de chat." };
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
          description: z.string().min(10, "Mínimo 10 caracteres"),
          priority: z.enum(["low", "medium", "high"]).default("medium"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const ticketId = `TKT-${Date.now()}-${nanoid(9)}`;
          const ticket = await createSupportTicket({
            ticketId,
            ...input,
            status: "open",
            emailSent: false,
          });
          if (ticket) await sendTicketConfirmationEmail(ticket);
          return { success: true, ticketId: ticket?.ticketId };
        } catch (error) {
          throw new Error("Error al crear el ticket.");
        }
      }),

    getByEmail: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .query(async ({ input }) => {
        return await getSupportTicketsByEmail(input.email);
      }),

    getAll: publicProcedure.query(async () => {
      return await getAllSupportTickets();
    }),
  }),
});

export type AppRouter = typeof appRouter;
