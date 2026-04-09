import {
  ArrowRight,
  Check,
  Zap,
  Globe,
  Server,
  Code,
  Shield,
  Clock,
  Layers,
  Mail,
  Database,
  MessageSquare,
  Calendar,
  FileText,
  Link,
} from "lucide-react";
import { Link as RouterLink } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function N8nPage() {
  const features = [
    {
      icon: Globe,
      title: "Cloud o Autoalojamiento",
      description:
        "Flexibilidad total: usa n8n Cloud o.host it yourself en tu propia infraestructura.",
    },
    {
      icon: Shield,
      title: "Control Total de Datos",
      description:
        "Al ser open source, decides dónde se almacenan tus datos y cómo se protegen.",
    },
    {
      icon: Zap,
      title: "Sin Límites",
      description:
        "Software gratuito: solo pagas por el hosting si lo autoalojas. Sin restricciones de ejecuciones.",
    },
    {
      icon: Code,
      title: "Código Opcional",
      description:
        "Interfaz visual o combínala con VS Code y n8n-as-code para gestionar flujos como código.",
    },
  ];

  const integrations = [
    "Google Sheets & Gmail",
    "Slack & Discord",
    "CRM (HubSpot, Salesforce)",
    "Bases de datos (SQL, MongoDB)",
    "APIs REST y GraphQL",
    "Webhooks personalizados",
    "Stripe & PayPal",
    "Microsoft 365",
    "100+ más aplicaciones",
  ];

  const useCases = [
    {
      title: "Sincronización de Datos",
      description:
        "Mantén sincronizadas tus bases de datos, hojas de cálculo y CRM automáticamente.",
    },
    {
      title: "Generación de Informes",
      description:
        "Automatiza la creación de informes semanales/mensuales y envíalos por email.",
    },
    {
      title: "Alertas y Notificaciones",
      description:
        "Recibe alertas instantáneas cuando ocurran eventos importantes en tus sistemas.",
    },
    {
      title: "Atención al Cliente",
      description:
        "Automatiza respuestas, categoriza tickets y escala casos urgent es al equipo adecuado.",
    },
    {
      title: "Procesamiento de Pedidos",
      description:
        "Automatiza todo el flujo desde que llega un pedido hasta que se entrega.",
    },
    {
      title: "Integración con IA",
      description:
        "Conecta modelos de IA para análisis de sentimiento, resumenes automáticos y más.",
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
              Automatización
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">¿Qué es n8n?</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            n8n (del inglés "node-automation") es una herramienta gratuita y de
            código abierto para automatizar flujos de trabajo. Conecta
            aplicaciones, APIs, bases de datos y plataformas SaaS para eliminar
            tareas repetitivas.
          </p>
        </div>
      </section>

      {/* Visual Introduction */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/automation-workflow-visual-BAqZv8vsdNEnVXU2Z6X2vQ.webp"
                alt="Flujo de trabajo n8n"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Automatización Sin Código</h2>
              <p className="text-lg text-muted-foreground">
                n8n funciona mediante flujos visuales basados en nodos
                modulares. Cada nodo representa una integración (Google Sheets,
                Slack, bases de datos) o una acción lógica (filtrar, bucles,
                transformar datos).
              </p>
              <p className="text-lg text-muted-foreground">
                Constructiona procesos sencillos o automatizaciones complejas:
                sincronización de datos, generación de informes, alertas entre
                sistemas y más.
              </p>
              <RouterLink href="/contacto">
                <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 flex items-center gap-2 group cursor-pointer">
                  Ver Demo de Flujo
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </RouterLink>
            </div>
          </div>
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
              Descubre por qué n8n es la herramienta de automatización preferida
              por Unternehmen de todos los tamaños.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Integrations */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              +300 Integraciones
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conecta n8n con las herramientas que ya usas a diario.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-card border border-border rounded-full text-muted-foreground text-sm font-medium hover:border-accent/50 hover:text-accent transition-all cursor-pointer"
              >
                {integration}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Casos de Uso Comunes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Desde tareas simples hasta automatizaciones empresariales
              complejas.
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

      {/* Pricing Info */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">¿Cuánto Cuesta n8n?</h2>
              <div className="space-y-4">
                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="text-xl font-bold text-accent mb-2">
                    n8n Cloud
                  </h3>
                  <p className="text-muted-foreground">
                    Plan gratuito: limitado. Planes de pago desde 20€/mes con
                    más funciones y ejecuciones.
                  </p>
                </div>
                <div className="p-6 bg-card border border-border rounded-xl">
                  <h3 className="text-xl font-bold text-accent mb-2">
                    Autoalojamiento
                  </h3>
                  <p className="text-muted-foreground">
                    Software 100% gratuito. Solo pagas el hosting (desde 5€/mes
                    en VPS).
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/digital-transformation-abstract-4nxgXB9wgyQYjTecaBG3WL.webp"
                alt="Precios n8n"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para Automatizar?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Te ayudamos a implementar n8n en tu empresa. Consulta gratuita sin
            compromiso.
          </p>
          <RouterLink href="/contacto">
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg flex items-center justify-center gap-2 group mx-auto cursor-pointer">
              Solicitar Consulta
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </RouterLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}
