import { publicProcedure, router } from "./_core/trpc.js";
import { z } from "zod";
import { askFlaxnetIA } from "./ai.js"; // Asegúrate del .js

export const appRouter = router({
  // ... otros routers (system, auth, tickets)

  chat: router({
    ask: publicProcedure
      .input(z.object({ message: z.string() }))
      .mutation(async ({ input }) => {
        try {
          const reply = await askFlaxnetIA(input.message);
          return { reply };
        } catch (error) {
          console.error("Error tRPC Chat:", error);
          return { reply: "Error interno en el servidor de chat." };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
