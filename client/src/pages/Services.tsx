import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Services() {
  const serviceDetails = [
    {
      id: "n8n",
      title: "Automatización con n8n",
      subtitle: "Flujos de trabajo inteligentes sin código",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/automation-workflow-visual-BAqZv8vsdNEnVXU2Z6X2vQ.webp",
      description:
        "n8n es la plataforma líder para automatización de procesos. Conectamos tus aplicaciones empresariales, eliminamos tareas manuales repetitivas y mejoramos la productividad de tu equipo.",
      features: [
        "Integración con 100+ aplicaciones",
        "Flujos visuales fáciles de entender",
        "Ejecución confiable 24/7",
        "Mantenimiento y escalabilidad simple",
        "Webhooks y APIs personalizadas",
        "Monitoreo en tiempo real",
      ],
      benefits: [
        "Reducción de 70% en tareas manuales",
        "Mejora de precisión en procesos",
        "Ahorro significativo de tiempo del equipo",
        "Escalabilidad sin límites",
      ],
    },
    {
      id: "mcp",
      title: "Integración MCP",
      subtitle: "Conecta IA con tus datos empresariales",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/ai-agents-collaboration-bdf3hkEZmQAidhhRuMiEE4.webp",
      description:
        "Model Context Protocol (MCP) permite que los modelos de IA accedan a tus datos y herramientas de forma segura. Implementamos integraciones robustas que potencian tus agentes de IA.",
      features: [
        "Acceso seguro a bases de datos",
        "Integración con herramientas internas",
        "Protección de datos empresariales",
        "APIs personalizadas para IA",
        "Auditoría y compliance",
        "Escalabilidad empresarial",
      ],
      benefits: [
        "IA con contexto empresarial completo",
        "Decisiones más precisas y relevantes",
        "Seguridad de datos garantizada",
        "Cumplimiento normativo",
      ],
    },
    {
      id: "ia-agents",
      title: "Agentes de IA Autónomos",
      subtitle: "Trabajadores digitales que operan 24/7",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/digital-transformation-abstract-4nxgXB9wgyQYjTecaBG3WL.webp",
      description:
        "Creamos agentes de IA que trabajan de forma autónoma, resolviendo tareas complejas sin intervención humana. Desde atención al cliente hasta análisis de datos, nuestros agentes son la solución.",
      features: [
        "Agentes especializados por función",
        "Aprendizaje continuo",
        "Toma de decisiones autónoma",
        "Integración con sistemas existentes",
        "Monitoreo y control humano",
        "Mejora iterativa",
      ],
      benefits: [
        "Disponibilidad 24/7 sin costos adicionales",
        "Escalabilidad ilimitada",
        "Consistencia en procesos",
        "Reducción de errores humanos",
      ],
    },
    {
      id: "web-design",
      title: "Diseño Web Moderno",
      subtitle: "Interfaces que convierten visitantes en clientes",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/data-analytics-dashboard-ewdyQczXYKkNxUatKoEfpZ.webp",
      description:
        "Diseñamos y desarrollamos sitios web y aplicaciones modernas, responsivas y optimizadas para conversión. Cada píxel está pensado para mejorar la experiencia del usuario.",
      features: [
        "Diseño responsive para todos los dispositivos",
        "Optimización para velocidad y SEO",
        "Interfaz intuitiva y atractiva",
        "Integración con herramientas de marketing",
        "Análisis de comportamiento de usuarios",
        "Mantenimiento y actualizaciones",
      ],
      benefits: [
        "Aumento de conversiones",
        "Mejor posicionamiento en buscadores",
        "Experiencia de usuario superior",
        "Reducción de tasa de rebote",
      ],
    },
    {
      id: "seo",
      title: "SEO Profesional Avanzado",
      subtitle: "Posicionamiento impulsado por IA",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/hero-ai-neural-network-3ymCmcMVpN3acshu95Ar3K.webp",
      description:
        "Estrategias SEO avanzadas que combinan análisis de IA con experiencia humana. Posicionamos tu sitio en las primeras posiciones de Google para palabras clave con alto potencial de conversión.",
      features: [
        "Análisis competitivo con IA",
        "Optimización técnica completa",
        "Estrategia de contenido data-driven",
        "Link building de calidad",
        "Monitoreo de rankings",
        "Reportes detallados mensualmente",
      ],
      benefits: [
        "Aumento de tráfico orgánico",
        "Leads de mayor calidad",
        "ROI medible y transparente",
        "Posicionamiento sostenible",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluciones integrales de automatización, IA y transformación digital
            diseñadas para empresas modernas.
          </p>
        </div>
      </section>

      {/* Services */}
      {serviceDetails.map((service, index) => (
        <section
          key={service.id}
          className={`py-20 px-4 ${index % 2 === 1 ? "bg-card/30" : ""}`}
        >
          <div className="container mx-auto">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
            >
              {/* Image */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full rounded-2xl"
                />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-4">
                  <span className="text-accent text-sm font-semibold">
                    {service.subtitle}
                  </span>
                </div>

                <h2 className="text-4xl font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-4">
                    Características principales:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check
                          size={20}
                          className="text-accent flex-shrink-0 mt-0.5"
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-4">
                    Beneficios para tu negocio:
                  </h3>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contacto">
                  <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 flex items-center gap-2 group cursor-pointer">
                    Solicitar Consulta
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Necesitas una Solución Personalizada?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contáctanos para una consulta gratuita. Analizaremos tus necesidades
            y diseñaremos la solución perfecta para tu empresa.
          </p>
          <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg">
            Agendar Consulta
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
