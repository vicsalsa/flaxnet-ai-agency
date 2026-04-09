import {
  ArrowRight,
  Check,
  Shield,
  Server,
  Zap,
  Globe,
  Lock,
  Database,
  Brain,
  Clock,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Link as RouterLink } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function IALocalEmpresas() {
  const benefits = [
    {
      icon: Shield,
      title: "Privacidad Absoluta",
      description:
        "Tus datos nunca abandonan tu infraestructura. Cumplimiento directo con RGPD y HIPAA sin transferencias internacionales.",
    },
    {
      icon: Lock,
      title: "Soberanía del Dato",
      description:
        "Control total sobre tu información. Ninguna empresa externa puede auditar o usar tus datos para entrenar modelos.",
    },
    {
      icon: Database,
      title: "Personalización con RAG",
      description:
        "La IA consulta internamente tus bases de datos, historiales y procesos específicos sin comprometer la confidencialidad.",
    },
    {
      icon: Zap,
      title: "Baja Latencia",
      description:
        "Procesamiento local elimina la latencia de la nube. Tiempos de respuesta rápidos para aplicaciones en tiempo real.",
    },
    {
      icon: TrendingDown,
      title: "Ahorro a Largo Plazo",
      description:
        "Inversión predecible (CAPEX). ROI en 4-12 meses al eliminar tarifas por token de APIs en la nube.",
    },
    {
      icon: Server,
      title: "Entornos Air-gapped",
      description:
        "Operación en redes totalmente aisladas sin conexión a internet para máxima protección de datos sensibles.",
    },
  ];

  const industries = [
    {
      title: "Clínicas Médicas",
      description:
        "Historiales clínicos, diagnósticos y tratamientos con total cumplimiento HIPAA. La IA accede solo a información autorizada.",
    },
    {
      title: "Agencias de Seguros",
      description:
        "Procesamiento de reclamaciones, políticas y evaluaciones de riesgo sin exponer datos de asegurados a terceros.",
    },
    {
      title: "Sector Turístico",
      description:
        "Itinerarios personales, datos de reservas y preferencias de clientes completamente privados y seguros.",
    },
    {
      title: "Servicios Financieros",
      description:
        "Análisis de riesgo crediticio y detección de fraude con datos sensibles nunca expuestos a APIs externas.",
    },
  ];

  const features = [
    "Procesamiento en servidores propios o nube privada",
    "Arquitecturas RAG para consulta interna de bases de datos",
    "Trazabilidad completa del ciclo de vida de los datos",
    "Auditorías simplificadas con control total",
    "Eliminación de riesgos de filtraciones y multas",
    "Modelos afinados con conocimiento interno del negocio",
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
            IA Local para Empresas
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Privacidad absoluta y soberanía del dato. Implementa Modelos de
            Lenguaje Grande (LLM) en tu propia infraestructura.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/hero-ai-neural-network-3ymCmcMVpN3acshu95Ar3K.webp"
            alt="IA Local para Empresas"
            className="w-full rounded-2xl"
          />
        </div>
      </section>

      {/* Why Local AI */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">¿Por Qué IA Local?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Al procesar la información en tus propios servidores o nube
                privada, los datos extremadamente sensibles nunca abandonan el
                perímetro de seguridad de tu organización.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Para clínicas médicas, agencias de seguros y el sector
                turístico, el uso de LLMs locales simplifica y asegura el
                cumplimiento de normativas como el RGPD en Europa y la HIPAA en
                el sector sanitario.
              </p>
              <ul className="space-y-3">
                {[
                  "Datos nunca atraviesan redes de terceros",
                  "Sin exposición a auditorías de empresas externas",
                  "Eliminación de riesgos de filtraciones",
                  "Control total sobre el ciclo de vida de los datos",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check size={18} className="text-accent flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {benefits.slice(0, 2).map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 bg-card border border-border rounded-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="text-accent" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Beneficios de la IA Local
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Implementa inteligencia artificial sin comprometer la seguridad de
              tus datos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Sectores que se Benefician
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industrias que requieren máxima protección de datos sensibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all"
              >
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {industry.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RAG Architecture */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/ai-agents-collaboration-bdf3hkEZmQAidhhRuMiEE4.webp"
                alt="Arquitectura RAG"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Arquitectura RAG</h2>
              <p className="text-lg text-muted-foreground">
                La Generación Aumentada por Recuperación (RAG) permite que la IA
                consulte internamente tus propias bases de datos, historiales y
                procesos específicos.
              </p>
              <p className="text-lg text-muted-foreground">
                Tu herramienta deja de ser un asistente conversacional genérico
                para convertirse en un sistema experto que "entiende" los
                procesos de tu empresa.
              </p>
              <div className="space-y-2">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check size={16} className="text-accent flex-shrink-0" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Modelo Cloud vs Local
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compara los costos y beneficios de cada enfoque.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-card border border-border rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-muted-foreground">
                Cloud (APIs)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <TrendingUp className="text-red-500" size={16} />
                  <span className="text-muted-foreground">
                    Costo variable por token
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <TrendingUp className="text-red-500" size={16} />
                  <span className="text-muted-foreground">
                    Datos expone a terceros
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <TrendingUp className="text-red-500" size={16} />
                  <span className="text-muted-foreground">
                    Dependencia de conexión
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <TrendingUp className="text-red-500" size={16} />
                  <span className="text-muted-foreground">
                    Latencia variable
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-accent/10 border border-accent/30 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-accent">
                Infraestructura Local
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <TrendingDown className="text-accent" size={16} />
                  <span className="text-foreground">
                    Inversión predecible (CAPEX)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <TrendingDown className="text-accent" size={16} />
                  <span className="text-foreground">Datos 100% privados</span>
                </li>
                <li className="flex items-center gap-3">
                  <TrendingDown className="text-accent" size={16} />
                  <span className="text-foreground">Independencia total</span>
                </li>
                <li className="flex items-center gap-3">
                  <TrendingDown className="text-accent" size={16} />
                  <span className="text-foreground">
                    Baja latencia garantizada
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-accent font-semibold text-sm">
                ROI en 4-12 meses para empresas con alto volumen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para Implementar IA Local?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Te ayudamos a implementar tu propio LLM con total privacidad y
            control. Consulta gratuita sin compromiso.
          </p>
          <RouterLink href="/contacto">
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg flex items-center justify-center gap-2 group mx-auto cursor-pointer">
              Solicitar Información
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
