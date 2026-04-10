import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { registerOAuthRoutes } from "./oauth.js";
import { appRouter } from "../routers.js";
import { createContext } from "./context.js";
import { serveStatic, setupVite } from "./vite.js";

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  registerOAuthRoutes(app);

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Development server running on http://localhost:${port}`);
    });
  } else {
    serveStatic(app);
  }

  // IMPORTANTE: Devolvemos la app para que Vercel pueda manejarla
  return app;
}

// Exportamos la ejecución de la app para Vercel
const app = await startServer();
export default app;
