import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies.js";
import { systemRouter } from "./_core/systemRouter.js";
import { publicProcedure, router } from "./_core/trpc.js";
import { z } from "zod";
// AÑADIDO .js A TODO
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
  
  // RUTA PARA EL CHAT
  chat: router({
    ask: publicProcedure
      .input(z.object({ message: z.string() }))
      .mutation(async ({ input }) => {
        const reply = await askFlaxnetIA(input.message);
        return { reply };
      }),
  }),

  tickets: router({
    create: publicProcedure
      .input(z.object({
          name: z.string().min(1),
          email: z.string().email(),
          category: z.string().min(1),
          subject: z.string().min(1),
          description: z.string().min(10),
          priority: z.enum(["low", "medium", "high"]).default("medium"),
      }))
      .mutation(async ({ input }) => {
          const ticketId = `TKT-${Date.now()}-${nanoid(9)}`;
          const ticket = await createSupportTicket({
            ticketId,
            ...input,
            status: "open",
            emailSent: false,
          });
          if (ticket) await sendTicketConfirmationEmail(ticket);
          return { success: true, ticketId };
      }),
    // ... resto de procedimientos de tickets (getByEmail, getAll, etc)
  }),
});

export type AppRouter = typeof appRouter;
