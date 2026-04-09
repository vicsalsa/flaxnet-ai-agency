import {
  Check,
  HelpCircle,
  Server,
  Cloud,
  Shield,
  Zap,
  Users,
  Code,
  Database,
  AlertCircle,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function N8nFaq() {
  const faqs = [
    {
      question: "¿Es n8n realmente gratis?",
      answer:
        "Sí, el software n8n es gratuito y de código abierto. Si decides autoalojarlo, el único coste será el del proveedor de hosting (VPS). Si prefieres no gestionar servidores, puedes optar por n8n Cloud con planes de pago.",
      icon: Zap,
    },
    {
      question: "¿Cuáles son los requisitos mínimos para autoalojar n8n?",
      answer:
        "Los requisitos oficiales son: 1 CPU, mínimo 320 MB de RAM, soporte para SQLite o PostgreSQL, y Docker o Node.js. Se recomienda mayor RAM para ejecuciones concurrentes y flujos de producción.",
      icon: Server,
    },
    {
      question: "¿Es obligatorio usar Docker?",
      answer:
        "No, Docker no es obligatorio pero es oficialmente recomendado. Aísla la aplicación, previene problemas de compatibilidad y simplifica configuración, despliegue y actualizaciones. La alternativa es instalarlo via Node.js.",
      icon: Cloud,
    },
    {
      question: "¿Puedo usar hosting compartido para n8n?",
      answer:
        "Es posible pero no recomendado. El hosting compartido limita severamente los recursos y no ofrece el control necesario. Lo ideal es un VPS (Servidor Privado Virtual) o hosting en la nube.",
      icon: Shield,
    },
    {
      question: "¿Qué conocimientos técnicos necesito?",
      answer:
        "Para autoalojar n8n necesitas saber: configurar servidores/contenedores Docker, dominios/DNS/proxy inverso, asegurar servidores, y gestionar recursos. Sin estos conocimientos, usa n8n Cloud.",
      icon: Users,
    },
    {
      question: "¿Qué pasa con grandes volúmenes de datos?",
      answer:
        "n8n soporta optimizaciones avanzadas: modelo de workers con Redis/RabbitMQ, procesamiento por lotes (batching), y PostgreSQL en lugar de SQLite para mejor rendimiento.",
      icon: Database,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-4">
            <span className="text-accent text-sm font-semibold">Ayuda</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Preguntas Frecuentes sobre n8n
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas saber antes de implementar n8n en tu empresa.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto text-center">
          <div className="inline-block p-4 bg-accent/20 rounded-full mb-6">
            <HelpCircle className="text-accent" size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Aún tienes dudas?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos y te responderemos en menos
            de 24 horas.
          </p>
          <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg">
            Contactar Soporte
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
