import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Plus } from "lucide-react";
import TicketForm from "./TicketForm";
import KBSuggestions from "./KBSuggestions";
import { trpc } from "@/lib/trpc"; // Importamos tRPC

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! 👋 Soy el asistente de Flaxnet IA. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Definimos la mutación de tRPC para el chat
  const chatMutation = trpc.chat.ask.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTicketForm]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userQuery = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userQuery,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      // Llamada real a la IA a través de tRPC
      const response = await chatMutation.mutateAsync({ message: userQuery });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.reply,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      // Mensaje de fallback en caso de error técnico
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Lo siento, tengo problemas para conectar. Si es urgente, por favor crea un ticket de soporte.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
      >
        {isOpen ? <X size={24} className="text-accent-foreground" /> : <MessageCircle size={24} className="text-accent-foreground" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] h-96 bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-muted p-4 border-b border-border flex justify-between items-center">
            <h3 className="font-bold">Asistente Flaxnet IA</h3>
            {!showTicketForm && (
              <button onClick={() => setShowTicketForm(true)} className="text-accent">
                <Plus size={18} />
              </button>
            )}
          </div>

          {showTicketForm ? (
            <div className="flex-1 overflow-y-auto p-4">
              <TicketForm onTicketCreated={() => setShowTicketForm(false)} onCancel={() => setShowTicketForm(false)} />
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === "user" ? "bg-accent text-accent-foreground" : "bg-muted"}`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {chatMutation.isPending && <p className="text-xs text-muted-foreground animate-pulse">Pensando...</p>}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-background">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Pregúntame sobre Gemma 4..."
                    className="flex-1 bg-muted p-2 rounded-md outline-none text-sm"
                  />
                  <button type="submit" className="p-2 bg-accent text-accent-foreground rounded-md">
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