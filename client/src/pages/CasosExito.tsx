import {
  ArrowRight,
  Check,
  TrendingUp,
  Users,
  Zap,
  Clock,
  Globe,
  Award,
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function CasosExito() {
  const cases = [
    {
      company: "TechRetail",
      industry: "E-commerce",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/digital-transformation-abstract-4nxgXB9wgyQYjTecaBG3WL.webp",
      challenge: "Gestión manual de pedidos que consumía 20 horas semanales",
      solution:
        "Automatización con n8n: sincronización de pedidos, inventario y envíos",
      results: [
        "Reducción del 85% en tiempo de gestión",
        "Eliminación de errores humanos",
        "Escalabilidad x5 sin personal adicional",
      ],
      metrics: { value: "85%", label: "Menos tiempo" },
    },
    {
      company: "MedicalCare",
      industry: "Salud",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/ai-agents-collaboration-bdf3hkEZmQAidhhRuMiEE4.webp",
      challenge: "Atención al cliente limitada a horario de oficina",
      solution:
        "Agente de IA para triaje de pacientes 24/7 con integración a CRM médico",
      results: [
        "Disponibilidad 24/7 sin coste adicional",
        "300% más pacientes atendidos",
        "Tiempo de respuesta reducción 90%",
      ],
      metrics: { value: "24/7", label: "Disponibilidad" },
    },
    {
      company: "EduLearn",
      industry: "Educación",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/data-analytics-dashboard-ewdyQczXYKkNxUatKoEfpZ.webp",
      challenge: "Bajo posicionamiento en Google y web obsoleta",
      solution: "Rediseño web + estrategia SEO con IA + contenido optimizado",
      results: [
        "Posición #1 en 15 keywords principales",
        "Tráfico orgánico +400%",
        "Leads cualificados x3",
      ],
      metrics: { value: "#1", label: "Google" },
    },
    {
      company: "FinanceHub",
      industry: "Finanzas",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/hero-ai-neural-network-3ymCmcMVpN3acshu95Ar3K.webp",
      challenge: "Integración de datos entre múltiples sistemas legacy",
      solution: "Integración MCP con API unificada y dashboards en tiempo real",
      results: [
        "Unificación de 8 sistemas",
        "Decisiones 5x más rápidas",
        "Ahorro 40h mensuales en reporting",
      ],
      metrics: { value: "8", label: "Sistemas" },
    },
    {
      company: "LogiTrans",
      industry: "Logística",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/automation-workflow-visual-BAqZv8vsdNEnVXU2Z6X2vQ.webp",
      challenge: "Seguimiento manual de flota y tiempos de entrega",
      solution: "Dashboard IoT + automatización de alertas con n8n",
      results: [
        "Optimización rutas -25% combustible",
        "Clientes informados en tiempo real",
        "Puntuación satisfaction +35%",
      ],
      metrics: { value: "25%", label: "Menos combustible" },
    },
    {
      company: "RetailPro",
      industry: "Retail",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/automation-workflow-visual-BAqZv8vsdNEnVXU2Z6X2vQ.webp",
      challenge: "Abandono de carritos en tienda online",
      solution: "Sistema de recuperación automatizado con IA + email marketing",
      results: [
        "Recuperación 30% de carritos abandonados",
        "Revenue +€50K mensuales",
        "ROI 400% en 3 meses",
      ],
      metrics: { value: "30%", label: "Recuperación" },
    },
  ];

  const stats = [
    { value: "50+", label: "Proyectos" },
    { value: "150+", label: "Clientes" },
    { value: "98%", label: "Satisfacción" },
    { value: "40%", label: "Ahorro medio" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-4">
            <span className="text-accent text-sm font-semibold">
              Resultados
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Casos de Éxito
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empresas que han transformado su negocio con nuestras soluciones de
            IA y automatización.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-accent">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="space-y-16">
            {cases.map((caseItem, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <img
                    src={caseItem.image}
                    alt={caseItem.company}
                    className="w-full rounded-2xl"
                  />
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      {caseItem.industry}
                    </span>
                    <div className="h-1 w-8 bg-accent rounded-full"></div>
                    <span className="text-3xl font-bold text-foreground">
                      {caseItem.company}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                      Desafío
                    </h3>
                    <p className="text-foreground">{caseItem.challenge}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                      Solución
                    </h3>
                    <p className="text-foreground">{caseItem.solution}</p>
                  </div>

                  <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-xl">
                    <p className="text-2xl font-bold text-accent mb-1">
                      {caseItem.metrics.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {caseItem.metrics.label}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                      Resultados
                    </h3>
                    <ul className="space-y-2">
                      {caseItem.results.map((result, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check
                            size={16}
                            className="text-accent flex-shrink-0"
                          />
                          <span className="text-foreground text-sm">
                            {result}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Quieres Ser el Siguiente?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contáctanos y descubre cómo podemos transformar tu negocio. Consulta
            gratuita sin compromiso.
          </p>
          <Link href="/contacto">
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg flex items-center justify-center gap-2 group mx-auto cursor-pointer">
              Solicitar Consulta
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
