import { ArrowRight, Zap, Brain, Users, Award, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function About() {
  const stats = [
    { value: "50+", label: "Proyectos Completados" },
    { value: "20+", label: "Clientes Satisfechos" },
    { value: "95%", label: "Satisfacción" },
    { value: "24/7", label: "Soporte" },
  ];

  const values = [
    {
      icon: Brain,
      title: "Innovación Constante",
      description:
        "Nos mantenemos a la vanguardia de la IA y automatización, implementando las últimas tecnologías para ofrecer soluciones modernas.",
    },
    {
      icon: Users,
      title: "Enfoque Centrado en el Cliente",
      description:
        "Cada proyecto es único. Trabajamos estrechamente contigo para entender tus necesidades y ofrecer resultados que superen expectativas.",
    },
    {
      icon: Zap,
      title: "Eficiencia Comprobada",
      description:
        "Nuestras soluciones han ayudado a empresas a reducir costos hasta un 70% y aumentar su productividad significativamente.",
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description:
        "Comprometidos con la excelencia. Cada proyecto recibe atención meticulosa a los detalles y pruebas rigurosas de calidad.",
    },
  ];

  const team = [
    {
      name: "Carlos Martínez",
      role: "Director Ejecutivo",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/team-member-1-BAqZv8vsdNEnVXU2Z6X2vQ.webp",
      bio: "Más de 15 años de experiencia en tecnología empresarial y transformación digital.",
    },
    {
      name: "María García",
      role: "Directora de Tecnología",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/team-member-2-BAqZv8vsdNEnVXU2Z6X2vQ.webp",
      bio: "Especialista en IA y machine learning con experiencia en empresas Fortune 500.",
    },
    {
      name: "Alejandro Torres",
      role: "Director de Automatización",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/team-member-3-BAqZv8vsdNEnVXU2Z6X2vQ.webp",
      bio: "Experto certificado en n8n con más de 100 implementaciones exitosas.",
    },
    {
      name: "Laura Sánchez",
      role: "Directora de Diseño",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/team-member-4-BAqZv8vsdNEnVXU2Z6X2vQ.webp",
      bio: "Diseñadora UX/UI con enfoque en conversión y experiencia de usuario.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sobre Nosotros
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Somos una agencia líder en automatización e inteligencia artificial,
            ayudando a empresas a transformarse digitalmente con soluciones
            inteligentes y eficientes.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/109565940/SxSuFPqFf6g9os5emBvgn8/hero-ai-neural-network-3ymCmcMVpN3acshu95Ar3K.webp"
                alt="Nuestra misión"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Nuestra Misión</h2>
              <p className="text-lg text-muted-foreground">
                Democratizar el acceso a la inteligencia artificial y la
                automatización para empresas de todos los tamaños. Creemos que
                cada negocio merece beneficiarse de las mismas tecnologías que
                las grandes corporaciones.
              </p>
              <p className="text-lg text-muted-foreground">
                Desde nuestra fundación en 2020, hemos ayudado a más de 150
                empresas a transformar sus operaciones, reducir costos y
                aumentar su competitividad en el mercado.
              </p>
              <div className="flex items-center gap-2 text-accent">
                <Globe size={20} />
                <span className="font-semibold">
                  Presencia en España y Latinoamérica
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían cada proyecto que entregamos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profesionales apasionados por la tecnología y la innovación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-accent font-semibold mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-secondary/10 border-y border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Quieres Trabajar con Nosotros?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Estamos siempre buscando nuevos talentos. Envíanos tu CV y cuéntanos
            cómo puedes contribuir a nuestro equipo.
          </p>
          <button className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-lg flex items-center justify-center gap-2 group mx-auto">
            Ver Vacantes
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
