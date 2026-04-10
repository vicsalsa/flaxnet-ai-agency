import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// Importaciones locales con .js para Vercel
import { registerOAuthRoutes } from "./oauth.js";
import { appRouter } from "../routers.js";
import { createContext } from "./context.js";
import { serveStatic, setupVite } from "./vite.js";
import { askFlaxnetIA } from "../ai.js"; // IMPORTAMOS TU LÓGICA DE IA

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // --- RUTA DEL CHAT (AQUÍ ESTÁ LA MAGIA) ---
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) return res.status(400).json({ error: "Falta el mensaje" });

      // Llamamos a la función que lee el JSON y usa Gemini
      const reply = await askFlaxnetIA(message);
      res.json({ reply });
    } catch (error) {
      console.error("Error en API Chat:", error);
      res.status(500).json({ error: "La IA no responde" });
    }
  });

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
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch(console.error);
