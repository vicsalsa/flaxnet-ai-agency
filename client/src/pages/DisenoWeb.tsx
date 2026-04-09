import {
  ArrowRight,
  Check,
  Layout,
  Smartphone,
  Zap,
  Search,
  Palette,
  Gauge,
  Layers,
  Eye,
  Target,
  Globe,
  Clock,
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function DisenoWeb() {
  const features = [
    {
      icon: Layout,
      title: "Diseño UX/UI",
      description:
        "Interfaces intuitivas que guían al usuario hacia la conversión.",
    },
    {
      icon: Smartphone,
      title: "100% Responsive",
      description:
        "Perfecto en desktop, tablet y móvil. Toda pantalla, misma calidad.",
    },
    {
      icon: Palette,
      title: "Identidad Visual",
      description:
        "Diseños únicos que reflejan tu marca y diferencian de la competencia.",
    },
    {
      icon: Zap,
      title: "Alta Velocidad",
      description: "Sitios optimizados para cargar en menos de 2 segundos.",
    },
    {
      icon: Search,
      title: "SEO Integrado",
      description: "Cada elemento diseñado para maximizar el posicionamiento.",
    },
    {
      icon: Layers,
      title: "Escalabilidad",
      description: "Arquitectura preparada para crecer con tu negocio.",
    },
  ];

  const services = [
    {
      title: "Sitios Web Corporativos",
      description:
        "Presencia profesional que transmite confianza y credibilidad.",
    },
    {
      title: "E-commerce",
      description:
        "Tiendas online optimizadas para ventas y experiencia de compra.",
    },
    {
      title: "Landing Pages",
      description:
        "Páginas de alta conversión para campañas y productos específicos.",
    },
    {
      title: "Web Apps",
      description: "Aplicaciones web personalizadas para procesos de negocio.",
    },
    {
      title: "Portfolios",
      description: "展示你的作品的专业作品集网站.",
    },
    {
      title: "Mantenimiento",
      description: "Actualizaciones, seguridad y soporte continuo.",
    },
  ];

  const process = [
    {
      step: "1",
      title: "Briefing",
      description: "Entendemos tus objetivos y audiencia",
    },
    {
      step: "2",
      title: "Wireframes",
      description: "Estructura y arquitectura de información",
    },
    {
      step: "3",
      title: "Diseño",
      description: "Prototipos visuales y identidad",
    },
    {
      step: "4",
      title: "Desarrollo",
      description: "Programación con tecnologías modernas",
    },
    {
      step: "5",
      title: "QA",
      description: "Pruebas en todos los dispositivos",
    },
    {
      step: "6",
      title: "Lanzamiento",
      description: "Despliegue y optimización SEO",
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
              Desarrollo
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Diseño Web Moderno
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Interfaces que convierten visitantes en clientes. Sitios web
            responsivos, rápidos y optimizados para SEO que representan la
            esencia de tu marca.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/data-analytics-dashboard-ewdyQczXYKkNxUatKoEfpZ.webp"
            alt="Diseño Web Moderno"
            className="w-full rounded-2xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Por Qué un Diseño Profesional?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              La primera impresión define tu negocio. Un sitio web obsoleto o
              mal diseñado ahuyenta clientes.
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

      {/* Services */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Servicios de Diseño Web
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluciones adaptadas a cada necesidad de tu negocio.
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

      {/* Process */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Metodología probada para resultados garantizados.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {process.map((item, index) => (
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

      {/* Technologies */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Tecnologías Modernas
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "WordPress",
              "Shopify",
              "Webflow",
            ].map((tech, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-card border border-border rounded-full text-muted-foreground font-medium hover:border-accent/50 transition-all"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Necesitas un Sitio Web?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Creamos experiencias digitales que generan resultados. Cuéntanos tu
            proyecto y te enviaremos una propuesta personalizada.
          </p>
          <Link href="/contacto">
            <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg flex items-center justify-center gap-2 group mx-auto cursor-pointer">
              Solicitar Presupuesto
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
