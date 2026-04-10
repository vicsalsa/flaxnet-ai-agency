import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Plus } from "lucide-react";
import TicketForm from "./TicketForm";
import KBSuggestions from "./KBSuggestions";
import { trpc } from "@/lib/trpc";
import { usePageContext } from "@/hooks/usePageContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const pageContext = usePageContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! 👋 Soy el asistente de Flaxnet IA. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTicketForm]);

  // FUNCIÓN PRINCIPAL: Ahora conecta con la IA real en el servidor
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userQuery = inputValue.trim();

    // 1. Añadir el mensaje del usuario a la interfaz
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userQuery,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // 2. Lógica para detectar si el usuario quiere un ticket explícitamente
    const lowerInput = userQuery.toLowerCase();
    const wantsTicket = 
      lowerInput.includes("ticket") || 
      lowerInput.includes("soporte") || 
      lowerInput.includes("consulta compleja");

    if (wantsTicket) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Perfecto, voy a ayudarte a crear un ticket de soporte. Así nuestro equipo podrá atender tu consulta de manera personalizada.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setTimeout(() => setShowTicketForm(true), 500);
      setIsLoading(false);
      return;
    }

    try {
      // 3. LLAMADA A LA API DE IA EN VERCEL
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userQuery }),
      });

      if (!response.ok) throw new Error("Error en el servidor");

      const data = await response.json();

      // 4. Mostrar la respuesta real de Gemini
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "No he podido procesar tu respuesta.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("[ChatBot] Fallo de conexión:", error);
      
      // Fallback: Si el servidor falla, mostramos el mensaje de soporte
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Gracias por tu pregunta. Para consultas más específicas sobre ese tema, te recomendamos crear un ticket de soporte para que un experto te responda. ¿Quieres crear uno?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTicketCreated = (ticketId: string) => {
    const confirmMessage: Message = {
      id: (Date.now() + 2).toString(),
      text: `¡Excelente! Tu ticket #${ticketId} ha sido creado. Nuestro equipo se pondrá en contacto contigo pronto por email.`,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, confirmMessage]);
    setShowTicketForm(false);
  };

  const handleCreateTicketClick = () => {
    const message: Message = {
      id: Date.now().toString(),
      text: "Quiero crear un ticket de soporte",
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
    
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: "Perfecto, voy a ayudarte a crear un ticket de soporte. Así nuestro equipo podrá atender tu consulta de manera personalizada.",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botResponse]);
    setTimeout(() => setShowTicketForm(true), 500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-accent/50 transition-all duration-300 group hover:scale-110"
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <X size={24} className="text-accent-foreground" />
        ) : (
          <MessageCircle size={24} className="text-accent-foreground group-hover:animate-bounce" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] h-96 max-h-[70vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-accent/20 to-secondary/20 border-b border-border p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground">Asistente Flaxnet IA</h3>
              <p className="text-xs text-muted-foreground">Potenciado por Gemini 1.5 Flash</p>
            </div>
            {!showTicketForm && (
              <button
                onClick={handleCreateTicketClick}
                className="p-2 hover:bg-accent/20 rounded-lg transition-colors"
                title="Crear ticket de soporte"
              >
                <Plus size={18} className="text-accent" />
              </button>
            )}
          </div>

          {showTicketForm ? (
            <div className="flex-1 overflow-y-auto p-4">
              <TicketForm
                onTicketCreated={handleTicketCreated}
                onCancel={() => setShowTicketForm(false)}
              />
            </div>
          ) : (
            <>
              {showSuggestions && isOpen && (
                <KBSuggestions
                  onArticleClick={(article) => {
                    setInputValue(article.title);
                    setShowSuggestions(false);
                  }}
                  onClose={() => setShowSuggestions(false)}
                />
              )}
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-accent text-accent-foreground rounded-br-none"
                          : "bg-muted text-foreground rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="border-t border-border p-4 bg-background">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe sobre Gemma 4, n8n..."
                    className="flex-1 px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-accent transition-all text-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="p-2 bg-accent text-accent-foreground rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}