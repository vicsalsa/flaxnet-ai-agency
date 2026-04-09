import { generateAIResponse } from "./ai";

// Dentro de tu función de registro de rutas (donde esté 'app' o 'router')
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Falta el mensaje" });

    const reply = await generateAIResponse(message);
    res.json({ reply });
  } catch (error) {
    console.error("Error en IA:", error);
    res.status(500).json({ error: "La IA está descansando, intenta luego." });
  }
});