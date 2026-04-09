import {
  ArrowRight,
  Zap,
  Brain,
  Code,
  TrendingUp,
  Cpu,
  MessageSquare,
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const services = [
    {
      icon: Zap,
      title: "Automatización n8n",
      description:
        "Flujos de trabajo inteligentes que automatizan procesos empresariales complejos sin código.",
      color: "from-cyan-400 to-blue-500",
      link: "/servicios/n8n",
    },
    {
      icon: Brain,
      title: "Agentes de IA",
      description:
        "Agentes autónomos que trabajan 24/7 resolviendo tareas complejas con inteligencia artificial.",
      color: "from-purple-400 to-pink-500",
      link: "/servicios/agentes-ia",
    },
    {
      icon: Cpu,
      title: "Integración MCP",
      description:
        "Conecta tus modelos de IA con datos y herramientas empresariales de forma segura.",
      color: "from-cyan-400 to-purple-500",
      link: "/servicios/mcp",
    },
    {
      icon: Code,
      title: "Diseño Web & Apps",
      description:
        "Interfaces modernas, responsivas y optimizadas que convierten visitantes en clientes.",
      color: "from-pink-400 to-purple-500",
      link: "/servicios/diseno-web",
    },
    {
      icon: TrendingUp,
      title: "SEO Profesional",
      description:
        "Estrategias de posicionamiento avanzadas impulsadas por IA para máxima visibilidad.",
      color: "from-cyan-400 to-green-500",
      link: "/servicios/seo",
    },
    {
      icon: MessageSquare,
      title: "Marketing Digital",
      description:
        "Campañas inteligentes que generan leads y conversiones con ROI medible.",
      color: "from-purple-400 to-cyan-500",
      link: "/blog",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
              <span className="text-accent text-sm font-semibold">
                🚀 Transformación Digital Avanzada
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Automatización e IA para tu Negocio
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Implementamos soluciones inteligentes con n8n, MCP y agentes de IA
              que automatizan procesos, reducen costos y aceleran el crecimiento
              de tu empresa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contacto">
                <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
                  Comenzar Ahora
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
              <Link href="/servicios/n8n">
                <button className="px-8 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-all duration-300 cursor-pointer">
                  Ver Demo
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div>
                <p className="text-2xl font-bold text-accent">50+</p>
                <p className="text-sm text-muted-foreground">
                  Proyectos Realizados
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">95%</p>
                <p className="text-sm text-muted-foreground">
                  Satisfacción Clientes
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">24/7</p>
                <p className="text-sm text-muted-foreground">Soporte Técnico</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 lg:h-full min-h-96">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/hero-ai-neural-network-3ymCmcMVpN3acshu95Ar3K.webp"
              alt="Red Neuronal de IA"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Servicios Especializados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluciones completas de automatización, IA y transformación
              digital para empresas de todos los tamaños.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={index} href={service.link || "/servicios"}>
                  <div className="group p-6 bg-background border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 cursor-pointer h-full">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} p-2.5 mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold">Conocer más</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/automation-workflow-visual-BAqZv8vsdNEnVXU2Z6X2vQ.webp"
                alt="Flujo de Automatización"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Automatización Inteligente</h2>
              <p className="text-lg text-muted-foreground">
                Con n8n y MCP, creamos flujos de trabajo que conectan todas tus
                herramientas empresariales, eliminando tareas repetitivas y
                mejorando la eficiencia operativa.
              </p>
              <ul className="space-y-3">
                {[
                  "Integración de 100+ aplicaciones",
                  "Flujos sin código fáciles de mantener",
                  "Escalabilidad empresarial",
                  "Monitoreo y alertas en tiempo real",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para Transformar tu Negocio?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contáctanos hoy para una consulta gratuita y descubre cómo la IA y
            la automatización pueden impulsar tu empresa.
          </p>
          <Link href="/contacto">
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg cursor-pointer">
              Solicitar Consulta Gratuita
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
