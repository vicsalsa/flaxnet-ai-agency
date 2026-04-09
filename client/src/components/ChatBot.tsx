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

const FAQ_RESPONSES: Record<string, string> = {
  // Preguntas sobre servicios
  "n8n|automatización|flujos": "Ofrecemos automatización profesional con n8n, integrando más de 500 aplicaciones. Podemos automatizar procesos complejos, reducir tareas manuales hasta un 70% y mejorar la eficiencia operativa de tu empresa. ¿Quieres conocer más detalles?",
  
  "mcp|integración|ia": "Model Context Protocol (MCP) permite que los modelos de IA accedan de forma segura a tus datos empresariales. Implementamos integraciones robustas que potencian tus agentes de IA con contexto completo. ¿Necesitas más información?",
  
  "agentes|autónomos|ia": "Creamos agentes de IA que trabajan 24/7 de forma autónoma, resolviendo tareas complejas sin intervención humana. Desde atención al cliente hasta análisis de datos, nuestros agentes escalan tu negocio. ¿Quieres saber cómo implementarlos?",
  
  "diseño|web|apps": "Diseñamos sitios web y aplicaciones modernas, responsivas y optimizadas para conversión. Cada interfaz está pensada para mejorar la experiencia del usuario y aumentar tus conversiones. ¿Tienes un proyecto en mente?",
  
  "seo|posicionamiento|google": "Nuestras estrategias SEO avanzadas combinan análisis de IA con experiencia humana. Posicionamos tu sitio en las primeras posiciones de Google para palabras clave con alto potencial de conversión. ¿Quieres mejorar tu visibilidad online?",
  
  "marketing|digital": "Implementamos campañas de marketing digital inteligentes que generan leads y conversiones con ROI medible. Usamos IA para optimizar cada aspecto de tu estrategia. ¿Hablamos de tu estrategia?",
  
  // Preguntas sobre precios y presupuesto
  "precio|costo|presupuesto|cuánto": "Nuestros precios son personalizados según el alcance de tu proyecto. Te ofrecemos una consulta gratuita para analizar tus necesidades y darte un presupuesto exacto. ¿Quieres agendar una consulta?",
  
  "gratis|free|consulta": "¡Sí! Ofrecemos una consulta gratuita de 30 minutos. Analizamos tu proyecto, tus objetivos y te presentamos una propuesta personalizada sin compromiso. ¿Quieres agendar la tuya?",
  
  // Preguntas sobre tiempo
  "tiempo|cuánto tarda|plazo|duración": "El tiempo de implementación depende de la complejidad del proyecto. Desde 1-2 semanas para proyectos simples hasta 2-3 meses para soluciones empresariales complejas. En la consulta te damos un cronograma exacto.",
  
  // Preguntas sobre experiencia
  "experiencia|casos|proyectos|clientes": "Hemos completado más de 500 proyectos exitosos con empresas de diversos sectores. Nuestro equipo tiene experiencia en automatización, IA, diseño web y SEO. ¿Quieres ver algunos casos de éxito?",
  
  // Preguntas de contacto
  "contacto|teléfono|email|cómo contactar": "Puedes contactarnos de varias formas:\n📧 Email: info@flaxnet.es\n📞 Teléfono: +34 (900) 000-000\n💬 Formulario de contacto en nuestra web\n¿Prefieres que te contactemos nosotros?",
  
  // Preguntas generales
  "hola|hi|buenos días|buenas noches": "¡Hola! 👋 Bienvenido a Flaxnet IA. Soy tu asistente virtual. ¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre nuestros servicios, precios, procesos y más.",
  
  "ayuda|help|qué puedes hacer": "Puedo ayudarte con:\n✓ Información sobre nuestros servicios\n✓ Preguntas sobre precios y presupuestos\n✓ Tiempos de implementación\n✓ Contacto y disponibilidad\n✓ Casos de éxito\n✓ Crear un ticket de soporte para consultas complejas\n\n¿Hay algo específico que quieras saber?",
  
  "gracias|thanks": "¡De nada! 😊 Si tienes más preguntas, no dudes en escribir. Estamos aquí para ayudarte.",
  
  "ticket|soporte|consulta compleja": "Si tienes una consulta más compleja, puedo ayudarte a crear un ticket de soporte. Nuestro equipo revisará tu caso y te contactará en breve. ¿Quieres crear un ticket?",
};

function findBestResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  for (const [keywords, response] of Object.entries(FAQ_RESPONSES)) {
    const keywordList = keywords.split("|");
    if (keywordList.some(keyword => lowerMessage.includes(keyword))) {
      return response;
    }
  }
  
  return "Gracias por tu pregunta. Para consultas más específicas, te recomendamos crear un ticket de soporte. ¿Quieres crear uno?";
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Check if user wants to create a ticket
    const lowerInput = inputValue.toLowerCase();
    const wantsTicket = 
      lowerInput.includes("ticket") || 
      lowerInput.includes("soporte") || 
      lowerInput.includes("consulta compleja") ||
      lowerInput.includes("problema complejo");

    // Simulate bot response delay
    setTimeout(() => {
      let botResponse = findBestResponse(inputValue);
      
      // Optionally search knowledge base for more context
      // This can be enhanced later with async KB search
      
      if (wantsTicket) {
        botResponse = "Perfecto, voy a ayudarte a crear un ticket de soporte. Así nuestro equipo podrá atender tu consulta de manera personalizada.";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      
      if (wantsTicket) {
        setTimeout(() => setShowTicketForm(true), 500);
      }
      
      setIsLoading(false);
    }, 500);
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
      {/* Chat Button */}
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

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] h-96 max-h-[70vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-accent/20 to-secondary/20 border-b border-border p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-foreground">Asistente Flaxnet IA</h3>
              <p className="text-xs text-muted-foreground">Responde preguntas 24/7</p>
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

          {/* Content */}
          {showTicketForm ? (
            // Ticket Form View
            <div className="flex-1 overflow-y-auto p-4">
              <TicketForm
                onTicketCreated={handleTicketCreated}
                onCancel={() => setShowTicketForm(false)}
              />
            </div>
          ) : (
            // Chat View
            <>
              {/* KB Suggestions */}
              {showSuggestions && isOpen && (
                <KBSuggestions
                  onArticleClick={(article) => {
                    const message: Message = {
                      id: Date.now().toString(),
                      text: `Estoy interesado en: ${article.title}`,
                      sender: "user",
                      timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, message]);
                    setShowSuggestions(false);
                  }}
                  onClose={() => setShowSuggestions(false)}
                />
              )}
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
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

              {/* Input */}
              <form onSubmit={handleSendMessage} className="border-t border-border p-4 bg-background">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu pregunta..."
                    className="flex-1 px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="p-2 bg-accent text-accent-foreground rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Enviar mensaje"
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
