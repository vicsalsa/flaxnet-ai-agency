import {
  ArrowRight,
  Check,
  Search,
  BarChart3,
  Globe,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Target,
  Users,
  Brain,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function SEOPage() {
  const benefits = [
    {
      icon: Users,
      title: "Tráfico Cualificado",
      description:
        " atraemos usuarios con intención clara que se traducen en ventas, reservas y registros.",
    },
    {
      icon: TrendingUp,
      title: "Rentabilidad a Largo Plazo",
      description:
        "Sin coste por clic. Resultados estables y difíciles de perder con el tiempo.",
    },
    {
      icon: Shield,
      title: "Autoridad de Marca",
      description:
        "Expansión significativa de tu marca y convertirse en fuente citada por sistemas de IA.",
    },
  ];

  const services = [
    {
      title: "Auditoría SEO Técnica",
      description:
        "Análisis completo de velocidad de carga, indexabilidad y arquitectura web.",
    },
    {
      title: "Investigación de Keywords",
      description:
        "Encontramos palabras clave con alta intención de compra para tu sector.",
    },
    {
      title: "SEO para IA Generativa",
      description:
        "Estructuramos tu contenido para visibilidad en ChatGPT, Copilot y Modo IA de Google.",
    },
    {
      title: "Optimización On-Page",
      description:
        "Mejora de meta etiquetas, contenidos, imágenes y estructura interna.",
    },
    {
      title: "Link Building",
      description: "Estrategias seguras para construir autoridad de dominio.",
    },
    {
      title: "Reporting Mensual",
      description:
        "Métricas claras y transparentes con evolución de rankings y tráfico.",
    },
  ];

  const whyUs = [
    {
      icon: Brain,
      title: "Estrategias para la Nueva IA",
      description:
        "Posicionamos tu web para los nuevos sistemas generativos de IA.",
    },
    {
      icon: Zap,
      title: "SEO Técnico Sólido",
      description:
        "Construimos sobre cimientos fuertes: velocidad, indexabilidad y arquitectura.",
    },
    {
      icon: Target,
      title: "Keywords de Alta Conversión",
      description:
        "No posicionamos por posicionar, atraemos clientes que quieren comprar.",
    },
    {
      icon: Shield,
      title: "Autoridad Segura",
      description: "Construimos reputación digital constante y sostenible.",
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
              Marketing Digital
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            SEO Profesional
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Posicionamiento orgánico impulsado por IA. Lleva tu web a lo más
            alto de Google y sé visible en los nuevos sistemas de IA.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/hero-ai-neural-network-3ymCmcMVpN3acshu95Ar3K.webp"
            alt="SEO Positioning"
            className="w-full rounded-2xl"
          />
        </div>
      </section>

      {/* What is SEO */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                ¿Qué es el Posicionamiento SEO?
              </h2>
              <p className="text-lg text-muted-foreground">
                El SEO (Search Engine Optimization) es una disciplina del
                marketing digital enfocada en maximizar la visibilidad de tu
                página web en los resultados orgánicos de los buscadores y en
                los nuevos sistemas impulsados por Inteligencia Artificial.
              </p>
              <p className="text-lg text-muted-foreground">
                Es una práctica que engloba estrategias y técnicas aplicadas de
                manera interna (On-Page) y externa (Off-Page) para lograr que tu
                sitio aparezca en las posiciones más altas cuando usuarios
                buscan tus servicios.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="p-4 bg-card border border-border rounded-xl"
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

      {/* Services */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Servicios de SEO
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estrategias completas para impulsar tu visibilidad orgánica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all"
              >
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Por Qué Elegir a Flaxnet.es?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No te vendemos humo, te ofrecemos resultados sostenibles y
              rentabilidad a largo plazo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trabajo diario y metódico para resultados sostenibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: "1",
                title: "Auditoría",
                description: "Análisis completo de tu web actual",
              },
              {
                step: "2",
                title: "Investigación",
                description: "Keywords y competencia",
              },
              {
                step: "3",
                title: "Estrategia",
                description: "Plan SEO personalizado",
              },
              {
                step: "4",
                title: "Ejecución",
                description: "Optimización técnica y contenidos",
              },
              {
                step: "5",
                title: "Medición",
                description: "Reporting y mejora continua",
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-accent-foreground">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para positioned?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Haz que tus clientes te encuentren cuando más te necesitan. Contacta
            hoy y empieza a posicionarte.
          </p>
          <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg flex items-center justify-center gap-2 group mx-auto">
            Solicitar Auditoría SEO
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
