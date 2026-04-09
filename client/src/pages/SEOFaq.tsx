import {
  Clock,
  CreditCard,
  Users,
  Globe,
  Brain,
  Link,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function SEOFaq() {
  const faqs = [
    {
      question: "¿Cuánto tiempo tarda el SEO en mostrar resultados?",
      answer:
        "El SEO es una estrategia a medio y largo plazo. Por lo general, tarda entre 3 y 6 meses en mostrar resultados medibles en sitios web nuevos. Para alcanzar un éxito sostenible se requiere un esfuerzo constante durante 12-24 meses.",
      icon: Clock,
    },
    {
      question: "¿Cuál es la diferencia entre SEO y publicidad de pago (SEM)?",
      answer:
        "El SEM genera visibilidad inmediata pero requiere pagar por cada clic y el tráfico desaparece al detener la inversión. El SEO no tiene coste por visita y construye tráfico orgánico sostenible y rentable a largo plazo.",
      icon: CreditCard,
    },
    {
      question: "¿Por qué contratar a una agencia profesional?",
      answer:
        "Una agencia aporta conocimientos especializados, experiencia y recursos para acelerar resultados. Es crítico en sectores competitivos o sitios complejos donde los detalles técnicos marcan la diferencia.",
      icon: Users,
    },
    {
      question: "¿Qué diferencias hay entre SEO On-Page, Off-Page y Técnico?",
      answer:
        "On-Page: control interno (contenido, keywords, encabezados). Off-Page: factores externos (backlinks, menciones de marca). Técnico: estructura, velocidad, HTTPS, indexabilidad.",
      icon: Globe,
    },
    {
      question: "¿Cómo ha cambiado el SEO con la Inteligencia Artificial?",
      answer:
        "La búsqueda evolucionó: Google AI Overviews y ChatGPT dan respuestas directas. En 2026, el SEO busca ser citado como fuente por la IA. Fundamental: demostrar experiencia real (EEAT), información estructurada y datos fiables.",
      icon: Brain,
    },
    {
      question: "¿Siguen siendo importantes los backlinks hoy en día?",
      answer:
        "Sí, son uno de los principales factores de posicionamiento. La estrategia cambió: calidad y relevancia topical importan más que cantidad. Un enlace de alta autoridad de tu sector vale más que decenas de baja calidad.",
      icon: Link,
    },
    {
      question: "¿Qué es la autoridad de dominio y de página?",
      answer:
        "Autoridad de dominio evalúa la reputación global de tu sitio. Autoridad de página mide la fuerza de una URL concreta. Mayor autoridad = más fácil posicionar nuevas palabras clave frente a la competencia.",
      icon: BarChart3,
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
            Preguntas Frecuentes sobre SEO
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resolvemos tus dudas sobre posicionamiento web y marketing digital.
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
            Contactar Ahora
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
