import {
  ArrowRight,
  Check,
  Brain,
  Zap,
  Clock,
  Shield,
  MessageSquare,
  BarChart3,
  Users,
  Globe,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AgentesIA() {
  const features = [
    {
      icon: Brain,
      title: "Aprendizaje Continuo",
      description:
        "Los agentes mejoran con cada interacción, learns de patrones y optimizan sus respuestas.",
    },
    {
      icon: Clock,
      title: "Disponibilidad 24/7",
      description:
        "Trabajan sin descansar, Holidays o fines de semana. Siempre-online para tu negocio.",
    },
    {
      icon: Zap,
      title: "Escalabilidad Ilimitada",
      description:
        "Manejan miles de solicitudes simultáneamente sin costo adicional por hora extra.",
    },
    {
      icon: Shield,
      title: "Consistencia Total",
      description:
        "Siguen protocolos exactamente. Sin errores humanos por fatiga o distracción.",
    },
    {
      icon: MessageSquare,
      title: "Comunicación Multicanal",
      description:
        "Email, chat, WhatsApp, voz. Cada cliente usa su canal preferido.",
    },
    {
      icon: BarChart3,
      title: "Análisis en Tiempo Real",
      description:
        "Métricas completas de rendimiento, satisfaction y oportunidades de mejora.",
    },
  ];

  const useCases = [
    {
      title: "Atención al Cliente",
      description:
        "Responden preguntas, resuelven problemas y escalan casos complejos al equipo humano.",
    },
    {
      title: "Ventas y Lead Qualification",
      description:
        "Contactan leads, qualification criteria y agenda citas con clientes potenciales.",
    },
    {
      title: "Soporte Técnico",
      description:
        "Diagnostican issues, guían troubleshooting y crean tickets automaticamente.",
    },
    {
      title: "Gestión de Pedidos",
      description:
        "Rastrean pedidos, actualizan status y resuelven incidencias de envío.",
    },
    {
      title: "Recursos Humanos",
      description:
        "Responden preguntas de empleados, gestionan vacaciones y onboarding.",
    },
    {
      title: "Análisis de Datos",
      description:
        "Generan informes, detectan anomalías y alertan sobre patrones importantes.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-4">
            <span className="text-accent text-sm font-semibold">
              Inteligencia Artificial
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Agentes de IA Autónomos
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trabajadores digitales que operan 24/7, resolviendo tareas complejas
            sin intervención humana. Desde atención al cliente hasta análisis de
            datos.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/ai-agents-collaboration-bdf3hkEZmQAidhhRuMiEE4.webp"
            alt="Agentes de IA trabajando"
            className="w-full rounded-2xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Características Principales
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Por qué elegir nuestros agentes de IA para tu empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Casos de Uso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aplicaciones disponibles para todo tipo de industrias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all"
              >
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Cómo Funciona?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tres pasos para tener tu agente funcionando.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Definición",
                description:
                  "Analizamos tus procesos y definimos objetivos del agente.",
              },
              {
                step: "2",
                title: "Entrenamiento",
                description:
                  "Entrenamos al agente con tu knowledge base y datos.",
              },
              {
                step: "3",
                title: "Despliegue",
                description: "Se integra en tus sistemas y empieza a trabajar.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-foreground">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Implementa Agentes de IA
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            reduce costos, mejora response time y escala tu negocio sin
            contratar más personal.
          </p>
          <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg flex items-center justify-center gap-2 group mx-auto">
            Solicitar Demo
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
